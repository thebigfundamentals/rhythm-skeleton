import {useState} from 'react';

const useSkeletonState = (initialState) => {
    const [skeleton, setSkeleton] = useState(initialState);
    return {
        skeleton,
        setSkeleton,
        makeSkeleton: (originalText) => {
            // set the regular expression to match only non-punctuation characters
            const reSkeleton = new RegExp(/[^!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~—]/, 'gm');
            const skeleton = originalText.replace(reSkeleton, '');
            // put the punctuation into an array, so we don't have to deal with line-breaking characters
            const skeletonArray = skeleton.split('');
            // put a special character \u00A0 between each punctuation character and make into a new string
            let skeletonFinal = ''
            for (let i = 0; i < skeletonArray.length; i++) {
                skeletonFinal = skeletonFinal + '\u00A0' + skeletonArray[i]
            };
            setSkeleton(skeletonFinal);
        }
    }
};

export default useSkeletonState;