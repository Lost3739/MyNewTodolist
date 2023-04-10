import React from 'react'
import {action} from '@storybook/addon-actions';

import AppWithRedux from './AppWithRedux';
import {Provider} from 'react-redux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}

export const EditableSpanBaseExample = () => {
    return <AppWithRedux />
}