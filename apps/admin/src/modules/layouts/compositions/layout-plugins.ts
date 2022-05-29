import {IPlugin} from '@greenpress/view-builder/src';
import {LayoutConnectedDataKind} from '@greenpress/sdk/dist/layouts';
import {useBlocksList} from '@/modules/blocks/compositions/blocks-list';
import {computed, ref} from 'vue';

const customPlugins: Record<string, IPlugin[]> = {
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

function getBlockPlugin({_id, name}) {
    const reference = 'block_' + _id;
    return {
        match: `BlockBox[block=${reference}]`,
        component: 'BlockBox',
        title: 'Block: ' + name,
        description: 'Managed Content from Blocks',
        supportChildren: false,
        predefined: true,
        props: {
            block: reference
        },
        connectedData: {
            kind: LayoutConnectedDataKind.BLOCK,
            reference,
            identifier: _id,
        }
    };
}

export function usePlugins(kind: string) {
    const {blocks} = useBlocksList();

    const plugins = ref([
        ...(customPlugins[kind] || []),
        ...basicPlugins,
    ]);

    return computed(() => [
        ...plugins.value,
        ...(blocks.value || []).map(getBlockPlugin),
    ]);
}
