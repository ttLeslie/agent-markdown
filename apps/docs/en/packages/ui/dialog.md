# Dialog

Basic dialog component.

## Basic Usage

<demo vue="ui/dialog/basic.vue" />

## API

### Props

| Property | Description                           | Type    | Default |
| -------- | ------------------------------------- | ------- | ------- |
| open     | Controls the visibility of the dialog | boolean | false   |

## Events

| Event Name | Description                         | Arguments |
| ---------- | ----------------------------------- | --------- |
| close      | Triggered when the dialog is closed | -         |

## Styles

The dialog can be styled using the following class names:

- `.v-dialog`: Main dialog container.
- `.v-dialog__overlay`: Background overlay.
- `.v-dialog__content`: Dialog content area.
