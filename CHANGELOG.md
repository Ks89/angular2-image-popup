# 6.3.0
### Features
- add a new method called 'update' into GalleryService to be able to update an image of the gallery calling this method, also when modal-gallery is already opened #161 
  (requested and partially implemented by @smardine (see pull request https://github.com/Ks89/angular-modal-gallery/pull/162))


# 6.2.3
### Bugfixes
- when you press the back button, page scroll remains blocked, because the modal gallery isn't completely closed (reported by @srtab #159)


# 6.2.2
### Bugfixes
- when you add images asynchronously with the modal gallery already opened, infinite sliding, the arrows, images and previews are managed in the wrong way (reported by @rezo-evodion #157)


# 6.2.2-beta.1
### Bugfixes
- when you add images asynchronously with the modal gallery already opened, infinite sliding, the arrows, images and previews are managed in the wrong way (reported by @rezo-evodion #157)


# 6.2.1
### Bugfixes
- if infinite sliding is enabled and there is only one image, navigation arrows should be hidden (reported by @rezo-evodion #156)


# 6.2.0
### Features
- add a new config property ('invertSwipe') inside CurrentImageConfig to invert swipe direction (requested by @anacatarinasousaaa #154)


# 6.1.2
### Bugfixes
- fix readme.md on npmjs with the url to stackblitz v6, instead of v5


# 6.1.1
### Bugfixes
- modal image loses proportions on mobile when resized (caused by version 6.0.2 #145) fixed with #153


# 6.1.0
### Features
- add base64 support as image path #147
- add new Image property to choose a file name for download #146

### Testing
- add other tests to cover some missing scenarios
- add unit testing for all new features

### Demos
- add base64 demo to all examples
- add custom file name for download demo to all examples


# 6.0.2
### Bugfixes
- fix current-image visibility on Microsoft Edge for Desktop #146


# 6.0.2-beta.1
### Bugfixes
- fix current-image visibility on Microsoft Edge for Desktop #146


# 6.0.1
### Bugfixes
- fix readme published on npmjs


# 6.0.0
### Features
- id is now a mandatory input parameter (BREAKING CHANGE)
- **new package name `@ks89/angular-modal-gallery`** (to install use `npm i  --save @ks89/angular-modal-gallery@next`) (BREAKING CHANGE)
- Support Angular Package Format specification v5 (BREAKING CHANGE)
- Remove Angular 4 support (BREAKING CHANGE)
- Add close method inside gallery.service (requested by @Enngage)
- Force side previews at the margins, because they was moving with current images of different sizes (rectangular) (requested by @Enngage) (BREAKING CHANGE)
- Add workaround to support SystemJS + AOT #142 - requested by @mlc-mlapis (**BREAKING CHANGE FOR ALL SYSTEMJS USERS**)
- Add full-screen button in FULL strategy
- Move loadingConfig, description and downloadble into CurrentImageConfig  (BREAKING CHANGE)

### Bugfixes
- Fix an issue when strictNullChecks and AOT are enabled together

### Internal library changes
- Force AOT builds with all strict options in ng-packagr tsconfig file used in `npm run build:lib`
- Migrate to nwrl/nx 0.9.0
- Migrate to ng-packagr 2

### Testing
- Update full-screen button
- Update for the new loadingConfig api
- Update unit testing with the new CurrentImageConfig

### Chores
- New 6.0.0 logo red/orange

### Docs
- Release [the new documentation website 6.0.0](https://ks89.github.io/angular-modal-gallery-2018-v6.github.io/)

### Demos
- Add an example with Angular 5.x.x and angular-cli 1.7.x
- Update all examples to the new APIs
- Remove webpack example


# 6.0.0-beta.2
### Features
- add close method inside gallery.service (requested by @Enngage)
- force side previews at the margins, because they was moving with current images of different sizes (rectangular) (requested by @Enngage)
- add workaround to support SystemJS + AOT #142 - requested by @mlc-mlapis (**BREAKING CHANGE FOR ALL SYSTEMJS USERS**)

### Docs
- release documentation website beta.2

### Demos
- Update all examples with the usage of close method


# 6.0.0-beta.1
### Docs
- release documentation website beta.1

### Demos
- Update all examples to Angular 6 (also universal)
- Add an example with Angular 5.x.x and angular-cli 1.7.x


# 6.0.0-alpha.4
### Features
- add full-screen button in FULL strategy
- new 6.0.0 logo red/orange

### Testing
- update full-screen button
- update for the new loadingConfig api

### Bugfixes
- fix an issue when strictNullChecks and aot are enabled together

### Internal library changes
- force AOT builds with all strict options in ng-packagr tsconfig file used in `npm run build:lib`


# 6.0.0-alpha.3
### Features
- move loadingConfig, description and downloadble into CurrentImageConfig

### Demos
- Update all examples

### Testing
- Update unit testing with the new CurrentImageConfig


# 6.0.0-alpha.2
### Features
- Description bottom margin in modal image is now 0px instead of 5px (BREAKING CHANGE)

### Internal lib changes
- migrate to angular 6
- migrate ru rxjs 6
- migrate to angular-cli 6


# 6.0.0-alpha.1
### Features
- Support Angular Package Format specification v5 (BREAKING CHANGE)
- Remove Angular 4 support (BREAKING CHANGE)
- new package name `@ks89/angular-modal-gallery` (to install use `npm i  --save @ks89/angular-modal-gallery@next`)

### Internal lib changes
- migrate to nwrl/nx 0.9.0
- migrate to ng-packagr 2

### Demos
- remove webpack example
- update all example


# 5.7.1
### Bugfixes
- getDescriptionToDisplay is used in current-image.html also for titles. So, when strategy is ALWAYS_HIDDEN,
  titles will be always ‘’. That’s wrong, because I should hide only descriptions not titles (useful for accessibility purposes)!

### Examples
- update angular-cli-6 example to angular 6.0.0 final and angular-cli 6.0.0 final

### Others
- add angular-modal-gallery 6.0.0 warning in README.md (release scheduled for May 2018)


# 5.7.0
### Features
- Add optional param to disable click events on the current image #135 (@iss936)


# 5.6.0
### Features
- add gallery.service to call modal-gallery methods without plain gallery.
  In this way you are able to open modal gallery to an image by its index, without clicking on a thumb, but via Component's code.
  This feature closes these two feature requests #127 (@pieterdegraeuwe) and #131 (@tobi-or-not-tobi)

### Testing
- add unit testing for both component and service

### CI
- improve CI configs


# 5.6.0-beta.1
### Features
- add gallery.service to call modal-gallery methods without plain gallery.
  In this way you are able to open modal gallery to an image by its index, without clicking on a thumb, but via Component's code.
  This feature closes these two feature requests #127 (@pieterdegraeuwe) and #131 (@tobi-or-not-tobi)


# 5.5.1
### Bugfixes
- Fix modal-gallery layout on small screens when there is one image in the array #136 (thanks to @pieterdegraeuwe)


# 5.5.0
### Features
- add new spinners https://codepen.io/WebSonata/pen/bRaONB, https://codepen.io/nikhil8krishnan/pen/dMEzGx, https://codepen.io/devilishalchemist/pen/emOVYQ #117


# 5.4.0
### Features
- add background, text color, position, size and margin properties to Description interface #133 (requested by @tobi-or-not-tobi)
- add Angular 6 and angular-cli 6 experimental support

### Demos
- new official example with angular-cli 6.0.0-beta.5 and angular 6.0.0-rc.0


# 5.4.0-beta.3
### Features
- add Angular 6 and angular-cli 6 experimental support

### Bugfixes
- apply default values to description (added with both beta1 and beta2) #133 (reported by @tobi-or-not-tobi)

### Demos
- new official example with angular-cli 6.0.0-beta.5 and angular 6.0.0-rc.0


# 5.4.0-beta.2
### Features
- flatten description's style property adding also other inputs #133 (requested by @tobi-or-not-tobi)


# 5.4.0-beta.1
### Features
- add background, text color and margins properties to Description interface #133 (requested by @tobi-or-not-tobi)


# 5.3.0
### Features
- official support @fortawesome/fontawesome 5

### Demos
- force AOT builds in all examples based on angular-cli also for `npm start`
- replace font-awesome 4.7.0 with fontawesome 5 in all examples (expect for webpack)
- update all examples based on the main demo


# 5.3.0-beta.1
### Features
- official support @fortawesome/fontawesome 5

### Demos
- force AOT builds in all examples based on angular-cli also for `npm start`
- replace font-awesome 4.7.0 with fontawesome 5 in all examples (expect for webpack)
- update all examples based on the main demo


# 5.2.2
### Bugfixes
- If I set previewsConfig.number with a value <= 0, I should restore the default number (=3)


# 5.2.1
### Bugfixes
- If previews aren’t clickable, I should show a not-allowed mouse cursor


# 5.2.0
### Features
- window on server side is undefined => add a workaround to fully support SSR #125

### Bugfixes
- update all examples with both before and after hooks in example B20 with font-awesome as requested by @matiishyn in #92


# 5.2.0-beta.1
### Features
- window on server side is undefined => add a workaround to fully support SSR #125


# 5.1.0
### Features
- support html image description (requested by @ckelkar) #123

### Bugfixes
- pass keyboardAction instead of clickAction for keyup event in current-image.component


# 5.1.0-beta.2
### Bugfixes
- pass keyboardAction instead of clickAction for keyup event in current-image.component


# 5.1.0-beta.1
### Features
- support html image description (requested by @ckelkar) #123


# 5.0.1
### Fix
- I forgot to publish README.md on npmjs :)

### Chores
- update to 5.0.1 final in all examples


# 5.0.0
### Features
- Rewrite SCSS/CSS layout in a more powerful way with **FLEXBOX** fixing some well known bugs #98 #37 (BREAKING CHANGE)
- Improve accessibility with ARIA #99 (BREAKING CHANGE)
- Remove Angular 2 support (for instance replace Renderer with Renderer2) #70 (BREAKING CHANGE)
- Update to Angular 5 #83
- Partial support to Server-Side-Rendering (SSR) with Angular Universal (waiting for 'window' object on server side) #81 (BREAKING CHANGE)
- Support for IE11 using navigator.mssaveblob #39
- new class Image API (with modal and plain inner objects) (BREAKNIG CHANGE)
- Improve modal layout with small previews and eventually also animations #48 (BREAKING CHANGE)
- Thumbnail size/more options #91 (BREAKNIG CHANGE)
- Completely rewrite "imagepointer feature" #49 (BREAKING CHANGE)
- Square thumbnails are now supported #76 (BREAKING CHANGE)
- Support configurable buttons with custom actions #79 and #92 (BREAKING CHANGE)
- Infinite sliding will be disabled by default #84 (BREAKING CHANGE)
- Click Outside will be enabled by default #85 (BREAKING CHANGE)
- New image descriptions with figcaptions
- remove Observable<Image[]> as input. I decided to switch to Image[] to simplify the sourcecode #105  (BREAKING CHANGE)
- Remove all deprecated APIs (both showDownloadButton and showExtUrlButton)
- prevent browser scrolling when modal gallery is opened

### Performances
- Performance improvements with trackById and OnPush (BREAKING CHANGE) (Commit 3cb56435f0426c715ca442cd1e7a6a5cc222c3b9 and #103)
- add onpush strategy also to modal-gallery.component

### Bugfixes
- Fix a bug on Microsoft Edge Desktop #108

### Chores
- add credits and licenses to all images, icons and so on
- test everything on IE11, Edge, iOS, Android...and what about iPhone X?
- add sonarcloud.io
- release the umd bundle on a CDN like unpkg.com (update: available [HERE](https://unpkg.com/angular-modal-gallery@5.0.0-beta.1/bundles/angular-modal-gallery.umd.min.js) )

### Demos
- Update systemjs example to 5.0.0
- Update webpack example to 5.0.0
- Update angular-cli example to 5.0.0
- Add new universal example to use SSR
- Add new angular-cli-material example with Angular Material
- switch from plnkr.co to stackblitz.com
- Support "https://github.com/mgechev/angular-seed" #56 (it's also working with angular-modal-gallery >= 4.0.0)

### Docs
- Add a MINIMAL migration guide from 4.x.x to 5.0.0
- Update public documentation website to 5.0.0
- Publish public documentation website on a private VPS (coming soon in a week)
- Update library documentation with typedocs to 5.0.0
- add compodoc

### Internal lib changes
- General refactoring reorganizing the structure of this project and splitting some components #42 (BREAKING CHANGE)
- Update unit testing to 5.0.0
- choose which are the right entry points in package.json as described by angular package format 5 specifications


# 5.0.0-rc.3
### Bugfixes
- full description is working again (broken since beta releases)

### Others
- add PayPal donation button and prettier badge


# 5.0.0-rc.2
### Features
- remove REFRESH button (BREAKING CHANGE)

### Others
- update all official examples


# 5.0.0-rc.1
### Bugfixes
- fix prod/aot build with strictNullChecks and add fullTemplateTypeCheck, preserveWhiteSpace, strictInjectionParameters, strictNullChecks to all examples. Reported by @Enngage #122
- permit to remove images without to break previews
- loading spinner is working again. Also I updated all examples with new images (modal+thumb) to show in a better way spinners #120

### Internal library changes
- PlainImage and ModalImage should share only common things, instead of extending a class with all params. This is really confusing.

### Unit testing
- complete unit testing


# 5.0.0-beta.2
### Bugfixes
- when slideConfig doesn't contain the 'infinite' property should disable inifinte sliding
- fix accessibility bug in current-image when inifinte === true

### Unit testing
- add unit tests for current-image and modal-gallery


# 5.0.0-beta.1
### Features
- (requested by @Enngage) configure exturl button to navigate to an external url also in a new tab, instead of only in the current one #116
- expose as public constants both default accessibility config, all button default configs and default size
- increase the maximum size of current modal image reducing useless spacing and margins

### Bugfixes
- (thanks to @Enngage) current image should be centered also vertically

### Unit testing
- add unit tests for background, previews, dots, loading spinner, plain-gallery


# 5.0.0-alpha.5
### Features
- add accessibility features to plain-gallery
- improve PlainGalleryConfig.advanced adding the new 'additionalBackground' property **BREAKING CHANGE**

### Bugfixes
- fix some small bugs everywhere, in particular in upper-buttons.component

### Internal library changes
- switch to Nwrl nx workspace
- improve scss with sass-lint and ts files with prettier
- add both e2e and unit tests support with Nwrl nx workspace
- move `getIndex` to utils
- general refactoring to import from model/index and utils/index

### CI
- add sonarcloud.io analysys
- fix and update all CI config files
- add Jenkins 2 (both local macOS and remote config on a private vps)

### Docs
- add Typedoc also for interfaces, enums, classes, directives and so on

### Others
- add prettier config with both .prettierignore and .prettierrc.json
- add sass-lint config with .sass-lint.yml

### Unit testing
- add tests for all services
- add tests for all directive except for `keyboard-navigation.directive`
- add test for `upper-buttons.component`


# 5.0.0-alpha.4
### Features
- change all "Size" objects using strings to be able to set also 'auto' (apply the same fix to ksSize)
- update all default sizes to support rectangle images (not only squared)
- initial implementation of plain gallery with different layouts (row, column, grid) #91
- re-implement 'image pointer' feature #49
- add square thumbnails feature #76 with an API to choose between <img> and <a> for thumbs
- new class Image API (with modal and plain inner objects)
- add official examples of plain gallery (row with breakConfig, column with breakConfig, grid, row with image pointer, column with image pointer, custom row of images with description)
- define APIs for plain gallery:
  ```
  PlainGalleryConfig = {
    strategy: ENUM of type PlainGalleryStrategy (ROW, COLUM, GRID, CUSTOM)
    layout: // PlainGalleryLayout type that can be either LineLayout, GridLayout or AdvancedLayout
    advanced?: AdvancedConfig {
      aTags: boolean // images will be shown as <a> tags with background instead of <img>
    }
  }

  Size = {
    width: string, // it can be '50px', percentage, 'auto' and so on
    height: string // the same for width
  }

  BreakConfig = {
    length: number,  //  number of images to show
    wrap: boolean // refers to the [wrap property of flex-box](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#article-header-id-4)
  }

  LineLayout = {
    breakConfig: BreakConfig;
    justify: string; string // refers to the [justify property of flex-box](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#article-header-id-6)
    size: Size;
  }

  GridLayout = {
    breakConfig: BreakConfig;
    size: Size;
  }

  AdvancedLayout = {
    modalOpenerByIndex: number, // index of the image to open
    hideDefaultPlainGallery: boolean  // set to true to hide the defaut gallery (prevent multiple plain galleries)
  }
  ```

### Bugfixes
- central image now shown on Microsoft Edge Desktop #108
- fix click-outside.directive on both Edge, IE and Firefox, changing event.toElement to event.target
- fix typedoc support to build the documentation

### Chores
- add license attributions (in README and in the main angular-cli example) to both icons and spinners authors
- add CI scripts (TravisCI, AppVeyor, CircleCI)
- badges in README.md

### Demos
- update all demos to alpha 4
- refactor systemjs demo moving html in an external file

### Docs
- Complete library documentation with typedocs


# 5.0.0-alpha.3
### Features
- prevent browser scrolling when modal gallery is opened (implemented thanks to this `hide scrollbar to fix right margin (thanks to @Enngage)`)

### Bugfixes
- hide scrollbar to fix right margin (thanks to @Enngage)
- restore isFirstImage and isLastImage to show previews again after reached the boundaries
- add height:auto to previews to display also rectangular images


# 5.0.0-alpha.2
### Bug fixes
- emit show output event every time the current image changes
- fix to add images updating the internal model (this bug is caused by OnPush strategy into modal-gallery.component)

### Chores
- upgrade CI config files to 5.0.0-alpha.2


# 5.0.0-alpha.1
### Features
- Rewrite SCSS/CSS layout with **FLEXBOX** fixing some well known bugs #98 #37 (**BREAKING CHANGE**)
- Improve accessibility with ARIA #99 (**BREAKING CHANGE**)
- Update to Angular 5 #83
- Initial support to Server-Side-Rendering (SSR) with Angular Universal #81 (**BREAKING CHANGE**) (**PARTIALLY IMPLEMENTED** - I still have a small issue)
- Add support for IE11 using navigator.mssaveblob #39
- Improve modal layout with small previews and eventually also animations #48 (**BREAKING CHANGE**)
- Support configurable buttons with custom actions #79 and #92 (**BREAKING CHANGE**)
- Support "https://github.com/mgechev/angular-seed" #56 (it's also working with angular-modal-gallery >= 4.0.0)
- Infinite sliding will be disabled by default #84 (**BREAKING CHANGE**)
- Click Outside will be enabled by default #85 (**BREAKING CHANGE**)
- Which is the best place for image description? Think about it. [I decided to use html's tag figurecaption ] [DONE - This feature will be released with #98] (**BREAKING CHANGE**)
- Remove all deprecated APIs (both showDownloadButton and showExtUrlButton) (**BREAKING CHANGE**)

### Performances
- Performance improvements with trackById and OnPush (**BREAKING CHANGE**) (Commit 3cb56435f0426c715ca442cd1e7a6a5cc222c3b9 and #103)
- add onpush strategy also to modal-gallery.component

### Demos
- Update systemjs example to 5.0.0
- Update webpack example to 5.0.0
- Update angular-cli example to 5.0.0
- Add new plunkr examples for both 4.x.x and 5.x.x
- Add new universal example to experiment Server-Side Rendering with Angular Universal

### Docs
- Update library documentation with typedocs to 5.0.0

### Internal library changes
- Remove Angular 2 support (for instance replace Renderer with Renderer2) #70 (**BREAKING CHANGE**)
- General refactoring reorganizing the structure of this project and splitting some components #42 (**BREAKING CHANGE**)
- remove Observable<Image[]> as input. I decided to switch to Image[] to simplify the sourcecode #105 (**BREAKING CHANGE**)
- choose which are the right entry points in package.json as described by angular package format 5 specifications


# 4.0.1
### Chores
- Add LICENSE and other .md files to the released bundle


# 4.0.0
### Features
- Angular 5.x.x support #83 #101
- [Angular Package Format v4.0]( https://goo.gl/AMOU5G) support (very important feature) #100

### Bugfixes
- remove dependencies and devDependencies from /angular-modal-gallery/package.json #101

### BREAKING CHANGES
- **Angular 2 is no longer officially supported**, please upgrade to Angular >= 4
- SystemJs users have to change their `systemjs.config.js` from
```
let map = {
    ...
    'angular-modal-gallery'     : 'node_modules/angular-modal-gallery/dist/bundles',
    ...
  };
```

to:
```
let map = {
    ...
    'angular-modal-gallery'     : 'node_modules/angular-modal-gallery/bundles',
    ...
  };
```

This is required by [Angular Package Format v4.0]( https://goo.gl/AMOU5G) specifications.

A special thanks to [maxkorz](https://github.com/maxkorz) for the support.


# 4.0.0-rc.2
### Bugfixes
- remove dependencies and devDependencies from /angular-modal-gallery/package.json #101

See 4.0.0-rc.1 for other info.


# 4.0.0-rc.1
### Features
- Angular 5.x.x support #83 #101
- [Angular Package Format v4.0]( https://goo.gl/AMOU5G) support (very important feature) #100

### BREAKING CHANGES
- SystemJs users have to change their `systemjs.config.js` from
```
let map = {
    ...
    'angular-modal-gallery'     : 'node_modules/angular-modal-gallery/dist/bundles',
    ...
  };
```

to:
```
let map = {
    ...
    'angular-modal-gallery'     : 'node_modules/angular-modal-gallery/bundles',
    ...
  };
```

This is required by [Angular Package Format v4.0]( https://goo.gl/AMOU5G) specifications.



# 3.3.5
### Chores
- Update FAQ with question "Error: No provider for KeyboardService!" #96

### Docs
- [DOC] fix wrong introduction in demo/no-infinite-sliding #97
- [DOC] fix wrong introduction in demo/keyboard-config #93


# 3.3.4
### Chores
- Update official webpack demo to bootstrap 4 beta #87
- refactoring and cleanup + tslint improved + ci improved #88
- Update docs + add faqs + create templates for github #75
- update to circleci 2.0 and add circleci 2.0 also to the doc website #78
- update all dependencies
- fix config for all CIs

### Docs
- Fix documentation website to be able to navigate to inner routes directly #86


# 3.3.3
### Bug fixes
- Fix for version 3.3.2 (broken)


# 3.3.2
### Internal library changes
- Revert refactoring of 3.3.1


# 3.3.1
### Internal library changes
- Small refactoring
- #73 Trying to fix again "ERROR in Error encountered resolving symbol values statically. Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function ..."


# 3.3.0
### New features
- #41 KeyboardService should be capable to receive an object with an array of shortcuts from outside to configure Mousetrap. This is available as Global configuration of the Root Module.

### Bug fixes
- #73 Fix again "ERROR in Error encountered resolving symbol values statically. Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function ..."


# 3.2.3
Note: **revert version 3.2.2**

### Bug fixes
- #73 Fix again with a different approach this error: "ERROR in Error encountered resolving symbol values statically. Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function ..."


# 3.2.2
### Bug fixes
- #73 Fix: "ERROR in Error encountered resolving symbol values statically. Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function ..."


# 3.2.1
- all dependencies updated
- #71 'ButtonsConfig' was not found in './modal-gallery.component' (bug of angular-cli -> I used a temporary workaround)


# 3.2.0
### New features
- #62 add 'alt' attribute to all img tags
- #45 Both at the beginning and at the end, side arrows should be hidden
- #44 Infinite sliding (configurable)

### Docs
- official documentation updated [HERE](https://ks89.github.io/angular-modal-gallery.github.io/).

### Demos
- all demos updated

### Internal library changes
- #66 improve unit testing with swipe events


# 3.1.1
- fix error in README.md


# 3.1.0
### New features
- #43 `ButtonsConfig` object to configure button's visibility
- #57 `KeyboardConfig` object to customize keyboard's actions (replacing `esc`, `left arrow`, `right arrow`, with other keys)
- #40 new @Input to enable Click outside Directive to close modal-gallery clicking on the semi-transparent background
- #67 Angular 2 is still supported

### Docs
- official documentation updated [HERE](https://ks89.github.io/angular-modal-gallery.github.io/).

### Demos
- #68 angular-cli demo updated to the latest release of angular-cli and with 3 new live examples for angular-modal-gallery 3.1.0
- #68 webpack and systemjs demos updated with 3 new live examples for angular-modal-gallery 3.1.0

### Bug fixes
- #64 hasData event emitted multiple time while initializing the component
- #65 wrong result into ImageModalEvent when clicking left arrow button

### Chores
- #63 Add minimum IE version supported by this library (IE 11)

### Internal library changes
- #14 unit testing
- #59 basic tslint config for angular-modal-gallery lib
- #69 improve CIs config for unit testing (adding also coveralls ad codeclimate's reports)
- #60 build env with npm>=5.0.0 and node>=8.0.0
- #61 replace elementref with renderer to prepare this project to angular-universal (still not supported, but this is the first step)


# 3.0.2
### Chores
- Angular 4.1.0 #50
- dependencies updated

### Docs
- Improved official documentation website (scroll bug fixed #47 and improved responsiveness #38)
- dependencies updated

### Demos
- tslint 5 in all demos #54
- Official demos: IE performance issue with debug mode #51
- dependencies updated


# 3.0.1

### Bug fixes
- readme fix wrong link (exactly the same library of 3.0.0)


# 3.0.0
**THIS VERSION IS A VERY BIG RELEASE. IF YOU WANT TO MIGRATE FROM 2.x.x to 3.0.0 PLEASE CHECK THE OFFICIAL DOCUMENTATION [HERE](https://ks89.github.io/angular-modal-gallery.github.io/)**

### Breaking changes
- `hammerjs` and `mousetrap` are mandatory libraries (install they with `npm install --save hammerjs mousetrap`).
- `(cancelEvent)="myfunction($event)"` replaced by `(close)="myfunction($event)"`.
- `<imageModal></imageModal>` replaced by `<modal-gallery></modal-gallery>`.
- You have to init input images with an `Array<Image>` or an `Observable<Array<Image>>` as explained [HERE](https://ks89.github.io/angular-modal-gallery.github.io/).

### New features
- swipe support for mobile devices with touch-screen.
- optional thumbnail (if you provide only the bigger version, this library will scale down your image).
- downloadable images with both a button and keyboard shortcuts. You have to set `[downloadable]="true"` and `[showExtUrlButton]="true"`.
- optional external url button. You have to set `[showExtUrlButton]="true"`.
- fully configurable description using `[description]="yourDescriptionInterfaceVariable"` passing `Description` interface with `customFullDescription`, `imageText`, `numberSeparator`, `beforeTextDescription`.
If you pass `customFullDescription`, all the others will be overwritten.
- new output events available: `(hasData)="myfunction($event)"`, `(show)="myfunction($event)"`, `(firstImage)="myfunction($event)"`, `(lastImage)="myfunction($event)"`.
- new classes/enums exported and available to all users: `Image`, `Action`, `ImageModalEvent`, `Description`.
    - `Image` is the input class with the following (mandatory) string properties: `thumb`, `img`, `description` and `extUrl`.
    - `Action` is the enum that specify the origin of the action. It can be `NORMAL`, `CLICK`, `KEYBOARD`, `SWIPE`, `LOAD`.
    - `ImageModalEvent` is the output class emitted as payload of an event. It contains both an `Action` and a result (boolean or number).
    - `Description` is the description interface with `customFullDescription`, `imageText`, `numberSeparator`, `beforeTextDescription`.
- `myfunction(event: ImageModalEvent)` can use the Action name as a string with this syntax: `Action[event.action]`, because I exported `Action` enum to all users.
- support for `ModalGalleryModule.forRoot()` to import this module inside your root module (as recommended by Angular). For a child NgModule, you must use simply `ModalGalleryModule`.

### Docs
- official documentation (bootstrap-like :)) with live demo, migration guide and features showcase [HERE](https://ks89.github.io/angular-modal-gallery.github.io/).

### Demos
- new angular-cli official demo inside `demo/angular-cli`
- official systemjs demo updated to 0.20.x with some breaking changes.
- official webpack demo updated to Angular 4 RC :)

### Internal library changes
- big refactoring splitting the sourcecode and using directives, services, sub-components and so on.
- new library structure thanks to [cankayacan](https://github.com/cankayacan/ngx-library-starter).
- css rewritten using scss and a dedicated rollup's plugin.

### Bug fixes
- lot of bug fixes everywhere (.ts, .css but also for mobile devices) :).


# 2.0.2
### Developers and users of this library
- description is now displayed correctly (issue #21)
- documentation improvements

### Myself and other contributor of this project
- npm scripts improved with `ncp` and `mkdirp`
- added `prebuild` and `postbuild` scripts
- building process improved to prevent some errors


# 2.0.0 + 2.0.1
- Stability improvements + bugfixes
- CI support improved but still WIP
- documentation improvements


# alpha.1
- first release based on `vimalavinisha/angular2-image-popup`
- AOT support
- Angular 4 compatibility
- New build system with rollup js
- Experimental CI support
- Two official demo applications (systemjs + webpack 2)
- Live demo with webpack available at https://ks89.github.io/angular-modal-gallery/
