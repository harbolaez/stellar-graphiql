import React from 'react';
import Query from './Query';

function SampelQueries({ samplePanelOpen, handleSamplePanel, copyToEditor }) {
  return (
    <div
      className="sample-panel"
      style={{ display: samplePanelOpen ? 'block' : 'none' }}
    >
      <div className="title-bar">
        <div className="title">Sample Queries</div>
        <div className="doc-explorer-rhs">
          <div className="docExplorerHide" onClick={handleSamplePanel}>
            ✕
          </div>
        </div>
      </div>
      <div className="content">
        {[3].map(idx => (
          <Query
            key={idx}
            copyToEditor={copyToEditor}
            code={`{
            systems(first: 5) {
              edges {
                node {
                  id
                }
              }
            }
          }`}
          />
        ))}
      </div>
    </div>
  );
}

export default SampelQueries;
