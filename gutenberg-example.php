<?php
/**
 * Plugin Name: Gutenberg Example
 * Description: Example plugin for creating custom Gutenberg blocks.
 * Version: 1.0.0
 * 
 * @since 1.0.0
 * @package example
 */
namespace example;

const VERSION = '1.0.0';

function wp_debug() {
  return defined( 'WP_DEBUG' ) && WP_DEBUG;
}

function register_blocks() {
    register_block_type( 'example/example-block', array(
      'editor_script' => 'example-block-editor',
      'editor_style'  => 'example-block-editor'
    ) );
}
add_action( 'init', 'example\register_blocks' );

function register_block_assets() {
  if ( wp_debug() ) {
    $script = "build/block.bundle.js";
  } else {
    $script = "build/block.production.min.js";
  }
  $deps = array( 
    'wp-blocks', 
    'wp-i18n', 
    'wp-element',
    'wp-components'
  );
  $version = VERSION;

  if ( wp_debug() ) {
    $version = filemtime( plugin_dir_path( __FILE__ ) . $script );
  }
  wp_register_script( 'example-block-editor', plugins_url( $script , __FILE__ ), $deps, $version );
}
add_action( 'init', 'example\register_block_assets' );

function register_pinned_meta() {
  register_meta( 'post', 'example_is_pinned', array(
    'show_in_rest' => true,
    'single'       => true,
    'type'         => 'boolean',
  ) );
}
add_action( 'init', 'example\register_pinned_meta' );