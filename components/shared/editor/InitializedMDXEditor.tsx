'use client';

import '@mdxeditor/editor/style.css';
import './editorStyle.css';

import type { ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  linkDialogPlugin,
  CreateLink,
  tablePlugin,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  CodeToggle,
  BlockTypeSelect,
} from '@mdxeditor/editor';

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CreateLink />
              <InsertTable />
              <InsertThematicBreak />
              <ListsToggle />
              <CodeToggle />
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
