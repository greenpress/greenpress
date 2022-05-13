import {IPlugin} from '@greenpress/view-builder/src';
import {LayoutConnectedDataKind} from '@greenpress/sdk/dist/layouts';

const customPlugins: Record<string, IPlugin[] > = {
    category: [
        {
            match: 'CategoryTitle',
            component: 'CategoryTitle',
            title: 'Category Title',
            description: 'using H1',
            supportChildren: false,
            predefined: true,
            props: {
                category: '$category'
            },
            connectedData: {
                kind: LayoutConnectedDataKind.CATEGORY,
                reference: '$category',
            }
        },
        {
            match: 'CategoryContent',
            component: 'CategoryContent',
            title: 'Category Content',
            description: 'Show the content of the category',
            supportChildren: false,
            predefined: true,
            props: {
                category: '$category'
            },
            connectedData: {
                kind: LayoutConnectedDataKind.CATEGORY,
                reference: '$category',
            }
        },
        {
            match: 'PostsList',
            component: 'PostsList',
            title: 'Category Posts',
            description: 'Posts list of existing category',
            supportChildren: false,
            predefined: true,
            props: {
                posts: '$categoryPosts'
            },
            connectedData: {
                kind: LayoutConnectedDataKind.CATEGORY_POSTS,
                reference: '$categoryPosts',
            }
        },
    ]
}

const basicPlugins: IPlugin[] = [
    {
        match: 'div.flex-row',
        component: 'div',
        title: 'Row',
        description: 'Flex Row Div',
        classes: 'flex-row',
    },
    ...['div', 'header', 'footer', 'main', 'aside', 'section'].map(tag => {
        return {
            match: tag,
            component: tag,
            title: tag,
            description: tag,
            supportChildren: true,
            showChildren: true,
        }
    }),
];

export function usePlugins(kind: string) {
    return [
        ...(customPlugins[kind] || []),
        ...basicPlugins
    ]
}
