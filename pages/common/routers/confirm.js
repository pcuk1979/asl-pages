const { mapValues } = require('lodash');
const { Router } = require('express');

const getItem = (req, model) =>
  req.api(`/establishment/${req.establishment}/${model}/${req.form.id}`)
    .then(({ json: { data } }) => Promise.resolve(data))
    .catch(err => Promise.reject(err));

const defaultMiddleware = (req, res, next) => next();

module.exports = ({
  model,
  schema,
  submitChange = defaultMiddleware,
  configure = defaultMiddleware,
  checkSession = defaultMiddleware,
  getValues = defaultMiddleware,
  locals = defaultMiddleware
} = {}) => {
  const app = Router();

  const _configure = (req, res, next) => {
    req.form = req.form || {};
    req.form.id = req[model];
    req.form.schema = schema;
    return configure(req, res, next);
  };

  const _processQuery = (req, res, next) => {
    const { clear, edit } = req.query;
    if (clear) {
      delete req.session.form[req.form.id];
      const re = new RegExp(`/${req.form.id}/edit/confirm`);
      res.redirect(req.baseUrl.replace(re, ''));
    }
    if (edit) {
      res.redirect(req.baseUrl.replace(/\/confirm/, ''));
    }
    next();
  };

  const _checkSession = (req, res, next) => {
    if (req.session.form && req.session.form[req.form.id]) {
      return checkSession(req, res, next);
    }
    res.redirect(req.baseUrl.replace(/\/confirm/, ''));
  };

  const _getValues = (req, res, next) => {
    getItem(req, model)
      .then(item => {
        req.form.diff = mapValues(req.form.schema, ({ parse }, key) => {
          return {
            oldValue: item[key],
            newValue: req.session.form[req.form.id].values[key]
          };
        });
      })
      .then(() => getValues(req, res, next))
      .catch(next);
  };

  const _locals = (req, res, next) => {
    res.locals.static.diff = req.form.diff;
    return locals(req, res, next);
  };

  const submit = (req, res, next) => {
    if (req.session.form && req.session.form[req.form.id]) {
      return submitChange(req, res, next);
    }
    return res.redirect(req.originalUrl);
  };

  app.get('/',
    _configure,
    _processQuery,
    _checkSession,
    _getValues,
    _locals
  );

  app.post('/',
    _configure,
    submit
  );

  return app;
};