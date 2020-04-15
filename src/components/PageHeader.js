import React from 'react';
import { Helmet } from 'react-helmet';

export const PageHeader = ({title, meta}) => {
    return (
        <>
            <Helmet
                defaultTitle="適職診断テスト | 工場求人ナビ"
                titleTemplate="%s | 適職診断テスト 工場求人ナビ"
                title={title}
                meta={meta} 
            />
        </>
    )
}