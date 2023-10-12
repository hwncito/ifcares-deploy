'use client';

import React from 'react';
import { Dropdown } from 'flowbite-react';

const SitesDropdown = ({ sites, onSiteSelected, selectedSite }) => {
  return (
    <Dropdown dismissOnClick={true} label={selectedSite || 'Select Site'}>
      <Dropdown.Item onClick={() => onSiteSelected('')}>
        All Sites
      </Dropdown.Item>
      {sites.map((site) => (
        <Dropdown.Item
          key={site.spreadsheetId}
          onClick={() => onSiteSelected(site.name)}
        >
          {site.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default SitesDropdown;
