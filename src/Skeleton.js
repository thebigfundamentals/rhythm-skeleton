import React, { useState, useEffect } from 'react';
import useInputState from './hooks/useInputState';
import useToggle from './hooks/useToggle';
import sample from './sample';

function Skeleton() {
    const [text, setText, handleTextChange] = useInputState('');
    const [skeleton, setSkeleton] = useState('');
    const [isCopying, toggleCopy] = useToggle(false);
    const { saramago, joyce, woolf } = sample;
    const makeSkeleton = (originalText) => {
        const reSkeleton = new RegExp(/[^!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~—]/, 'gm');
        const skeleton = originalText.replace(reSkeleton, '');
        const skeletonArray = skeleton.split('');
        let skeletonFinal = ''
        for (let i = 0; i < skeletonArray.length; i++) {
            skeletonFinal = skeletonFinal + '\u00A0' + skeletonArray[i]
        };
        setSkeleton(skeletonFinal);
    };
    const handleSampleClick = (sample) => {
        setText(sample)
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(skeleton);
        toggleCopy();
    };
    useEffect(() => {
        if (isCopying) {
            setTimeout(() => { toggleCopy() }, 500);
        }
    }, [isCopying]);
    return (
        <div className='container d-flex flex-column'>
            <h1 className='text-center mt-3'>The Rhythm's Skeleton</h1>
            <div className='my-4 col-6 align-self-center text-muted text-center'><h6>How does your favourite novel
                - or your own text - look without words? Inspired
                by <a href='https://medium.com/creators-hub/what-i-learned-about-my-writing-by-seeing-only-the-punctuation-efd5334060b1'>
                    just-the-punctuation</a> and <a href='https://www.c82.net/work/?id=347'>
                    Between the Words</a>, created by <a href='https://twitter.com/gschincariol'>thebigfundamentals</a></h6></div>
            <div>
                <div className='d-flex justify-content-center my-3'>
                    <button onClick={() => { handleSampleClick(saramago) }} className="btn btn-danger mx-2">José Saramago - Ensaio sobre a cegueira</button>
                    <button onClick={() => { handleSampleClick(woolf) }} className="btn btn-danger mx-2">Virginia Woolf - To the Lighthouse</button>
                    <button onClick={() => { handleSampleClick(joyce) }} className="btn btn-danger mx-2">James Joyce - Ulysses</button>
                </div>
            </div>
            <div className='Skeleton-Form mb-3'>
                <label htmlFor="originalText" className="form-label">Original Text</label>
                <textarea onChange={handleTextChange}
                    value={text}
                    className="form-control"
                    id="originalText"
                    rows="6" />
                <button onClick={() => { makeSkeleton(text) }} className="btn btn-primary mt-3">Make the magic happen!</button>
            </div>
            <div className='Skeleton-Result text-break d-flex flex-column'>
                <div className='mb-3'><h4>No words, just the punctuation:</h4>
                    <button className="btn btn-outline-info"
                        onClick={handleCopy}>
                        {isCopying ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div className='col-9 align-self-center fs-5 mb-3'
                    style={{
                        backgroundColor: '#f3e8d4',
                        fontFamily: "'Playfair Display', serif",
                        letterSpacing: '1px'
                    }}>{skeleton}</div>
            </div>
        </div >
    )
}

export default Skeleton
