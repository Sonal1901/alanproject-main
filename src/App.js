import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';



const alanKey = '55717fb0ffdc6a80063c70ce73cb88f12e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [newsArticles, setNewsArticles]=useState([]);
    const [activeArcticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newsHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight' ) {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }
                else if(command === 'open') {
                    window.open(articles[number].url, '_blank');
                }
            }
        })
    }, [])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/vpoice/images/previews/preview.png" className={classes.alanLogo} alt='alan logo' />
            </div>
            <NewsCards articles={newsArticles} activeArcticle={activeArcticle} />
        </div>
    )
}
export default App;

