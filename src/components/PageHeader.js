import React from 'react';
import { Helmet } from 'react-helmet';

export const PageHeader = ({ title, ogp }) => {
    const head = [
        { charset: "utf-8" },
        { name: 'viewport', content: "minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1, shrink-to-fit=no" },
        { name: "theme-color", content: "#000000" },
        { name: "description", content: "あなたに合ったお仕事を探せる！" }
    ];

    return (
        <>
            <Helmet
                defaultTitle="適職診断テスト | 工場求人ナビ"
                titleTemplate="%s | 適職診断テスト 工場求人ナビ"
                title={title}
                meta={ogp ? head.concat(ogp) : head}
            />
        </>
    );
};