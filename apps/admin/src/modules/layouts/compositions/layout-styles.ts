import {ref, Ref, watch} from 'vue';
import {ILayoutContent} from '@greenpress/sdk/src/layouts';

const storedMatches = {};

/*
    json should look like:
    {
        "selector": ["class-a", "class-b"],
        "*": [classes for all elements],
        "PostsList": [classes available for PostsList component only],
        "BlockBox, p": [classes available for all mentioned in selector],
    }
 */
export type StylesMatches = Record<string, string[]>;

function cachedFetch(url): Promise<StylesMatches> {
    const promise: Promise<StylesMatches> = storedMatches[url] ||
        (
            storedMatches[url] = fetch(url)
            .then(res => res.json())
            .catch(() => ({}))
        );
    return promise;
}

export function useLayoutStyles(layoutContent: Ref<ILayoutContent[]>) {
    const layoutStyles = ref<StylesMatches>();

    const check = async () => {
        const styles = await Promise.all(
            layoutContent.value
                .filter(item => item.component === 'link' && item.props?.rel === 'stylesheet' && item.props?.href)
                .map(item => item.props.href + '.matches.json')
                .map(cachedFetch)
        );

        const mergedStyles = styles.reduce((merged, styles) => {
            Object.keys(styles).map(selector => {
                const classes = styles[selector];
                if (merged[selector]) {
                    merged[selector].push(...classes);
                } else {
                    merged[selector] = [...classes];
                }
            });
            return merged;
        }, {} as StylesMatches);

        layoutStyles.value = mergedStyles;
    }

    watch(layoutContent, check);

    return {
        layoutStyles,
        check,
    }
}
