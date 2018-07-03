import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Inset from '../../../common/views/components/inset';
import FormLayout from '../../../common/views/layouts/form';
import formatters from '../../formatters';

const pageFormatters = {
  restrictions: { showIf: model => model.notes }
};

const Page = () => (
  <Fragment>
    <FormLayout formatters={Object.assign({}, formatters, pageFormatters)}>
      <header>
        <h2>&nbsp;</h2>
        <h1><Snippet>pages.place.edit</Snippet></h1>
      </header>
      <Inset>
        <p>
          <Snippet>inset</Snippet>
        </p>
      </Inset>
    </FormLayout>
  </Fragment>
);

module.exports = Page;
