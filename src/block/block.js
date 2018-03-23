import classNames from 'classnames'
import {
  __
} from '@wordpress/i18n'
import {
  RichText,
  ColorPalette,
  registerBlockType,
  InspectorControls,
  BlockControls 
} from '@wordpress/blocks'
import {
  Toolbar,
  BaseControl,
  IconButton
} from '@wordpress/components'
import Content from './content'
import './block.scss'

class ExampleBlock {
  title = __('Example Block', 'example')
  icon = 'screenoptions' // Dashicons icon class
  category = 'common'
  attributes = {
    // Uses HTML selectors to extract its value from the post_content
    content: {
      source: 'children',
      selector: 'p',
      type: 'string'
    },
    // Parsed automatically from hidden JSON literal block comments in the post_content
    textColor: {
      type: 'string'
    },
    // Traditional post_meta value. Meta must be registered with register_meta(), show_in_rest set to true
    isPinned: {
      source: 'meta',
      meta: 'example_is_pinned',
      type: 'boolean'
    }
  }
  renderInspector = ({ isSelected, attributes, setAttributes }) => {
    if (!isSelected) {
      return null
    }
    const {
      textColor
    } = attributes
    return (
      <InspectorControls>
        <div>
          <h2>{__('Text Color', 'example')}</h2>
          <BaseControl>
            <ColorPalette 
              value={textColor}
              onChange={(textColor) => setAttributes({ textColor })} />
            </BaseControl>
        </div>
      </InspectorControls>
    )
  }
  renderToolbar = ({ isSelected, attributes, setAttributes }) => {
    if (!isSelected) {
      return null
    }
    const {
      isPinned
    } = attributes
    return (
      <BlockControls>
        <Toolbar>
          <IconButton 
            className={classNames({
              'pin': true,
              'is-pinned': isPinned
            })}
            icon="admin-post"
            onClick={() => setAttributes({ isPinned: !isPinned })}
            tooltip={isPinned ? __('Unpin', 'example') : __('Pin This', 'example')} />
        </Toolbar>
      </BlockControls>
    )
  }
  edit = ({ attributes, setAttributes, className, isSelected }) => {
    const {
      content,
      textColor
    } = attributes
    return (
      <div className={className}>
        { this.renderToolbar({ isSelected, attributes, setAttributes }) }
        { this.renderInspector({ isSelected, attributes, setAttributes }) }
        <Content textColor={textColor}>
          <RichText 
            className="example-content"
            value={content}
            onChange={(content) => setAttributes({ content })} />
        </Content>
      </div>
    )
  }
  save = ({ attributes, className }) => {
    const {
      content,
      textColor,
      isPinned
    } = attributes
    return (
      <div className={classNames({'is-pinned': isPinned })}>
        <Content textColor={textColor}>
          <p>{content}</p>
        </Content>
      </div>
    )
  }
}

registerBlockType('example/example-block', new ExampleBlock())