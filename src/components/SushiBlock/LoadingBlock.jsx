import React from 'react';
import ContentLoader from "react-content-loader";

function LoadingBlock(props) {
    return (
        <ContentLoader
            className='sushi-block'
            speed={2}
            width={280}
            height={460}
            viewBox="0 0 280 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="136" cy="117" r="112" />
            <rect x="0" y="262" rx="3" ry="3" width="280" height="37" />
            <rect x="0" y="314" rx="6" ry="6" width="280" height="63" />
            <rect x="0" y="404" rx="3" ry="3" width="95" height="25" />
            <rect x="131" y="396" rx="18" ry="18" width="145" height="38" />
        </ContentLoader>
    )
}

export default LoadingBlock;