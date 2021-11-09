# @greenpress/sdk

SDK to use Greenpress common API endpoints.

Can be used for both backend and frontend applications.

## Installation

```shell
npm install @greenpress/sdk
```

## Usage

```typescript
// my-sdk.ts
import GreenpressSDK from '@greenpress/sdk';

const sdk = new GreenpressSDK({appUrl: 'https://yourdomain.com', fetch: window.fetch});
export default sdk;
```
**Note:** You can inject a fetch-like function, such as `node-fetch` or any fetch equivalent.

### Basic usage of SDK instance:
```typescript jsx
// MyPostsList.tsx
import sdk from './my-sdk';

function MyPostsList() {
  const [posts, setPosts] = useState([]);
  const [querySearch, setQuery] = useState([]);
  useEffect(() => {
    sdk.posts.getList({q: querySearch, limit: 50});
  }, [querySearch]);

  return (
    <div>
      <input type="text" placeholder="Search posts" onChange={e => setQuery(e.target.value)}/>
      {
        posts.map(post => <PostItem post={post} key={post._id}/>)
      }
    </div>
  )
}
```

Enjoy!
