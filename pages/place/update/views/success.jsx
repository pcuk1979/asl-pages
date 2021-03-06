import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';

const Success = ({
  ...props
}) => (
  <Fragment>
    <div className="grid-row">
      <div className="column-two-thirds">
        <div className="govuk-box-highlight">
          <h1 className="heading-xlarge"><Snippet>heading</Snippet></h1>
        </div>
        <p className="font-medium"><Snippet>subheading</Snippet></p>
        <p><Snippet>text1</Snippet></p>
        <p><Snippet>text2</Snippet></p>
        <a href="/" className="button"><Snippet>homepage</Snippet></a>
      </div>
    </div>
  </Fragment>
);

export default Success;
