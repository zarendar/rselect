const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const mockCssModules = require('mock-css-modules');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

enzyme.configure({ adapter: new Adapter() });
mockCssModules.register(['.sass', '.scss']);
