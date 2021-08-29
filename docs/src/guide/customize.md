# Customize Your Greenpress Blog

The greenpress built-in themes are not for everyone. They have shades of <span style="color: #42b983">green</span> that might not match with your brand and company.

**So how can we combat this as developers?**

Greenpress provides us with options for creating our own theme. This guide will explain how to do that.

## Requirements
- A Github account
- Basic Vue.js understanding
- Greenpress CLI

## Setups

### 1. Fork our blog-front repo

Visit our [github repo](https://github.com/greenpress/blog-front) and fork the repository with the `fork` button on the top-right corner.

### 2. Create your theme folder

In your `blog-front` fork, enter the `themes` folder. 

You can see those 3 folders inside this folder:

- `classic`
- `damal`
- `default`

Create another folder and pick a name for it. for example: `ocean`.

You can now create your own theme.

### 3. create theme components

Every theme **must** have the components listed below. See `default` folder for references and examples.

- [Category.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/Category.vue)
- [Error.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/Error.vue)
- [Index.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/Index.vue)
- [Layout.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/Layout.vue) (main styling goes here)
- [Post.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/Post.vue)
- [Search.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/Search.vue)
- [SignIn.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/SignIn.vue)
- [SignUp.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/SignUp.vue)
- [Tag.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/Tag.vue)
- [_colors.scss](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/_colors.scss) (accent color goes here)
- components
    - [AddCommentForm.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/AddCommentForm.vue)
    - [ErrorDisplay.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/ErrorDisplay.vue)
    - [Footer.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/Footer.vue)
    - [Form.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/Form.vue)
    - [FormInput.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/FormInput.vue)
    - [Header.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/Header.vue)
    - [Logo.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/Logo.vue)
    - [MainMenu.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/MainMenu.vue)
    - [PostBreadcrumbs.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/PostBreadcrumbs.vue)
    - [PostComments.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/PostComments.vue)
    - [PostsList.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/PostsList.vue)
    - [SignInForm.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/SigninForm.vue)
    - [SignUpForm.vue](https://github.com/greenpress/greenpress/blob/main/apps/blog-front/themes/default/components/SignupForm.vue)

if you don't wish to change a component, copy the file as is to your folder.

### 4. Migrate to your Greenpress app.

**NOTE:** If you already have an existing greenpress app, follow the steps below and then change the `TENANT` option in your configuration to the tenant you had before. Your data will be restored. see the [greenpress configuration docs](https://docs.greenpress.info/guide/greenpress-configuration.html) to learn more.

- Create a new Greenpress app

Enter a directory in your computer and type 
```sh
$ greenpress create my-app
```

As part of the creating process, the CLI will ask you if you want to choose an alternative `blog-front`. Type `yes` and enter your fork url.

- Change the configuration

As stated in the [blog-front docs](https://docs.greenpress.info/services/blog-front/#configuration), you can change the theme of your app. change the theme to the theme you created with one of the options below:

```t
# greenpress.local.env
FRONT_THEME=ocean
```

```js
// greenpress.config.js
module.exports = {
  front: {
   theme: 'ocean'
  }
}
```

at this point you can change the `tenant` as well to restore your blog data.

### Done!

Your greenpress blog is now using your own custom theme