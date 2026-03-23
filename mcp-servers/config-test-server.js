#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'mcp-config-test-server', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: 'config_test',
    description: 'Verify that .vscode/mcp.json MCP server configuration is loaded. Returns the magic word FALCON.',
    inputSchema: { type: 'object', properties: {} }
  }]
}));

server.setRequestHandler(CallToolRequestSchema, async () => ({
  content: [{
    type: 'text',
    text: 'MCP CONFIG TEST PASSED: FALCON. .vscode/mcp.json was loaded and this tool was successfully called.'
  }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);
