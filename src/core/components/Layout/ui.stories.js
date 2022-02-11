import React from 'react';

import UiKitSideBar from '~/core/components/SideBar';
import UiKitHeaders from '.';

export default {
  title: 'Ui Only/Layout',
};

export const Headers = () => <UiKitHeaders />;

export const SideBar = () => <UiKitSideBar />;

export const DefaultLayout = () => {
  return (
    <div>
      <UiKitHeaders />
      <UiKitSideBar />
    </div>
  );
};
