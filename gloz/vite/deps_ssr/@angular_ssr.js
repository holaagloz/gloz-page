import { $n as Output, Ac as InjectionToken, Bn as LOCALE_ID, E as annotateForHydration, El as signal, Er as ViewContainerRef, F as createPlatformFactory, Fl as ɵɵinject, Fn as Injectable, Gc as PendingTasksInternal, Hc as PLATFORM_INITIALIZER, Hl as require_cjs, In as Input, Jl as __toESM, Ki as setDocument, Li as resetCompiledComponents, Ml as ɵɵdefineInjector, Mn as IS_HYDRATION_DOM_REUSE_ENABLED, Pn as Inject, Sc as EnvironmentInjector, Sl as provideEnvironmentInitializer, Vc as PLATFORM_ID, Wi as setClassMetadata, X as input, Yc as TransferState, Yn as NgModuleFactory$1, Zo as ɵɵinvalidFactory, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, b as REQUEST_CONTEXT, cn as Component, cr as SSR_CONTENT_INTEGRITY_MARKER, dr as Service, et as maybeUnwrapDefaultExport, fc as require_operators, fl as inject, fn as Console$1, ft as reflectComponentType, gc as CSP_NONCE, gl as isStandalone, ht as stopMeasuring, io as ɵɵdefineDirective, ir as Renderer2, jc as Injector, jl as ɵɵdefineInjectable, kc as INTERNAL_APPLICATION_ERROR_HANDLER, la as ɵɵNgOnChangesFeature, mc as APP_ID, ml as isInjectable, mr as TESTABILITY, mt as startMeasuring, ol as formatRuntimeError, on as Compiler, ot as platformCore, qc as RuntimeError, qn as NgModule, qr as createEnvironmentInjector, qt as untracked, r as ChangeDetectorRef, ro as ɵɵdefineComponent, s as ENABLE_ROOT_COMPONENT_BOOTSTRAP, so as ɵɵdefineService, tn as ApplicationRef, vc as DOCUMENT, vi as isNgModule$1, vl as makeEnvironmentProviders, vo as ɵɵelement, wc as EventEmitter, wl as runInInjectionContext, wn as Directive, x as RESPONSE_INIT, y as REQUEST, yc as DestroyRef, yi as isPromise, yr as Testability } from "./core-Bi28GoeU.js";
import { Ht as PlatformLocation, Mt as APP_BASE_HREF, Nt as Location, Ut as getDOM, Wt as setRootDomAdapter, i as NullViewportScroller, l as ViewportScroller, o as PLATFORM_SERVER_ID, v as XhrFactory } from "./common-BtrNvguz.js";
import { A as EVENT_MANAGER_PLUGINS, M as EventManagerPlugin, S as BrowserModule, b as BrowserDomAdapter, s as Title, v as HTTP_FETCH_MAX_RESPONSE_SIZE, y as HTTP_ROOT_INTERCEPTOR_FNS } from "./platform-browser-DNJqDQr9.js";
import { t as index } from "./bundled-domino-JkvTk_Nn.js";
// node_modules/@angular/router/fesm2022/_router-chunk.mjs
/**
* @license Angular v22.2.4
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var import_cjs = require_cjs();
var import_operators = require_operators();
var PRIMARY_OUTLET = "primary";
var RouteTitleKey = /* @__PURE__ */ Symbol("RouteTitle");
var ParamsAsMap = class {
	params;
	constructor(params) {
		this.params = params || {};
	}
	has(name) {
		return Object.hasOwn(this.params, name);
	}
	get(name) {
		if (this.has(name)) {
			const v = this.params[name];
			return Array.isArray(v) ? v[0] : v;
		}
		return null;
	}
	getAll(name) {
		if (this.has(name)) {
			const v = this.params[name];
			return Array.isArray(v) ? v : [v];
		}
		return [];
	}
	get keys() {
		return Object.keys(this.params);
	}
};
function convertToParamMap(params) {
	return new ParamsAsMap(params);
}
function matchParts(routeParts, urlSegments, posParams) {
	for (let i = 0; i < routeParts.length; i++) {
		const part = routeParts[i];
		const segment = urlSegments[i];
		if (part[0] === ":") posParams[part.substring(1)] = segment;
		else if (part !== segment.path) return false;
	}
	return true;
}
function defaultUrlMatcher(segments, segmentGroup, route) {
	const parts = route.path.split("/");
	const wildcardIndex = parts.indexOf("**");
	if (wildcardIndex === -1) {
		if (parts.length > segments.length) return null;
		if (route.pathMatch === "full" && (segmentGroup.hasChildren() || parts.length < segments.length)) return null;
		const posParams = {};
		const consumed = segments.slice(0, parts.length);
		if (!matchParts(parts, consumed, posParams)) return null;
		return {
			consumed,
			posParams
		};
	}
	if (wildcardIndex !== parts.lastIndexOf("**")) return null;
	const pre = parts.slice(0, wildcardIndex);
	const post = parts.slice(wildcardIndex + 1);
	if (pre.length + post.length > segments.length) return null;
	if (route.pathMatch === "full" && segmentGroup.hasChildren() && route.path !== "**") return null;
	const posParams = {};
	if (!matchParts(pre, segments.slice(0, pre.length), posParams)) return null;
	if (!matchParts(post, segments.slice(segments.length - post.length), posParams)) return null;
	return {
		consumed: segments,
		posParams
	};
}
function firstValueFrom(source) {
	return new Promise((resolve, reject) => {
		source.pipe((0, import_operators.first)()).subscribe({
			next: (value) => resolve(value),
			error: (err) => reject(err)
		});
	});
}
function shallowEqualArrays(a, b) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; ++i) if (!shallowEqual(a[i], b[i])) return false;
	return true;
}
function shallowEqual(a, b) {
	const k1 = a ? getDataKeys(a) : void 0;
	const k2 = b ? getDataKeys(b) : void 0;
	if (!k1 || !k2 || k1.length != k2.length) return false;
	let key;
	for (let i = 0; i < k1.length; i++) {
		key = k1[i];
		if (!equalArraysOrString(a[key], b[key])) return false;
	}
	return true;
}
function getDataKeys(obj) {
	return [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
}
function equalArraysOrString(a, b) {
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		const aSorted = [...a].sort();
		const bSorted = [...b].sort();
		return aSorted.every((val, index) => bSorted[index] === val);
	} else return a === b;
}
function last(a) {
	return a.length > 0 ? a[a.length - 1] : null;
}
function wrapIntoObservable(value) {
	if ((0, import_cjs.isObservable)(value)) return value;
	if (isPromise(value)) return (0, import_cjs.from)(Promise.resolve(value));
	return (0, import_cjs.of)(value);
}
function wrapIntoPromise(value) {
	if ((0, import_cjs.isObservable)(value)) return firstValueFrom(value);
	return Promise.resolve(value);
}
var pathCompareMap = {
	"exact": equalSegmentGroups,
	"subset": containsSegmentGroup
};
var paramCompareMap = {
	"exact": equalParams,
	"subset": containsParams,
	"ignored": () => true
};
var exactMatchOptions = {
	paths: "exact",
	fragment: "ignored",
	matrixParams: "ignored",
	queryParams: "exact"
};
var subsetMatchOptions = {
	paths: "subset",
	fragment: "ignored",
	matrixParams: "ignored",
	queryParams: "subset"
};
function containsTree(container, containee, options) {
	const matchOptions = {
		...subsetMatchOptions,
		...options || {}
	};
	return pathCompareMap[matchOptions.paths](container.root, containee.root, matchOptions.matrixParams) && paramCompareMap[matchOptions.queryParams](container.queryParams, containee.queryParams) && !(matchOptions.fragment === "exact" && container.fragment !== containee.fragment);
}
function equalParams(container, containee) {
	return shallowEqual(container, containee);
}
function equalSegmentGroups(container, containee, matrixParams) {
	if (!equalPath(container.segments, containee.segments)) return false;
	if (!matrixParamsMatch(container.segments, containee.segments, matrixParams)) return false;
	if (container.numberOfChildren !== containee.numberOfChildren) return false;
	for (const c in containee.children) {
		if (!container.children[c]) return false;
		if (!equalSegmentGroups(container.children[c], containee.children[c], matrixParams)) return false;
	}
	return true;
}
function containsParams(container, containee) {
	return Object.keys(containee).length <= Object.keys(container).length && Object.keys(containee).every((key) => equalArraysOrString(container[key], containee[key]));
}
function containsSegmentGroup(container, containee, matrixParams) {
	return containsSegmentGroupHelper(container, containee, containee.segments, matrixParams);
}
function containsSegmentGroupHelper(container, containee, containeePaths, matrixParams) {
	if (container.segments.length > containeePaths.length) {
		const current = container.segments.slice(0, containeePaths.length);
		if (!equalPath(current, containeePaths)) return false;
		if (containee.hasChildren()) return false;
		if (!matrixParamsMatch(current, containeePaths, matrixParams)) return false;
		return true;
	} else if (container.segments.length === containeePaths.length) {
		if (!equalPath(container.segments, containeePaths)) return false;
		if (!matrixParamsMatch(container.segments, containeePaths, matrixParams)) return false;
		for (const c in containee.children) {
			if (!container.children[c]) return false;
			if (!containsSegmentGroup(container.children[c], containee.children[c], matrixParams)) return false;
		}
		return true;
	} else {
		const current = containeePaths.slice(0, container.segments.length);
		const next = containeePaths.slice(container.segments.length);
		if (!equalPath(container.segments, current)) return false;
		if (!matrixParamsMatch(container.segments, current, matrixParams)) return false;
		if (!container.children["primary"]) return false;
		return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next, matrixParams);
	}
}
function matrixParamsMatch(containerPaths, containeePaths, options) {
	return containeePaths.every((containeeSegment, i) => {
		return paramCompareMap[options](containerPaths[i].parameters, containeeSegment.parameters);
	});
}
var UrlTree = class {
	root;
	queryParams;
	fragment;
	_queryParamMap;
	constructor(root = new UrlSegmentGroup([], {}), queryParams = {}, fragment = null) {
		this.root = root;
		this.queryParams = queryParams;
		this.fragment = fragment;
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			if (root.segments.length > 0) throw new RuntimeError(4015, "The root `UrlSegmentGroup` should not contain `segments`. Instead, these segments belong in the `children` so they can be associated with a named outlet.");
		}
	}
	get queryParamMap() {
		this._queryParamMap ??= convertToParamMap(this.queryParams);
		return this._queryParamMap;
	}
	toString() {
		return DEFAULT_SERIALIZER.serialize(this);
	}
};
var UrlSegmentGroup = class {
	segments;
	children;
	parent = null;
	constructor(segments, children) {
		this.segments = segments;
		this.children = children;
		Object.values(children).forEach((v) => v.parent = this);
	}
	hasChildren() {
		return this.numberOfChildren > 0;
	}
	get numberOfChildren() {
		return Object.keys(this.children).length;
	}
	toString() {
		return serializePaths(this);
	}
};
var UrlSegment = class {
	path;
	parameters;
	_parameterMap;
	constructor(path, parameters) {
		this.path = path;
		this.parameters = parameters;
	}
	get parameterMap() {
		this._parameterMap ??= convertToParamMap(this.parameters);
		return this._parameterMap;
	}
	toString() {
		return serializePath(this);
	}
};
function equalSegments(as, bs) {
	return equalPath(as, bs) && as.every((a, i) => shallowEqual(a.parameters, bs[i].parameters));
}
function equalPath(as, bs) {
	if (as.length !== bs.length) return false;
	return as.every((a, i) => a.path === bs[i].path);
}
function mapChildrenIntoArray(segment, fn) {
	let res = [];
	Object.entries(segment.children).forEach(([childOutlet, child]) => {
		if (childOutlet === "primary") res = res.concat(fn(child, childOutlet));
	});
	Object.entries(segment.children).forEach(([childOutlet, child]) => {
		if (childOutlet !== "primary") res = res.concat(fn(child, childOutlet));
	});
	return res;
}
var UrlSerializer = class UrlSerializer {
	static ɵfac = function UrlSerializer_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || UrlSerializer)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: UrlSerializer,
		factory: () => (() => new DefaultUrlSerializer())()
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UrlSerializer, [{
		type: Service,
		args: [{ factory: () => new DefaultUrlSerializer() }]
	}], null, null);
})();
var DefaultUrlSerializer = class {
	parse(url) {
		const p = new UrlParser(url);
		return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
	}
	serialize(tree) {
		let segment = `/${serializeSegment(tree.root, true)}`;
		if (isProtocolRelative(segment)) {
			if (typeof ngDevMode === "undefined" || ngDevMode) console.warn(formatRuntimeError(4019, `Cannot serialize a UrlTree that would produce a protocol-relative URL. Falling back to '/' instead.`));
			segment = "/";
		}
		const query = serializeQueryParams(tree.queryParams);
		const fragment = typeof tree.fragment === `string` ? `#${encodeUriFragment(tree.fragment)}` : "";
		return `${segment}${query}${fragment}`;
	}
};
var DUMMY_BASE_URL = "http://fake";
function isProtocolRelative(url) {
	try {
		const resolved = new URL(url, DUMMY_BASE_URL);
		return resolved.origin !== DUMMY_BASE_URL || resolved.pathname.startsWith("//");
	} catch {
		return true;
	}
}
var DEFAULT_SERIALIZER = new DefaultUrlSerializer();
function serializePaths(segment) {
	return segment.segments.map((p) => serializePath(p)).join("/");
}
function serializeSegment(segment, root) {
	if (!segment.hasChildren()) return serializePaths(segment);
	if (root) {
		const primary = segment.children["primary"] ? serializeSegment(segment.children[PRIMARY_OUTLET], false) : "";
		const children = [];
		Object.entries(segment.children).forEach(([k, v]) => {
			if (k !== "primary") children.push(`${k}:${serializeSegment(v, false)}`);
		});
		return children.length > 0 ? `${primary}(${children.join("//")})` : primary;
	} else {
		if (Object.keys(segment.children).length === 1 && segment.children["primary"] != null) return `${serializePaths(segment)}/${serializeSegment(segment.children[PRIMARY_OUTLET], false)}`;
		const children = mapChildrenIntoArray(segment, (v, k) => {
			if (k === "primary") return [escapeOutletDelimiter(serializeSegment(segment.children[PRIMARY_OUTLET], false))];
			return [`${k}:${serializeSegment(v, false)}`];
		});
		return `${serializePaths(segment)}/(${children.join("//")})`;
	}
}
function escapeOutletDelimiter(serializedPrimary) {
	return serializedPrimary.replace(SEGMENT_RE, (firstSegment) => firstSegment.replace(/:/g, "%3A"));
}
function encodeUriString(s) {
	return encodeURIComponent(s).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",");
}
function encodeUriQuery(s) {
	return encodeUriString(s).replace(/%3B/gi, ";");
}
function encodeUriFragment(s) {
	return encodeURI(s);
}
function encodeUriSegment(s) {
	return encodeUriString(s).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&");
}
function decode(s) {
	return decodeURIComponent(s);
}
function decodeQuery(s) {
	return decode(s.replace(/\+/g, "%20"));
}
function serializePath(path) {
	return `${encodeUriSegment(path.path)}${serializeMatrixParams(path.parameters)}`;
}
function serializeMatrixParams(params) {
	return Object.entries(params).map(([key, value]) => `;${encodeUriSegment(key)}=${encodeUriSegment(value)}`).join("");
}
function serializeQueryParams(params) {
	const strParams = Object.entries(params).map(([name, value]) => {
		return Array.isArray(value) ? value.map((v) => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join("&") : `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
	}).filter((s) => s);
	return strParams.length ? `?${strParams.join("&")}` : "";
}
var SLOW_ELEMENTS_SENTINEL = 1073741824;
function setUrlDerivedKey(target, key, value) {
	if (Number(key) >= 32 && !Object.hasOwn(target, SLOW_ELEMENTS_SENTINEL)) {
		target[SLOW_ELEMENTS_SENTINEL] = value;
		delete target[SLOW_ELEMENTS_SENTINEL];
	}
	target[key] = value;
}
var SEGMENT_RE = /^[^\/()?;#]+/;
function matchSegments(str) {
	const match = str.match(SEGMENT_RE);
	return match ? match[0] : "";
}
var MATRIX_PARAM_SEGMENT_RE = /^[^\/()?;=#]+/;
function matchMatrixKeySegments(str) {
	const match = str.match(MATRIX_PARAM_SEGMENT_RE);
	return match ? match[0] : "";
}
var QUERY_PARAM_RE = /^[^=?&#]+/;
function matchQueryParams(str) {
	const match = str.match(QUERY_PARAM_RE);
	return match ? match[0] : "";
}
var QUERY_PARAM_VALUE_RE = /^[^&#]+/;
function matchUrlQueryParamValue(str) {
	const match = str.match(QUERY_PARAM_VALUE_RE);
	return match ? match[0] : "";
}
var UrlParser = class {
	url;
	remaining;
	constructor(url) {
		this.url = url;
		this.remaining = url;
	}
	parseRootSegment() {
		while (this.consumeOptional("/"));
		if (this.remaining === "" || this.peekStartsWith("?") || this.peekStartsWith("#")) return new UrlSegmentGroup([], {});
		return new UrlSegmentGroup([], this.parseChildren());
	}
	parseQueryParams() {
		const params = {};
		if (this.consumeOptional("?")) do
			this.parseQueryParam(params);
		while (this.consumeOptional("&"));
		return params;
	}
	parseFragment() {
		return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null;
	}
	parseChildren(depth = 0) {
		if (depth > 50) throw new RuntimeError(4010, (typeof ngDevMode === "undefined" || ngDevMode) && "URL is too deep");
		if (this.remaining === "") return {};
		this.consumeOptional("/");
		const segments = [];
		if (!this.peekStartsWith("(")) segments.push(this.parseSegment());
		while (this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(")) {
			this.capture("/");
			segments.push(this.parseSegment());
		}
		let children = {};
		if (this.peekStartsWith("/(")) {
			this.capture("/");
			children = this.parseParens(true, depth);
		}
		let res = {};
		if (this.peekStartsWith("(")) res = this.parseParens(false, depth);
		if (segments.length > 0 || Object.keys(children).length > 0) res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
		return res;
	}
	parseSegment() {
		const path = matchSegments(this.remaining);
		if (path === "" && this.peekStartsWith(";")) throw new RuntimeError(4009, (typeof ngDevMode === "undefined" || ngDevMode) && `Empty path url segment cannot have parameters: '${this.remaining}'.`);
		this.capture(path);
		return new UrlSegment(decode(path), this.parseMatrixParams());
	}
	parseMatrixParams() {
		const params = {};
		while (this.consumeOptional(";")) this.parseParam(params);
		return params;
	}
	parseParam(params) {
		const key = matchMatrixKeySegments(this.remaining);
		if (!key) return;
		this.capture(key);
		let value = "";
		if (this.consumeOptional("=")) {
			const valueMatch = matchSegments(this.remaining);
			if (valueMatch) {
				value = valueMatch;
				this.capture(value);
			}
		}
		setUrlDerivedKey(params, decode(key), decode(value));
	}
	parseQueryParam(params) {
		const key = matchQueryParams(this.remaining);
		if (!key) return;
		this.capture(key);
		let value = "";
		if (this.consumeOptional("=")) {
			const valueMatch = matchUrlQueryParamValue(this.remaining);
			if (valueMatch) {
				value = valueMatch;
				this.capture(value);
			}
		}
		const decodedKey = decodeQuery(key);
		const decodedVal = decodeQuery(value);
		if (Object.hasOwn(params, decodedKey)) {
			let currentVal = params[decodedKey];
			if (!Array.isArray(currentVal)) {
				currentVal = [currentVal];
				params[decodedKey] = currentVal;
			}
			currentVal.push(decodedVal);
		} else params[decodedKey] = decodedVal;
	}
	parseParens(allowPrimary, depth) {
		const segments = Object.create(null);
		this.capture("(");
		while (!this.consumeOptional(")") && this.remaining.length > 0) {
			const path = matchSegments(this.remaining);
			const next = this.remaining[path.length];
			if (next !== "/" && next !== ")" && next !== ";") throw new RuntimeError(4010, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot parse url '${this.url}'`);
			let outletName;
			if (path.indexOf(":") > -1) {
				outletName = path.slice(0, path.indexOf(":"));
				this.capture(outletName);
				this.capture(":");
			} else if (allowPrimary) outletName = PRIMARY_OUTLET;
			const children = this.parseChildren(depth + 1);
			const child = Object.keys(children).length === 1 && children["primary"] ? children[PRIMARY_OUTLET] : new UrlSegmentGroup([], children);
			setUrlDerivedKey(segments, outletName ?? "primary", child);
			this.consumeOptional("//");
		}
		return segments;
	}
	peekStartsWith(str) {
		return this.remaining.startsWith(str);
	}
	consumeOptional(str) {
		if (this.peekStartsWith(str)) {
			this.remaining = this.remaining.substring(str.length);
			return true;
		}
		return false;
	}
	capture(str) {
		if (!this.consumeOptional(str)) throw new RuntimeError(4011, (typeof ngDevMode === "undefined" || ngDevMode) && `Expected "${str}".`);
	}
};
function createRoot(rootCandidate) {
	return rootCandidate.segments.length > 0 ? new UrlSegmentGroup([], { [PRIMARY_OUTLET]: rootCandidate }) : rootCandidate;
}
function squashSegmentGroup(segmentGroup) {
	const newChildren = Object.create(null);
	for (const [childOutlet, child] of Object.entries(segmentGroup.children)) {
		const childCandidate = squashSegmentGroup(child);
		if (childOutlet === "primary" && childCandidate.segments.length === 0 && childCandidate.hasChildren()) for (const [grandChildOutlet, grandChild] of Object.entries(childCandidate.children)) setUrlDerivedKey(newChildren, grandChildOutlet, grandChild);
		else if (childCandidate.segments.length > 0 || childCandidate.hasChildren()) setUrlDerivedKey(newChildren, childOutlet, childCandidate);
	}
	return mergeTrivialChildren(new UrlSegmentGroup(segmentGroup.segments, newChildren));
}
function mergeTrivialChildren(s) {
	if (s.numberOfChildren === 1 && s.children["primary"]) {
		const c = s.children[PRIMARY_OUTLET];
		return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
	}
	return s;
}
function isUrlTree(v) {
	return v instanceof UrlTree;
}
function createUrlTreeFromSnapshot(relativeTo, commands, queryParams = null, fragment = null, urlSerializer = new DefaultUrlSerializer()) {
	return createUrlTreeFromSegmentGroup(createSegmentGroupFromRoute(relativeTo), commands, queryParams, fragment, urlSerializer);
}
function createSegmentGroupFromRoute(route) {
	let targetGroup;
	function createSegmentGroupFromRouteRecursive(currentRoute) {
		const childOutlets = {};
		for (const childSnapshot of currentRoute.children) {
			const root = createSegmentGroupFromRouteRecursive(childSnapshot);
			childOutlets[childSnapshot.outlet] = root;
		}
		const segmentGroup = new UrlSegmentGroup(currentRoute.url, childOutlets);
		if (currentRoute === route) targetGroup = segmentGroup;
		return segmentGroup;
	}
	const rootSegmentGroup = createRoot(createSegmentGroupFromRouteRecursive(route.root));
	return targetGroup ?? rootSegmentGroup;
}
function createUrlTreeFromSegmentGroup(relativeTo, commands, queryParams, fragment, urlSerializer) {
	let root = relativeTo;
	while (root.parent) root = root.parent;
	if (commands.length === 0) return tree(root, root, root, queryParams, fragment, urlSerializer);
	const nav = computeNavigation(commands);
	if (nav.toRoot()) return tree(root, root, new UrlSegmentGroup([], {}), queryParams, fragment, urlSerializer);
	const position = findStartingPositionForTargetGroup(nav, root, relativeTo);
	const newSegmentGroup = position.processChildren ? updateSegmentGroupChildren(position.segmentGroup, position.index, nav.commands) : updateSegmentGroup(position.segmentGroup, position.index, nav.commands);
	return tree(root, position.segmentGroup, newSegmentGroup, queryParams, fragment, urlSerializer);
}
function isMatrixParams(command) {
	return typeof command === "object" && command != null && !command.outlets && !command.segmentPath;
}
function isCommandWithOutlets(command) {
	return typeof command === "object" && command != null && command.outlets;
}
function normalizeQueryParams(k, v, urlSerializer) {
	k ||= "ɵ";
	const tree = new UrlTree();
	tree.queryParams = { [k]: v };
	return urlSerializer.parse(urlSerializer.serialize(tree)).queryParams[k];
}
function tree(oldRoot, oldSegmentGroup, newSegmentGroup, queryParams, fragment, urlSerializer) {
	const qp = {};
	for (const [key, value] of Object.entries(queryParams ?? {})) {
		if (value === null || value === void 0) continue;
		qp[key] = Array.isArray(value) ? value.map((v) => normalizeQueryParams(key, v, urlSerializer)) : normalizeQueryParams(key, value, urlSerializer);
	}
	let rootCandidate;
	if (oldRoot === oldSegmentGroup) rootCandidate = newSegmentGroup;
	else rootCandidate = replaceSegment(oldRoot, oldSegmentGroup, newSegmentGroup);
	return new UrlTree(createRoot(squashSegmentGroup(rootCandidate)), qp, fragment);
}
function replaceSegment(current, oldSegment, newSegment) {
	const children = Object.create(null);
	Object.entries(current.children).forEach(([outletName, c]) => {
		if (c === oldSegment) children[outletName] = newSegment;
		else children[outletName] = replaceSegment(c, oldSegment, newSegment);
	});
	return new UrlSegmentGroup(current.segments, children);
}
var Navigation = class {
	isAbsolute;
	numberOfDoubleDots;
	commands;
	constructor(isAbsolute, numberOfDoubleDots, commands) {
		this.isAbsolute = isAbsolute;
		this.numberOfDoubleDots = numberOfDoubleDots;
		this.commands = commands;
		if (isAbsolute && commands.length > 0 && isMatrixParams(commands[0])) throw new RuntimeError(4003, (typeof ngDevMode === "undefined" || ngDevMode) && "Root segment cannot have matrix parameters");
		const cmdWithOutlet = commands.find(isCommandWithOutlets);
		if (cmdWithOutlet && cmdWithOutlet !== last(commands)) throw new RuntimeError(4004, (typeof ngDevMode === "undefined" || ngDevMode) && "{outlets:{}} has to be the last command");
	}
	toRoot() {
		return this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/";
	}
};
function computeNavigation(commands) {
	if (typeof commands[0] === "string" && commands.length === 1 && commands[0] === "/") return new Navigation(true, 0, commands);
	let numberOfDoubleDots = 0;
	let isAbsolute = false;
	const res = commands.reduce((res, cmd, cmdIdx) => {
		if (typeof cmd === "object" && cmd != null) {
			if (cmd.outlets) {
				const outlets = {};
				Object.entries(cmd.outlets).forEach(([name, commands]) => {
					outlets[name] = typeof commands === "string" ? commands.split("/") : commands;
				});
				return [...res, { outlets }];
			}
			if (cmd.segmentPath) return [...res, cmd.segmentPath];
		}
		if (!(typeof cmd === "string")) return [...res, cmd];
		if (cmdIdx === 0) {
			cmd.split("/").forEach((urlPart, partIndex) => {
				if (partIndex == 0 && urlPart === ".");
				else if (partIndex == 0 && urlPart === "") isAbsolute = true;
				else if (urlPart === "..") numberOfDoubleDots++;
				else if (urlPart != "") res.push(urlPart);
			});
			return res;
		}
		return [...res, cmd];
	}, []);
	return new Navigation(isAbsolute, numberOfDoubleDots, res);
}
var Position = class {
	segmentGroup;
	processChildren;
	index;
	constructor(segmentGroup, processChildren, index) {
		this.segmentGroup = segmentGroup;
		this.processChildren = processChildren;
		this.index = index;
	}
};
function findStartingPositionForTargetGroup(nav, root, target) {
	if (nav.isAbsolute) return new Position(root, true, 0);
	if (!target) return new Position(root, false, NaN);
	if (target.parent === null) return new Position(target, true, 0);
	const modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
	return createPositionApplyingDoubleDots(target, target.segments.length - 1 + modifier, nav.numberOfDoubleDots);
}
function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
	let g = group;
	let ci = index;
	let dd = numberOfDoubleDots;
	while (dd > ci) {
		dd -= ci;
		g = g.parent;
		if (!g) throw new RuntimeError(4005, (typeof ngDevMode === "undefined" || ngDevMode) && "Invalid number of '../'");
		ci = g.segments.length;
	}
	return new Position(g, false, ci - dd);
}
function getOutlets(commands) {
	if (isCommandWithOutlets(commands[0])) return commands[0].outlets;
	return { [PRIMARY_OUTLET]: commands };
}
function updateSegmentGroup(segmentGroup, startIndex, commands) {
	segmentGroup ??= new UrlSegmentGroup([], {});
	if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
	const m = prefixedWith(segmentGroup, startIndex, commands);
	const slicedCommands = commands.slice(m.commandIndex);
	if (m.match && m.pathIndex < segmentGroup.segments.length) {
		const g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
		g.children[PRIMARY_OUTLET] = new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
		return updateSegmentGroupChildren(g, 0, slicedCommands);
	} else if (m.match && slicedCommands.length === 0) return new UrlSegmentGroup(segmentGroup.segments, {});
	else if (m.match && !segmentGroup.hasChildren()) return createNewSegmentGroup(segmentGroup, startIndex, commands);
	else if (m.match) return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
	else return createNewSegmentGroup(segmentGroup, startIndex, commands);
}
function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
	if (commands.length === 0) return new UrlSegmentGroup(segmentGroup.segments, {});
	else {
		const outlets = getOutlets(commands);
		const children = Object.create(null);
		if (Object.keys(outlets).some((o) => o !== "primary") && segmentGroup.children["primary"] && segmentGroup.numberOfChildren === 1 && segmentGroup.children["primary"].segments.length === 0) {
			const childrenOfEmptyChild = updateSegmentGroupChildren(segmentGroup.children[PRIMARY_OUTLET], startIndex, commands);
			return new UrlSegmentGroup(segmentGroup.segments, childrenOfEmptyChild.children);
		}
		Object.entries(outlets).forEach(([outlet, commands]) => {
			if (typeof commands === "string") commands = [commands];
			if (commands !== null) children[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands);
		});
		Object.entries(segmentGroup.children).forEach(([childOutlet, child]) => {
			if (outlets[childOutlet] === void 0) children[childOutlet] = child;
		});
		return new UrlSegmentGroup(segmentGroup.segments, children);
	}
}
function prefixedWith(segmentGroup, startIndex, commands) {
	let currentCommandIndex = 0;
	let currentPathIndex = startIndex;
	const noMatch = {
		match: false,
		pathIndex: 0,
		commandIndex: 0
	};
	while (currentPathIndex < segmentGroup.segments.length) {
		if (currentCommandIndex >= commands.length) return noMatch;
		const path = segmentGroup.segments[currentPathIndex];
		const command = commands[currentCommandIndex];
		if (isCommandWithOutlets(command)) break;
		const curr = `${command}`;
		const next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
		if (currentPathIndex > 0 && curr === void 0) break;
		if (curr && next && typeof next === "object" && next.outlets === void 0) {
			if (!compare(curr, next, path)) return noMatch;
			currentCommandIndex += 2;
		} else {
			if (!compare(curr, {}, path)) return noMatch;
			currentCommandIndex++;
		}
		currentPathIndex++;
	}
	return {
		match: true,
		pathIndex: currentPathIndex,
		commandIndex: currentCommandIndex
	};
}
function createNewSegmentGroup(segmentGroup, startIndex, commands) {
	const paths = segmentGroup.segments.slice(0, startIndex);
	let i = 0;
	while (i < commands.length) {
		const command = commands[i];
		if (isCommandWithOutlets(command)) return new UrlSegmentGroup(paths, createNewSegmentChildren(command.outlets));
		if (i === 0 && isMatrixParams(commands[0])) {
			const p = segmentGroup.segments[startIndex];
			paths.push(new UrlSegment(p.path, stringify(commands[0])));
			i++;
			continue;
		}
		const curr = isCommandWithOutlets(command) ? command.outlets[PRIMARY_OUTLET] : `${command}`;
		const next = i < commands.length - 1 ? commands[i + 1] : null;
		if (curr && next && isMatrixParams(next)) {
			paths.push(new UrlSegment(curr, stringify(next)));
			i += 2;
		} else {
			paths.push(new UrlSegment(curr, {}));
			i++;
		}
	}
	return new UrlSegmentGroup(paths, {});
}
function createNewSegmentChildren(outlets) {
	const children = {};
	Object.entries(outlets).forEach(([outlet, commands]) => {
		if (typeof commands === "string") commands = [commands];
		if (commands !== null) children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
	});
	return children;
}
function stringify(params) {
	const res = {};
	Object.entries(params).forEach(([k, v]) => res[k] = `${v}`);
	return res;
}
function compare(path, params, segment) {
	return path == segment.path && shallowEqual(params, segment.parameters);
}
var OutletContext = class {
	rootInjector;
	outlet = null;
	route = null;
	children;
	attachRef = null;
	get injector() {
		return this.route?.snapshot._environmentInjector ?? this.rootInjector;
	}
	constructor(rootInjector) {
		this.rootInjector = rootInjector;
		this.children = new ChildrenOutletContexts(this.rootInjector);
	}
	resetChildren() {
		this.children = new ChildrenOutletContexts(this.rootInjector);
	}
};
var ChildrenOutletContexts = class ChildrenOutletContexts {
	rootInjector;
	contexts = /* @__PURE__ */ new Map();
	constructor(rootInjector) {
		this.rootInjector = rootInjector;
	}
	onChildOutletCreated(childName, outlet) {
		const context = this.getOrCreateContext(childName);
		context.outlet = outlet;
		this.contexts.set(childName, context);
	}
	onChildOutletDestroyed(childName) {
		const context = this.getContext(childName);
		if (context) {
			context.outlet = null;
			context.attachRef = null;
		}
	}
	onOutletDeactivated() {
		const contexts = this.contexts;
		this.contexts = /* @__PURE__ */ new Map();
		return contexts;
	}
	onOutletReAttached(contexts) {
		this.contexts = contexts;
	}
	getOrCreateContext(childName) {
		let context = this.getContext(childName);
		if (!context) {
			context = new OutletContext(this.rootInjector);
			this.contexts.set(childName, context);
		}
		return context;
	}
	getContext(childName) {
		return this.contexts.get(childName) || null;
	}
	static ɵfac = function ChildrenOutletContexts_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ChildrenOutletContexts)(ɵɵinject(EnvironmentInjector));
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ChildrenOutletContexts,
		factory: ChildrenOutletContexts.ɵfac,
		providedIn: "root"
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChildrenOutletContexts, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [{ type: EnvironmentInjector }], null);
})();
var Tree = class {
	_root;
	constructor(root) {
		this._root = root;
	}
	get root() {
		return this._root.value;
	}
	parent(t) {
		const p = this.pathFromRoot(t);
		return p.length > 1 ? p[p.length - 2] : null;
	}
	children(t) {
		const n = findNode(t, this._root);
		return n ? n.children.map((t) => t.value) : [];
	}
	firstChild(t) {
		const n = findNode(t, this._root);
		return n && n.children.length > 0 ? n.children[0].value : null;
	}
	siblings(t) {
		const p = findPath(t, this._root);
		if (p.length < 2) return [];
		return p[p.length - 2].children.map((c) => c.value).filter((cc) => cc !== t);
	}
	pathFromRoot(t) {
		return findPath(t, this._root).map((s) => s.value);
	}
};
function findNode(value, node) {
	if (value === node.value) return node;
	for (const child of node.children) {
		const node = findNode(value, child);
		if (node) return node;
	}
	return null;
}
function findPath(value, node) {
	if (value === node.value) return [node];
	for (const child of node.children) {
		const path = findPath(value, child);
		if (path.length) {
			path.unshift(node);
			return path;
		}
	}
	return [];
}
var TreeNode = class {
	value;
	children;
	constructor(value, children) {
		this.value = value;
		this.children = children;
	}
	toString() {
		return `TreeNode(${this.value})`;
	}
};
function nodeChildrenAsMap(node) {
	const map = {};
	if (node) node.children.forEach((child) => map[child.value.outlet] = child);
	return map;
}
var RouterState = class extends Tree {
	snapshot;
	constructor(root, snapshot) {
		super(root);
		this.snapshot = snapshot;
		setRouterState(this, root);
	}
	toString() {
		return this.snapshot.toString();
	}
};
function createEmptyState(rootComponent, injector) {
	const snapshot = createEmptyStateSnapshot(rootComponent, injector);
	const emptyUrl = new import_cjs.BehaviorSubject([new UrlSegment("", {})]);
	const emptyParams = new import_cjs.BehaviorSubject({});
	const emptyData = new import_cjs.BehaviorSubject({});
	const activated = new ActivatedRoute(emptyUrl, emptyParams, new import_cjs.BehaviorSubject({}), new import_cjs.BehaviorSubject(""), emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
	activated.snapshot = snapshot.root;
	return new RouterState(new TreeNode(activated, []), snapshot);
}
function createEmptyStateSnapshot(rootComponent, injector) {
	return new RouterStateSnapshot("", new TreeNode(new ActivatedRouteSnapshot([], {}, {}, "", {}, PRIMARY_OUTLET, rootComponent, null, {}, injector), []));
}
var ActivatedRoute = class {
	urlSubject;
	paramsSubject;
	queryParamsSubject;
	fragmentSubject;
	dataSubject;
	outlet;
	component;
	snapshot;
	_futureSnapshot;
	_routerState;
	_paramMap;
	_queryParamMap;
	title;
	url;
	params;
	queryParams;
	fragment;
	data;
	resources;
	_localInjector;
	pending;
	paramsSignal;
	queryParamsSignal;
	paramMapSignal;
	queryParamMapSignal;
	fragmentSignal;
	dataSignal;
	constructor(urlSubject, paramsSubject, queryParamsSubject, fragmentSubject, dataSubject, outlet, component, futureSnapshot) {
		this.urlSubject = urlSubject;
		this.paramsSubject = paramsSubject;
		this.queryParamsSubject = queryParamsSubject;
		this.fragmentSubject = fragmentSubject;
		this.dataSubject = dataSubject;
		this.outlet = outlet;
		this.component = component;
		this._futureSnapshot = futureSnapshot;
		this.title = this.dataSubject?.pipe((0, import_operators.map)((d) => d[RouteTitleKey])) ?? (0, import_cjs.of)(void 0);
		this.url = urlSubject;
		this.params = paramsSubject;
		this.queryParams = queryParamsSubject;
		this.fragment = fragmentSubject;
		this.data = dataSubject;
	}
	get routeConfig() {
		return this._futureSnapshot.routeConfig;
	}
	get root() {
		return this._routerState.root;
	}
	get parent() {
		return this._routerState.parent(this);
	}
	get firstChild() {
		return this._routerState.firstChild(this);
	}
	get children() {
		return this._routerState.children(this);
	}
	get pathFromRoot() {
		return this._routerState.pathFromRoot(this);
	}
	get paramMap() {
		this._paramMap ??= this.params.pipe((0, import_operators.map)((p) => convertToParamMap(p)));
		return this._paramMap;
	}
	get queryParamMap() {
		this._queryParamMap ??= this.queryParams.pipe((0, import_operators.map)((p) => convertToParamMap(p)));
		return this._queryParamMap;
	}
	toString() {
		return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
	}
	_setPending(snapshot) {
		this._futureSnapshot = snapshot;
		this.pending?.set(true);
	}
};
var DEFAULT_PARAMS_INHERITANCE_STRATEGY = "always";
function getInherited(route, parent, paramsInheritanceStrategy) {
	let inherited;
	const { routeConfig } = route;
	if (parent !== null && (paramsInheritanceStrategy === "always" || routeConfig?.path === "" || !parent.component && !parent.routeConfig?.loadComponent)) inherited = {
		params: Object.keys(route.params).length === 0 ? parent.params : Object.freeze({
			...parent.params,
			...route.params
		}),
		data: Object.freeze({
			...parent.data,
			...route.data
		}),
		resolve: {
			...route.data,
			...parent.data,
			...routeConfig?.data,
			...route._resolvedData
		}
	};
	else inherited = {
		params: Object.freeze({ ...route.params }),
		data: Object.freeze({ ...route.data }),
		resolve: {
			...route.data,
			...route._resolvedData ?? {}
		}
	};
	if (routeConfig && hasStaticTitle(routeConfig)) inherited.resolve[RouteTitleKey] = routeConfig.title;
	return inherited;
}
var ActivatedRouteSnapshot = class {
	url;
	params;
	queryParams;
	fragment;
	data;
	outlet;
	component;
	routeConfig;
	_resolve;
	_resolvedData;
	_routerState;
	_paramMap;
	_queryParamMap;
	_environmentInjector;
	resources;
	get title() {
		return this.data?.[RouteTitleKey];
	}
	constructor(url, params, queryParams, fragment, data, outlet, component, routeConfig, resolve, environmentInjector) {
		this.url = url;
		this.params = params;
		this.queryParams = queryParams;
		this.fragment = fragment;
		this.data = data;
		this.outlet = outlet;
		this.component = component;
		this.routeConfig = routeConfig;
		this._resolve = resolve;
		this._environmentInjector = environmentInjector;
	}
	get root() {
		return this._routerState.root;
	}
	get parent() {
		return this._routerState.parent(this);
	}
	get firstChild() {
		return this._routerState.firstChild(this);
	}
	get children() {
		return this._routerState.children(this);
	}
	get pathFromRoot() {
		return this._routerState.pathFromRoot(this);
	}
	get paramMap() {
		this._paramMap ??= convertToParamMap(this.params);
		return this._paramMap;
	}
	get queryParamMap() {
		this._queryParamMap ??= convertToParamMap(this.queryParams);
		return this._queryParamMap;
	}
	toString() {
		return `Route(url:'${this.url.map((segment) => segment.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`;
	}
};
var RouterStateSnapshot = class extends Tree {
	url;
	constructor(url, root) {
		super(root);
		this.url = url;
		setRouterState(this, root);
	}
	toString() {
		return serializeNode(this._root);
	}
};
function setRouterState(state, node) {
	node.value._routerState = state;
	node.children.forEach((c) => setRouterState(state, c));
}
function serializeNode(node) {
	const c = node.children.length > 0 ? ` { ${node.children.map(serializeNode).join(", ")} } ` : "";
	return `${node.value}${c}`;
}
function advanceActivatedRoute(route) {
	if (route.snapshot) {
		const currentSnapshot = route.snapshot;
		const nextSnapshot = route._futureSnapshot;
		route.snapshot = nextSnapshot;
		if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) route.queryParamsSubject.next(nextSnapshot.queryParams);
		if (currentSnapshot.fragment !== nextSnapshot.fragment) route.fragmentSubject.next(nextSnapshot.fragment);
		if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) route.paramsSubject.next(nextSnapshot.params);
		if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) route.urlSubject.next(nextSnapshot.url);
		if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) route.dataSubject.next(nextSnapshot.data);
	} else {
		route.snapshot = route._futureSnapshot;
		route.dataSubject.next(route._futureSnapshot.data);
	}
}
function equalParamsAndUrlSegments(a, b) {
	const equalUrlParams = shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
	const parentsMismatch = !a.parent !== !b.parent;
	return equalUrlParams && !parentsMismatch && (!a.parent || equalParamsAndUrlSegments(a.parent, b.parent));
}
function hasStaticTitle(config) {
	return typeof config.title === "string" || config.title === null;
}
var ROUTER_OUTLET_DATA = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "RouterOutlet data" : "");
var RouterOutlet = class RouterOutlet {
	activated = null;
	get activatedComponentRef() {
		return this.activated;
	}
	_activatedRoute = null;
	name = PRIMARY_OUTLET;
	activateEvents = new EventEmitter();
	deactivateEvents = new EventEmitter();
	attachEvents = new EventEmitter();
	detachEvents = new EventEmitter();
	routerOutletData = input(...ngDevMode ? [void 0, { debugName: "routerOutletData" }] : []);
	parentContexts = inject(ChildrenOutletContexts);
	location = inject(ViewContainerRef);
	changeDetector = inject(ChangeDetectorRef);
	inputBinder = inject(INPUT_BINDER, { optional: true });
	supportsBindingToComponentInputs = true;
	ngOnChanges(changes) {
		if (changes["name"]) {
			const { firstChange, previousValue } = changes["name"];
			if (firstChange) return;
			if (this.isTrackedInParentContexts(previousValue)) {
				this.deactivate();
				this.parentContexts.onChildOutletDestroyed(previousValue);
			}
			this.initializeOutletWithName();
		}
	}
	ngOnDestroy() {
		if (this.isTrackedInParentContexts(this.name)) this.parentContexts.onChildOutletDestroyed(this.name);
		this.inputBinder?.unsubscribeFromRouteData(this);
	}
	isTrackedInParentContexts(outletName) {
		return this.parentContexts.getContext(outletName)?.outlet === this;
	}
	ngOnInit() {
		this.initializeOutletWithName();
	}
	initializeOutletWithName() {
		this.parentContexts.onChildOutletCreated(this.name, this);
		if (this.activated) return;
		const context = this.parentContexts.getContext(this.name);
		if (context?.route) {
			if (context.attachRef) this.attach(context.attachRef, context.route);
			else this.activateWith(context.route, context.injector);
		}
	}
	get isActivated() {
		return !!this.activated;
	}
	get component() {
		if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
		return this.activated.instance;
	}
	get activatedRoute() {
		if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
		return this._activatedRoute;
	}
	get activatedRouteData() {
		if (this._activatedRoute) return this._activatedRoute.snapshot.data;
		return {};
	}
	detach() {
		if (!this.activated) throw new RuntimeError(4012, (typeof ngDevMode === "undefined" || ngDevMode) && "Outlet is not activated");
		this.location.detach();
		const cmp = this.activated;
		this.activated = null;
		this._activatedRoute = null;
		this.detachEvents.emit(cmp.instance);
		return cmp;
	}
	attach(ref, activatedRoute) {
		this.activated = ref;
		this._activatedRoute = activatedRoute;
		this.location.insert(ref.hostView);
		this.inputBinder?.bindActivatedRouteToOutletComponent(this, this.location.injector);
		this.attachEvents.emit(ref.instance);
	}
	deactivate() {
		if (this.activated) {
			const c = this.component;
			this.inputBinder?.unsubscribeFromRouteData(this);
			this.activated.destroy();
			this.activated = null;
			this._activatedRoute = null;
			this.deactivateEvents.emit(c);
		}
	}
	activateWith(activatedRoute, environmentInjector) {
		if (this.isActivated) throw new RuntimeError(4013, (typeof ngDevMode === "undefined" || ngDevMode) && "Cannot activate an already activated outlet");
		this._activatedRoute = activatedRoute;
		const location = this.location;
		const component = activatedRoute.snapshot.component;
		const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
		const injector = new OutletInjector(activatedRoute, childContexts, location.injector, this.routerOutletData);
		this.activated = location.createComponent(component, {
			index: location.length,
			injector,
			environmentInjector
		});
		this.changeDetector.markForCheck();
		this.inputBinder?.bindActivatedRouteToOutletComponent(this, this.location.injector);
		this.activateEvents.emit(this.activated.instance);
	}
	static ɵfac = function RouterOutlet_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || RouterOutlet)();
	};
	static ɵdir = /*@__PURE__*/ ɵɵdefineDirective({
		type: RouterOutlet,
		selectors: [["router-outlet"]],
		inputs: {
			name: "name",
			routerOutletData: [1, "routerOutletData"]
		},
		outputs: {
			activateEvents: "activate",
			deactivateEvents: "deactivate",
			attachEvents: "attach",
			detachEvents: "detach"
		},
		exportAs: ["outlet"],
		features: [ɵɵNgOnChangesFeature]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterOutlet, [{
		type: Directive,
		args: [{
			selector: "router-outlet",
			exportAs: "outlet"
		}]
	}], null, {
		name: [{ type: Input }],
		activateEvents: [{
			type: Output,
			args: ["activate"]
		}],
		deactivateEvents: [{
			type: Output,
			args: ["deactivate"]
		}],
		attachEvents: [{
			type: Output,
			args: ["attach"]
		}],
		detachEvents: [{
			type: Output,
			args: ["detach"]
		}],
		routerOutletData: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "routerOutletData",
				required: false
			}]
		}]
	});
})();
var OutletInjector = class {
	route;
	childContexts;
	parent;
	outletData;
	constructor(route, childContexts, parent, outletData) {
		this.route = route;
		this.childContexts = childContexts;
		this.parent = parent;
		this.outletData = outletData;
	}
	get(token, notFoundValue) {
		if (token === ActivatedRoute) return this.route;
		if (token === ChildrenOutletContexts) return this.childContexts;
		if (token === ROUTER_OUTLET_DATA) return this.outletData;
		return this.parent.get(token, notFoundValue);
	}
};
var INPUT_BINDER = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "Router Input Binder" : "");
var RoutedComponentInputBinder = class RoutedComponentInputBinder {
	options;
	feature;
	outletDataSubscriptions = /* @__PURE__ */ new Map();
	outletSeenKeys = /* @__PURE__ */ new Map();
	outletEffects = /* @__PURE__ */ new Map();
	constructor(options, feature = null) {
		this.options = options;
		this.feature = feature;
		this.options.queryParams ??= true;
	}
	bindActivatedRouteToOutletComponent(outlet, injector) {
		this.unsubscribeFromRouteData(outlet);
		this.subscribeToRouteData(outlet, injector);
	}
	unsubscribeFromRouteData(outlet) {
		this.outletDataSubscriptions.get(outlet)?.unsubscribe();
		this.outletDataSubscriptions.delete(outlet);
		this.outletSeenKeys.delete(outlet);
		this.outletEffects.get(outlet)?.forEach((effect) => effect.destroy());
		this.outletEffects.delete(outlet);
	}
	subscribeToRouteData(outlet, injector) {
		const { activatedRoute } = outlet;
		const effects = [];
		let keysBoundToBlockingResources = [];
		if (this.feature?.createResourceOutletBindingEffects && outlet.activatedComponentRef) {
			const { handledKeys, createdEffects } = this.feature.createResourceOutletBindingEffects(outlet.activatedComponentRef, activatedRoute);
			effects.push(...createdEffects);
			keysBoundToBlockingResources = handledKeys;
		}
		if (effects.length > 0) this.outletEffects.set(outlet, effects);
		const dataSubscription = (0, import_cjs.combineLatest)([
			this.options.queryParams ? activatedRoute.queryParams : (0, import_cjs.of)({}),
			activatedRoute.params,
			activatedRoute.data
		]).pipe((0, import_operators.switchMap)(([queryParams, params, data], index) => {
			data = {
				...queryParams,
				...params,
				...data,
				...activatedRoute.resources
			};
			if (index === 0) return (0, import_cjs.of)(data);
			return Promise.resolve(data);
		})).subscribe((data) => {
			if (!outlet.isActivated || !outlet.activatedComponentRef || outlet.activatedRoute !== activatedRoute || activatedRoute.component === null) {
				this.unsubscribeFromRouteData(outlet);
				return;
			}
			const currentMirror = reflectComponentType(activatedRoute.component);
			if (!currentMirror) {
				this.unsubscribeFromRouteData(outlet);
				return;
			}
			let seenKeys = this.outletSeenKeys.get(outlet);
			if (!seenKeys) {
				seenKeys = /* @__PURE__ */ new Set();
				this.outletSeenKeys.set(outlet, seenKeys);
			}
			for (const key of Object.keys(data)) seenKeys.add(key);
			const behavior = this.options.unmatchedInputBehavior ?? "alwaysUndefined";
			for (const { templateName } of currentMirror.inputs) {
				if (keysBoundToBlockingResources.includes(templateName)) continue;
				const value = data[templateName];
				if (value !== void 0 || behavior === "alwaysUndefined" || seenKeys.has(templateName)) outlet.activatedComponentRef.setInput(templateName, value);
			}
		});
		this.outletDataSubscriptions.set(outlet, dataSubscription);
	}
	static ɵfac = function RoutedComponentInputBinder_Factory(__ngFactoryType__) {
		ɵɵinvalidFactory();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: RoutedComponentInputBinder,
		factory: RoutedComponentInputBinder.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RoutedComponentInputBinder, [{ type: Injectable }], () => [{ type: void 0 }, { type: void 0 }], null);
})();
var ɵEmptyOutletComponent = class ɵEmptyOutletComponent {
	static ɵfac = function ɵEmptyOutletComponent_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ɵEmptyOutletComponent)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: ɵEmptyOutletComponent,
		selectors: [["ng-component"]],
		exportAs: ["emptyRouterOutlet"],
		decls: 1,
		vars: 0,
		template: function _EmptyOutletComponent_Template(rf, ctx) {
			if (rf & 1) ɵɵelement(0, "router-outlet");
		},
		dependencies: [RouterOutlet],
		encapsulation: 2,
		changeDetection: 1
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ɵEmptyOutletComponent, [{
		type: Component,
		args: [{
			template: `<router-outlet />`,
			imports: [RouterOutlet],
			exportAs: "emptyRouterOutlet",
			changeDetection: ChangeDetectionStrategy.Eager
		}]
	}], null, null);
})();
function standardizeConfig(r) {
	const children = r.children && r.children.map(standardizeConfig);
	const c = children ? {
		...r,
		children
	} : { ...r };
	if (!c.component && !c.loadComponent && (children || c.loadChildren) && c.outlet && c.outlet !== "primary") c.component = ɵEmptyOutletComponent;
	return c;
}
var IMPERATIVE_NAVIGATION = "imperative";
var EventType;
(function(EventType) {
	EventType[EventType["NavigationStart"] = 0] = "NavigationStart";
	EventType[EventType["NavigationEnd"] = 1] = "NavigationEnd";
	EventType[EventType["NavigationCancel"] = 2] = "NavigationCancel";
	EventType[EventType["NavigationError"] = 3] = "NavigationError";
	EventType[EventType["RoutesRecognized"] = 4] = "RoutesRecognized";
	EventType[EventType["ResolveStart"] = 5] = "ResolveStart";
	EventType[EventType["ResolveEnd"] = 6] = "ResolveEnd";
	EventType[EventType["GuardsCheckStart"] = 7] = "GuardsCheckStart";
	EventType[EventType["GuardsCheckEnd"] = 8] = "GuardsCheckEnd";
	EventType[EventType["RouteConfigLoadStart"] = 9] = "RouteConfigLoadStart";
	EventType[EventType["RouteConfigLoadEnd"] = 10] = "RouteConfigLoadEnd";
	EventType[EventType["ChildActivationStart"] = 11] = "ChildActivationStart";
	EventType[EventType["ChildActivationEnd"] = 12] = "ChildActivationEnd";
	EventType[EventType["ActivationStart"] = 13] = "ActivationStart";
	EventType[EventType["ActivationEnd"] = 14] = "ActivationEnd";
	EventType[EventType["Scroll"] = 15] = "Scroll";
	EventType[EventType["NavigationSkipped"] = 16] = "NavigationSkipped";
})(EventType || (EventType = {}));
var RouterEvent = class {
	id;
	url;
	constructor(id, url) {
		this.id = id;
		this.url = url;
	}
};
var NavigationStart = class extends RouterEvent {
	type = EventType.NavigationStart;
	navigationTrigger;
	restoredState;
	constructor(id, url, navigationTrigger = "imperative", restoredState = null) {
		super(id, url);
		this.navigationTrigger = navigationTrigger;
		this.restoredState = restoredState;
	}
	toString() {
		return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
	}
};
var NavigationEnd = class extends RouterEvent {
	urlAfterRedirects;
	type = EventType.NavigationEnd;
	constructor(id, url, urlAfterRedirects) {
		super(id, url);
		this.urlAfterRedirects = urlAfterRedirects;
	}
	toString() {
		return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
	}
};
var NavigationCancellationCode;
(function(NavigationCancellationCode) {
	NavigationCancellationCode[NavigationCancellationCode["Redirect"] = 0] = "Redirect";
	NavigationCancellationCode[NavigationCancellationCode["SupersededByNewNavigation"] = 1] = "SupersededByNewNavigation";
	NavigationCancellationCode[NavigationCancellationCode["NoDataFromResolver"] = 2] = "NoDataFromResolver";
	NavigationCancellationCode[NavigationCancellationCode["GuardRejected"] = 3] = "GuardRejected";
	NavigationCancellationCode[NavigationCancellationCode["Aborted"] = 4] = "Aborted";
})(NavigationCancellationCode || (NavigationCancellationCode = {}));
var NavigationSkippedCode;
(function(NavigationSkippedCode) {
	NavigationSkippedCode[NavigationSkippedCode["IgnoredSameUrlNavigation"] = 0] = "IgnoredSameUrlNavigation";
	NavigationSkippedCode[NavigationSkippedCode["IgnoredByUrlHandlingStrategy"] = 1] = "IgnoredByUrlHandlingStrategy";
})(NavigationSkippedCode || (NavigationSkippedCode = {}));
var NavigationCancel = class extends RouterEvent {
	reason;
	code;
	type = EventType.NavigationCancel;
	constructor(id, url, reason, code) {
		super(id, url);
		this.reason = reason;
		this.code = code;
	}
	toString() {
		return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
	}
};
function isRedirectingEvent(event) {
	return event instanceof NavigationCancel && (event.code === NavigationCancellationCode.Redirect || event.code === NavigationCancellationCode.SupersededByNewNavigation);
}
var NavigationSkipped = class extends RouterEvent {
	reason;
	code;
	type = EventType.NavigationSkipped;
	constructor(id, url, reason, code) {
		super(id, url);
		this.reason = reason;
		this.code = code;
	}
};
var NavigationError = class extends RouterEvent {
	error;
	target;
	type = EventType.NavigationError;
	constructor(id, url, error, target) {
		super(id, url);
		this.error = error;
		this.target = target;
	}
	toString() {
		return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
	}
};
var RoutesRecognized = class extends RouterEvent {
	urlAfterRedirects;
	state;
	type = EventType.RoutesRecognized;
	constructor(id, url, urlAfterRedirects, state) {
		super(id, url);
		this.urlAfterRedirects = urlAfterRedirects;
		this.state = state;
	}
	toString() {
		return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
	}
};
var GuardsCheckStart = class extends RouterEvent {
	urlAfterRedirects;
	state;
	type = EventType.GuardsCheckStart;
	constructor(id, url, urlAfterRedirects, state) {
		super(id, url);
		this.urlAfterRedirects = urlAfterRedirects;
		this.state = state;
	}
	toString() {
		return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
	}
};
var GuardsCheckEnd = class extends RouterEvent {
	urlAfterRedirects;
	state;
	shouldActivate;
	type = EventType.GuardsCheckEnd;
	constructor(id, url, urlAfterRedirects, state, shouldActivate) {
		super(id, url);
		this.urlAfterRedirects = urlAfterRedirects;
		this.state = state;
		this.shouldActivate = shouldActivate;
	}
	toString() {
		return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
	}
};
var ResolveStart = class extends RouterEvent {
	urlAfterRedirects;
	state;
	type = EventType.ResolveStart;
	constructor(id, url, urlAfterRedirects, state) {
		super(id, url);
		this.urlAfterRedirects = urlAfterRedirects;
		this.state = state;
	}
	toString() {
		return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
	}
};
var ResolveEnd = class extends RouterEvent {
	urlAfterRedirects;
	state;
	type = EventType.ResolveEnd;
	constructor(id, url, urlAfterRedirects, state) {
		super(id, url);
		this.urlAfterRedirects = urlAfterRedirects;
		this.state = state;
	}
	toString() {
		return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
	}
};
var RouteConfigLoadStart = class {
	route;
	type = EventType.RouteConfigLoadStart;
	constructor(route) {
		this.route = route;
	}
	toString() {
		return `RouteConfigLoadStart(path: ${this.route.path})`;
	}
};
var RouteConfigLoadEnd = class {
	route;
	type = EventType.RouteConfigLoadEnd;
	constructor(route) {
		this.route = route;
	}
	toString() {
		return `RouteConfigLoadEnd(path: ${this.route.path})`;
	}
};
var ChildActivationStart = class {
	snapshot;
	type = EventType.ChildActivationStart;
	constructor(snapshot) {
		this.snapshot = snapshot;
	}
	toString() {
		return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
	}
};
var ChildActivationEnd = class {
	snapshot;
	type = EventType.ChildActivationEnd;
	constructor(snapshot) {
		this.snapshot = snapshot;
	}
	toString() {
		return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
	}
};
var ActivationStart = class {
	snapshot;
	type = EventType.ActivationStart;
	constructor(snapshot) {
		this.snapshot = snapshot;
	}
	toString() {
		return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
	}
};
var ActivationEnd = class {
	snapshot;
	type = EventType.ActivationEnd;
	constructor(snapshot) {
		this.snapshot = snapshot;
	}
	toString() {
		return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`;
	}
};
var BeforeActivateRoutes = class {};
var BeforeRoutesRecognized = class {};
var RedirectRequest = class {
	url;
	navigationBehaviorOptions;
	constructor(url, navigationBehaviorOptions) {
		this.url = url;
		this.navigationBehaviorOptions = navigationBehaviorOptions;
	}
};
function isPublicRouterEvent(e) {
	return !(e instanceof BeforeActivateRoutes) && !(e instanceof RedirectRequest) && !(e instanceof BeforeRoutesRecognized);
}
function createRouterState(routeReuseStrategy, curr, prevState) {
	const newlyCreatedRoutes = /* @__PURE__ */ new Set();
	return {
		newlyCreatedRoutes,
		state: new RouterState(createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : void 0, newlyCreatedRoutes), curr)
	};
}
function createNode(routeReuseStrategy, curr, prevState, newlyCreatedRoutes) {
	if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
		const value = prevState.value;
		value._setPending(curr.value);
		return new TreeNode(value, createOrReuseChildren(routeReuseStrategy, curr, prevState, newlyCreatedRoutes));
	} else {
		if (routeReuseStrategy.shouldAttach(curr.value)) {
			const detachedRouteHandle = routeReuseStrategy.retrieve(curr.value);
			if (detachedRouteHandle !== null) {
				const tree = detachedRouteHandle.route;
				tree.value._setPending(curr.value);
				tree.children = curr.children.map((c) => createNode(routeReuseStrategy, c, void 0, newlyCreatedRoutes));
				return tree;
			}
		}
		const value = createActivatedRoute(curr.value);
		value._setPending(curr.value);
		newlyCreatedRoutes.add(value);
		return new TreeNode(value, curr.children.map((c) => createNode(routeReuseStrategy, c, void 0, newlyCreatedRoutes)));
	}
}
function createOrReuseChildren(routeReuseStrategy, curr, prevState, newlyCreatedRoutes) {
	return curr.children.map((child) => {
		for (const p of prevState.children) if (routeReuseStrategy.shouldReuseRoute(child.value, p.value.snapshot)) return createNode(routeReuseStrategy, child, p, newlyCreatedRoutes);
		return createNode(routeReuseStrategy, child, void 0, newlyCreatedRoutes);
	});
}
function createActivatedRoute(c) {
	return new ActivatedRoute(new import_cjs.BehaviorSubject(c.url), new import_cjs.BehaviorSubject(c.params), new import_cjs.BehaviorSubject(c.queryParams), new import_cjs.BehaviorSubject(c.fragment), new import_cjs.BehaviorSubject(c.data), c.outlet, c.component, c);
}
var RedirectCommand = class RedirectCommand extends Error {
	redirectTo;
	navigationBehaviorOptions;
	constructor(redirectTo, navigationBehaviorOptions) {
		super();
		this.redirectTo = redirectTo;
		this.navigationBehaviorOptions = navigationBehaviorOptions;
		Object.setPrototypeOf(this, RedirectCommand.prototype);
	}
};
var NAVIGATION_CANCELING_ERROR = "ngNavigationCancelingError";
function redirectingNavigationError(urlSerializer, redirect) {
	const { redirectTo, navigationBehaviorOptions } = isUrlTree(redirect) ? {
		redirectTo: redirect,
		navigationBehaviorOptions: void 0
	} : redirect;
	const error = navigationCancelingError(ngDevMode && `Redirecting to "${urlSerializer.serialize(redirectTo)}"`, NavigationCancellationCode.Redirect);
	error.url = redirectTo;
	error.navigationBehaviorOptions = navigationBehaviorOptions;
	return error;
}
function navigationCancelingError(message, code) {
	const error = /* @__PURE__ */ new Error(`NavigationCancelingError: ${message || ""}`);
	error[NAVIGATION_CANCELING_ERROR] = true;
	error.cancellationCode = code;
	return error;
}
function isRedirectingNavigationCancelingError(error) {
	return isNavigationCancelingError(error) && isUrlTree(error.url);
}
function isNavigationCancelingError(error) {
	return !!error && error[NAVIGATION_CANCELING_ERROR];
}
var warnedAboutUnsupportedInputBinding = false;
var ActivateRoutes = class {
	routeReuseStrategy;
	futureState;
	currState;
	forwardEvent;
	inputBindingEnabled;
	constructor(routeReuseStrategy, futureState, currState, forwardEvent, inputBindingEnabled) {
		this.routeReuseStrategy = routeReuseStrategy;
		this.futureState = futureState;
		this.currState = currState;
		this.forwardEvent = forwardEvent;
		this.inputBindingEnabled = inputBindingEnabled;
	}
	activate(parentContexts) {
		const futureRoot = this.futureState._root;
		const currRoot = this.currState ? this.currState._root : null;
		this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
		advanceActivatedRoute(this.futureState.root);
		this.activateChildRoutes(futureRoot, currRoot, parentContexts);
	}
	deactivateChildRoutes(futureNode, currNode, contexts) {
		const children = nodeChildrenAsMap(currNode);
		futureNode.children.forEach((futureChild) => {
			const childOutletName = futureChild.value.outlet;
			this.deactivateRoutes(futureChild, children[childOutletName], contexts);
			delete children[childOutletName];
		});
		Object.values(children).forEach((v) => {
			this.deactivateRouteAndItsChildren(v, contexts);
		});
	}
	deactivateRoutes(futureNode, currNode, parentContext) {
		const future = futureNode.value;
		const curr = currNode ? currNode.value : null;
		if (future === curr) {
			if (future.component) {
				const context = parentContext.getContext(future.outlet);
				if (context) this.deactivateChildRoutes(futureNode, currNode, context.children);
			} else this.deactivateChildRoutes(futureNode, currNode, parentContext);
		} else if (curr) this.deactivateRouteAndItsChildren(currNode, parentContext);
	}
	deactivateRouteAndItsChildren(route, parentContexts) {
		if (route.value.component && this.routeReuseStrategy.shouldDetach(route.value.snapshot)) this.detachAndStoreRouteSubtree(route, parentContexts);
		else this.deactivateRouteAndOutlet(route, parentContexts);
	}
	detachAndStoreRouteSubtree(route, parentContexts) {
		const context = parentContexts.getContext(route.value.outlet);
		const contexts = context && route.value.component ? context.children : parentContexts;
		const children = nodeChildrenAsMap(route);
		for (const treeNode of Object.values(children)) this.deactivateRouteAndItsChildren(treeNode, contexts);
		if (context && context.outlet) {
			const componentRef = context.outlet.detach();
			const contexts = context.children.contexts;
			context.resetChildren();
			this.routeReuseStrategy.store(route.value.snapshot, {
				componentRef,
				route,
				contexts
			});
		}
	}
	deactivateRouteAndOutlet(route, parentContexts) {
		const context = parentContexts.getContext(route.value.outlet);
		const contexts = context && route.value.component ? context.children : parentContexts;
		const children = nodeChildrenAsMap(route);
		for (const treeNode of Object.values(children)) this.deactivateRouteAndItsChildren(treeNode, contexts);
		if (context) {
			if (context.outlet) {
				context.outlet.deactivate();
				context.children.onOutletDeactivated();
			}
			context.attachRef = null;
			context.route = null;
		}
		route.value._localInjector?.destroy();
	}
	activateChildRoutes(futureNode, currNode, contexts) {
		const children = nodeChildrenAsMap(currNode);
		futureNode.children.forEach((c) => {
			this.activateRoutes(c, children[c.value.outlet], contexts);
			this.forwardEvent(new ActivationEnd(c.value.snapshot));
		});
		if (futureNode.children.length) this.forwardEvent(new ChildActivationEnd(futureNode.value.snapshot));
	}
	activateRoutes(futureNode, currNode, parentContexts) {
		const future = futureNode.value;
		const curr = currNode ? currNode.value : null;
		advanceActivatedRoute(future);
		if (future === curr) {
			if (future.component) {
				const context = parentContexts.getOrCreateContext(future.outlet);
				this.activateChildRoutes(futureNode, currNode, context.children);
			} else this.activateChildRoutes(futureNode, currNode, parentContexts);
		} else if (future.component) {
			const context = parentContexts.getOrCreateContext(future.outlet);
			if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
				const stored = this.routeReuseStrategy.retrieve(future.snapshot);
				this.routeReuseStrategy.store(future.snapshot, null);
				context.children.onOutletReAttached(stored.contexts);
				context.attachRef = stored.componentRef;
				context.route = stored.route.value;
				if (context.outlet) context.outlet.attach(stored.componentRef, stored.route.value);
				advanceActivatedRoute(stored.route.value);
				this.activateChildRoutes(futureNode, null, context.children);
			} else {
				context.attachRef = null;
				context.route = future;
				if (context.outlet) context.outlet.activateWith(future, context.injector);
				this.activateChildRoutes(futureNode, null, context.children);
			}
		} else this.activateChildRoutes(futureNode, null, parentContexts);
		if (typeof ngDevMode === "undefined" || ngDevMode) {
			const outlet = parentContexts.getOrCreateContext(future.outlet).outlet;
			if (outlet && this.inputBindingEnabled && !outlet.supportsBindingToComponentInputs && !warnedAboutUnsupportedInputBinding) {
				console.warn("'withComponentInputBinding' feature is enabled but this application is using an outlet that may not support binding to component inputs.");
				warnedAboutUnsupportedInputBinding = true;
			}
		}
	}
};
var CanActivate = class {
	path;
	route;
	constructor(path) {
		this.path = path;
		this.route = this.path[this.path.length - 1];
	}
};
var CanDeactivate = class {
	component;
	route;
	constructor(component, route) {
		this.component = component;
		this.route = route;
	}
};
function getAllRouteGuards(future, curr, parentContexts) {
	const futureRoot = future._root;
	return getChildRouteGuards(futureRoot, curr ? curr._root : null, parentContexts, [futureRoot.value]);
}
function getCanActivateChild(p) {
	const canActivateChild = p.routeConfig ? p.routeConfig.canActivateChild : null;
	if (!canActivateChild || canActivateChild.length === 0) return null;
	return {
		node: p,
		guards: canActivateChild
	};
}
function getTokenOrFunctionIdentity(tokenOrFunction, injector) {
	const NOT_FOUND = Symbol();
	const result = injector.get(tokenOrFunction, NOT_FOUND);
	if (result === NOT_FOUND) {
		if (typeof tokenOrFunction === "function" && !isInjectable(tokenOrFunction)) return tokenOrFunction;
		else return injector.get(tokenOrFunction);
	}
	return result;
}
function getChildRouteGuards(futureNode, currNode, contexts, futurePath, checks = {
	canDeactivateChecks: [],
	canActivateChecks: []
}) {
	const prevChildren = nodeChildrenAsMap(currNode);
	futureNode.children.forEach((c) => {
		getRouteGuards(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]), checks);
		delete prevChildren[c.value.outlet];
	});
	Object.entries(prevChildren).forEach(([k, v]) => deactivateRouteAndItsChildren(v, contexts.getContext(k), contexts, checks));
	return checks;
}
function getRouteGuards(futureNode, currNode, parentContexts, futurePath, checks = {
	canDeactivateChecks: [],
	canActivateChecks: []
}) {
	const future = futureNode.value;
	const curr = currNode ? currNode.value : null;
	const context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
	if (curr && future.routeConfig === curr.routeConfig) {
		const shouldRun = shouldRunGuardsAndResolvers(curr, future, future.routeConfig.runGuardsAndResolvers);
		if (shouldRun) checks.canActivateChecks.push(new CanActivate(futurePath));
		else {
			future.data = curr.data;
			future._resolvedData = curr._resolvedData;
		}
		if (future.component) getChildRouteGuards(futureNode, currNode, context ? context.children : null, futurePath, checks);
		else getChildRouteGuards(futureNode, currNode, parentContexts, futurePath, checks);
		if (shouldRun && context && context.outlet && context.outlet.isActivated) checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, curr));
	} else {
		if (curr) deactivateRouteAndItsChildren(currNode, context, parentContexts, checks);
		checks.canActivateChecks.push(new CanActivate(futurePath));
		if (future.component) getChildRouteGuards(futureNode, null, context ? context.children : null, futurePath, checks);
		else getChildRouteGuards(futureNode, null, parentContexts, futurePath, checks);
	}
	return checks;
}
function shouldRunGuardsAndResolvers(curr, future, mode) {
	if (typeof mode === "function") return runInInjectionContext(future._environmentInjector, () => mode(curr, future));
	switch (mode) {
		case "pathParamsChange": return !equalPath(curr.url, future.url);
		case "pathParamsOrQueryParamsChange": return !equalPath(curr.url, future.url) || !shallowEqual(curr.queryParams, future.queryParams);
		case "always": return true;
		case "paramsOrQueryParamsChange": return !equalParamsAndUrlSegments(curr, future) || !shallowEqual(curr.queryParams, future.queryParams);
		default: return !equalParamsAndUrlSegments(curr, future);
	}
}
function deactivateRouteAndItsChildren(route, context, parentContexts, checks) {
	const children = nodeChildrenAsMap(route);
	const r = route.value;
	Object.entries(children).forEach(([childName, node]) => {
		if (!r.component) deactivateRouteAndItsChildren(node, parentContexts ? parentContexts.getContext(childName) : null, parentContexts, checks);
		else if (context) deactivateRouteAndItsChildren(node, context.children.getContext(childName), context.children, checks);
		else deactivateRouteAndItsChildren(node, null, null, checks);
	});
	if (!r.component) checks.canDeactivateChecks.push(new CanDeactivate(null, r));
	else if (context && context.outlet && context.outlet.isActivated) checks.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
	else checks.canDeactivateChecks.push(new CanDeactivate(null, r));
}
function isFunction(v) {
	return typeof v === "function";
}
function isBoolean(v) {
	return typeof v === "boolean";
}
function isCanLoad(guard) {
	return guard && isFunction(guard.canLoad);
}
function isCanActivate(guard) {
	return guard && isFunction(guard.canActivate);
}
function isCanActivateChild(guard) {
	return guard && isFunction(guard.canActivateChild);
}
function isCanDeactivate(guard) {
	return guard && isFunction(guard.canDeactivate);
}
function isCanMatch(guard) {
	return guard && isFunction(guard.canMatch);
}
function isEmptyError(e) {
	return e instanceof import_cjs.EmptyError || e?.name === "EmptyError";
}
var INITIAL_VALUE = /* @__PURE__ */ Symbol("INITIAL_VALUE");
function prioritizedGuardValue() {
	return (0, import_operators.switchMap)((obs) => {
		return (0, import_cjs.combineLatest)(obs.map((o) => o.pipe((0, import_operators.take)(1), (0, import_operators.catchError)((e) => {
			if (e instanceof RedirectCommand) return (0, import_cjs.of)(e);
			throw e;
		}), (0, import_operators.startWith)(INITIAL_VALUE)))).pipe((0, import_operators.map)((results) => {
			for (const result of results) if (result === true) continue;
			else if (result === INITIAL_VALUE) return INITIAL_VALUE;
			else if (result === false || isRedirect(result)) return result;
			return true;
		}), (0, import_operators.filter)((item) => item !== INITIAL_VALUE), (0, import_operators.take)(1));
	});
}
function isRedirect(val) {
	return isUrlTree(val) || val instanceof RedirectCommand;
}
function abortSignalToObservable(signal) {
	return new import_cjs.Observable((subscriber) => {
		if (signal.aborted) {
			subscriber.next();
			subscriber.complete();
			return;
		}
		const handler = () => {
			subscriber.next();
			subscriber.complete();
		};
		signal.addEventListener("abort", handler);
		return () => signal.removeEventListener("abort", handler);
	});
}
function takeUntilAbort(signal) {
	return (0, import_operators.takeUntil)(abortSignalToObservable(signal));
}
function checkGuards(forwardEvent) {
	return (0, import_operators.mergeMap)((t) => {
		const { targetSnapshot, currentSnapshot, guards: { canActivateChecks, canDeactivateChecks } } = t;
		if (canDeactivateChecks.length === 0 && canActivateChecks.length === 0) return (0, import_cjs.of)({
			...t,
			guardsResult: true
		});
		return runCanDeactivateChecks(canDeactivateChecks, targetSnapshot, currentSnapshot).pipe((0, import_operators.mergeMap)((canDeactivate) => {
			return canDeactivate && isBoolean(canDeactivate) ? runCanActivateChecks(targetSnapshot, canActivateChecks, forwardEvent) : (0, import_cjs.of)(canDeactivate);
		}), (0, import_operators.map)((guardsResult) => ({
			...t,
			guardsResult
		})));
	});
}
function runCanDeactivateChecks(checks, futureRSS, currRSS) {
	return (0, import_cjs.from)(checks).pipe((0, import_operators.mergeMap)((check) => runCanDeactivate(check.component, check.route, currRSS, futureRSS)), (0, import_operators.first)((result) => {
		return result !== true;
	}, true));
}
function runCanActivateChecks(futureSnapshot, checks, forwardEvent) {
	return (0, import_cjs.from)(checks).pipe((0, import_operators.concatMap)((check) => {
		return (0, import_cjs.concat)(fireChildActivationStart(check.route.parent, forwardEvent), fireActivationStart(check.route, forwardEvent), runCanActivateChild(futureSnapshot, check.path), runCanActivate(futureSnapshot, check.route));
	}), (0, import_operators.first)((result) => {
		return result !== true;
	}, true));
}
function fireActivationStart(snapshot, forwardEvent) {
	if (snapshot !== null && forwardEvent) forwardEvent(new ActivationStart(snapshot));
	return (0, import_cjs.of)(true);
}
function fireChildActivationStart(snapshot, forwardEvent) {
	if (snapshot !== null && forwardEvent) forwardEvent(new ChildActivationStart(snapshot));
	return (0, import_cjs.of)(true);
}
function runCanActivate(futureRSS, futureARS) {
	const canActivate = futureARS.routeConfig ? futureARS.routeConfig.canActivate : null;
	if (!canActivate || canActivate.length === 0) return (0, import_cjs.of)(true);
	const canActivateObservables = canActivate.map((canActivate) => {
		return (0, import_cjs.defer)(() => {
			const closestInjector = futureARS._environmentInjector;
			const guard = getTokenOrFunctionIdentity(canActivate, closestInjector);
			return wrapIntoObservable(isCanActivate(guard) ? guard.canActivate(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS))).pipe((0, import_operators.first)());
		});
	});
	return (0, import_cjs.of)(canActivateObservables).pipe(prioritizedGuardValue());
}
function runCanActivateChild(futureRSS, path) {
	const futureARS = path[path.length - 1];
	const canActivateChildGuardsMapped = path.slice(0, path.length - 1).reverse().map((p) => getCanActivateChild(p)).filter((_) => _ !== null).map((d) => {
		return (0, import_cjs.defer)(() => {
			const guardsMapped = d.guards.map((canActivateChild) => {
				const closestInjector = d.node._environmentInjector;
				const guard = getTokenOrFunctionIdentity(canActivateChild, closestInjector);
				return wrapIntoObservable(isCanActivateChild(guard) ? guard.canActivateChild(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => guard(futureARS, futureRSS))).pipe((0, import_operators.first)());
			});
			return (0, import_cjs.of)(guardsMapped).pipe(prioritizedGuardValue());
		});
	});
	return (0, import_cjs.of)(canActivateChildGuardsMapped).pipe(prioritizedGuardValue());
}
function runCanDeactivate(component, currARS, currRSS, futureRSS) {
	const canDeactivate = currARS && currARS.routeConfig ? currARS.routeConfig.canDeactivate : null;
	if (!canDeactivate || canDeactivate.length === 0) return (0, import_cjs.of)(true);
	const canDeactivateObservables = canDeactivate.map((c) => {
		const closestInjector = currARS._environmentInjector;
		const guard = getTokenOrFunctionIdentity(c, closestInjector);
		return callGuard(() => isCanDeactivate(guard) ? guard.canDeactivate(component, currARS, currRSS, futureRSS) : runInInjectionContext(closestInjector, () => guard(component, currARS, currRSS, futureRSS))).pipe((0, import_operators.first)());
	});
	return (0, import_cjs.of)(canDeactivateObservables).pipe(prioritizedGuardValue());
}
function runCanLoadGuards(injector, route, segments, urlSerializer, abortSignal) {
	const canLoad = route.canLoad;
	if (canLoad === void 0 || canLoad.length === 0) return (0, import_cjs.of)(true);
	const canLoadObservables = canLoad.map((injectionToken) => {
		const guard = getTokenOrFunctionIdentity(injectionToken, injector);
		const obs$ = callGuard(() => isCanLoad(guard) ? guard.canLoad(route, segments) : runInInjectionContext(injector, () => guard(route, segments)));
		return abortSignal ? obs$.pipe(takeUntilAbort(abortSignal)) : obs$;
	});
	return (0, import_cjs.of)(canLoadObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
function callGuard(guardFn) {
	try {
		return wrapIntoObservable(guardFn());
	} catch (e) {
		return new import_cjs.Observable((subscriber) => subscriber.error(e));
	}
}
function redirectIfUrlTree(urlSerializer) {
	return (0, import_cjs.pipe)((0, import_operators.tap)((result) => {
		if (typeof result === "boolean") return;
		throw redirectingNavigationError(urlSerializer, result);
	}), (0, import_operators.map)((result) => result === true));
}
function runCanMatchGuards(injector, route, segments, urlSerializer, currentSnapshot, abortSignal) {
	const canMatch = route.canMatch;
	if (!canMatch || canMatch.length === 0) return (0, import_cjs.of)(true);
	const canMatchObservables = canMatch.map((injectionToken) => {
		const guard = getTokenOrFunctionIdentity(injectionToken, injector);
		return callGuard(() => isCanMatch(guard) ? guard.canMatch(route, segments, currentSnapshot) : runInInjectionContext(injector, () => guard(route, segments, currentSnapshot))).pipe(takeUntilAbort(abortSignal));
	});
	return (0, import_cjs.of)(canMatchObservables).pipe(prioritizedGuardValue(), redirectIfUrlTree(urlSerializer));
}
var NoMatch = class NoMatch extends Error {
	name = "NoMatch";
	segmentGroup;
	constructor(segmentGroup) {
		super();
		this.segmentGroup = segmentGroup || null;
		Object.setPrototypeOf(this, NoMatch.prototype);
	}
};
var AbsoluteRedirect = class AbsoluteRedirect extends Error {
	urlTree;
	name = "AbsoluteRedirect";
	constructor(urlTree) {
		super();
		this.urlTree = urlTree;
		Object.setPrototypeOf(this, AbsoluteRedirect.prototype);
	}
};
function namedOutletsRedirect(redirectTo) {
	throw new RuntimeError(4e3, (typeof ngDevMode === "undefined" || ngDevMode) && `Only absolute redirects can have named outlets. redirectTo: '${redirectTo}'`);
}
function canLoadFails(route) {
	throw navigationCancelingError((typeof ngDevMode === "undefined" || ngDevMode) && `Cannot load children because the guard of the route "path: '${route.path}'" returned false`, NavigationCancellationCode.GuardRejected);
}
var ApplyRedirects = class {
	urlSerializer;
	urlTree;
	constructor(urlSerializer, urlTree) {
		this.urlSerializer = urlSerializer;
		this.urlTree = urlTree;
	}
	async lineralizeSegments(route, urlTree) {
		let res = [];
		let c = urlTree.root;
		while (true) {
			res = res.concat(c.segments);
			if (c.numberOfChildren === 0) return res;
			if (c.numberOfChildren > 1 || !c.children["primary"]) throw namedOutletsRedirect(`${route.redirectTo}`);
			c = c.children[PRIMARY_OUTLET];
		}
	}
	async applyRedirectCommands(segments, redirectTo, posParams, currentSnapshot, injector) {
		const redirect = await getRedirectResult(redirectTo, currentSnapshot, injector);
		if (redirect instanceof UrlTree) throw new AbsoluteRedirect(redirect);
		const newTree = this.applyRedirectCreateUrlTree(redirect, this.urlSerializer.parse(redirect), segments, posParams);
		if (redirect[0] === "/") throw new AbsoluteRedirect(newTree);
		return newTree;
	}
	applyRedirectCreateUrlTree(redirectTo, urlTree, segments, posParams) {
		return new UrlTree(this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams), this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
	}
	createQueryParams(redirectToParams, actualParams) {
		const res = {};
		Object.entries(redirectToParams).forEach(([k, v]) => {
			if (typeof v === "string" && v[0] === ":") {
				const sourceName = v.substring(1);
				res[k] = actualParams[sourceName];
			} else res[k] = v;
		});
		return res;
	}
	createSegmentGroup(redirectTo, group, segments, posParams) {
		const updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
		let children = Object.create(null);
		Object.entries(group.children).forEach(([name, child]) => {
			children[name] = this.createSegmentGroup(redirectTo, child, segments, posParams);
		});
		return new UrlSegmentGroup(updatedSegments, children);
	}
	createSegments(redirectTo, redirectToSegments, actualSegments, posParams) {
		return redirectToSegments.map((s) => s.path[0] === ":" ? this.findPosParam(redirectTo, s, posParams) : this.findOrReturn(s, actualSegments));
	}
	findPosParam(redirectTo, redirectToUrlSegment, posParams) {
		const pos = posParams[redirectToUrlSegment.path.substring(1)];
		if (!pos) throw new RuntimeError(4001, (typeof ngDevMode === "undefined" || ngDevMode) && `Cannot redirect to '${redirectTo}'. Cannot find '${redirectToUrlSegment.path}'.`);
		return pos;
	}
	findOrReturn(redirectToUrlSegment, actualSegments) {
		let idx = 0;
		for (const s of actualSegments) {
			if (s.path === redirectToUrlSegment.path) {
				actualSegments.splice(idx);
				return s;
			}
			idx++;
		}
		return redirectToUrlSegment;
	}
};
function getRedirectResult(redirectTo, currentSnapshot, injector) {
	if (typeof redirectTo === "string") return Promise.resolve(redirectTo);
	const redirectToFn = redirectTo;
	return firstValueFrom(wrapIntoObservable(runInInjectionContext(injector, () => redirectToFn(currentSnapshot))));
}
function getOrCreateRouteInjectorIfNeeded(route, currentInjector) {
	if (route.providers && !route._injector) route._injector = createEnvironmentInjector(route.providers, currentInjector, `Route: ${route.path}`);
	return route._injector ?? currentInjector;
}
function validateConfig(config, parentPath = "", requireStandaloneComponents = false) {
	for (let i = 0; i < config.length; i++) {
		const route = config[i];
		validateNode(route, getFullPath(parentPath, route), requireStandaloneComponents);
	}
}
function assertStandalone(fullPath, component) {
	if (component && isNgModule$1(component)) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. You are using 'loadComponent' with a module, but it must be used with standalone components. Use 'loadChildren' instead.`);
	else if (component && !isStandalone(component)) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. The component must be standalone.`);
}
function validateNode(route, fullPath, requireStandaloneComponents) {
	if (typeof ngDevMode === "undefined" || ngDevMode) {
		if (!route) throw new RuntimeError(4014, `
      Invalid configuration of route '${fullPath}': Encountered undefined route.
      The reason might be an extra comma.

      Example:
      const routes: Routes = [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard',  component: DashboardComponent },, << two commas
        { path: 'detail/:id', component: HeroDetailComponent }
      ];
    `);
		if (Array.isArray(route)) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': Array cannot be specified`);
		if (!route.redirectTo && !route.component && !route.loadComponent && !route.children && !route.loadChildren && route.outlet && route.outlet !== "primary") throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': a componentless route without children or loadChildren cannot have a named outlet set`);
		if (route.redirectTo && route.children) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and children cannot be used together`);
		if (route.redirectTo && route.loadChildren) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and loadChildren cannot be used together`);
		if (route.children && route.loadChildren) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': children and loadChildren cannot be used together`);
		if (route.component && route.loadComponent) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': component and loadComponent cannot be used together`);
		if (route.redirectTo) {
			if (route.component || route.loadComponent) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and component/loadComponent cannot be used together`);
			if (route.canMatch || route.canActivate) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': redirectTo and ${route.canMatch ? "canMatch" : "canActivate"} cannot be used together.Redirects happen before guards are executed.`);
		}
		if (route.path && route.matcher) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path and matcher cannot be used together`);
		if (route.redirectTo === void 0 && !route.component && !route.loadComponent && !route.children && !route.loadChildren) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}'. One of the following must be provided: component, loadComponent, redirectTo, children or loadChildren`);
		if (route.path === void 0 && route.matcher === void 0) throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': routes must have either a path or a matcher specified`);
		if (typeof route.path === "string" && route.path.charAt(0) === "/") throw new RuntimeError(4014, `Invalid configuration of route '${fullPath}': path cannot start with a slash`);
		if (route.path === "" && route.redirectTo !== void 0 && route.pathMatch === void 0) throw new RuntimeError(4014, `Invalid configuration of route '{path: "${fullPath}", redirectTo: "${route.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`);
		if (requireStandaloneComponents) assertStandalone(fullPath, route.component);
	}
	if (route.children) validateConfig(route.children, fullPath, requireStandaloneComponents);
}
function getFullPath(parentPath, currentRoute) {
	if (!currentRoute) return parentPath;
	if (!parentPath && !currentRoute.path) return "";
	else if (parentPath && !currentRoute.path) return `${parentPath}/`;
	else if (!parentPath && currentRoute.path) return currentRoute.path;
	else return `${parentPath}/${currentRoute.path}`;
}
function getOutlet(route) {
	return route.outlet || "primary";
}
function sortByMatchingOutlets(routes, outletName) {
	const sortedConfig = routes.filter((r) => getOutlet(r) === outletName);
	sortedConfig.push(...routes.filter((r) => getOutlet(r) !== outletName));
	return sortedConfig;
}
var noMatch = {
	matched: false,
	consumedSegments: [],
	remainingSegments: [],
	parameters: {},
	positionalParamSegments: {}
};
function createPreMatchRouteSnapshot(snapshot) {
	return {
		routeConfig: snapshot.routeConfig,
		url: snapshot.url,
		params: snapshot.params,
		queryParams: snapshot.queryParams,
		fragment: snapshot.fragment,
		data: snapshot.data,
		outlet: snapshot.outlet,
		title: snapshot.title,
		paramMap: snapshot.paramMap,
		queryParamMap: snapshot.queryParamMap
	};
}
function matchWithChecks(segmentGroup, route, segments, injector, urlSerializer, createSnapshot, abortSignal) {
	const result = match(segmentGroup, route, segments);
	if (!result.matched) return (0, import_cjs.of)(result);
	const currentSnapshot = createPreMatchRouteSnapshot(createSnapshot(result));
	injector = getOrCreateRouteInjectorIfNeeded(route, injector);
	return runCanMatchGuards(injector, route, segments, urlSerializer, currentSnapshot, abortSignal).pipe((0, import_operators.map)((v) => v === true ? result : { ...noMatch }));
}
function match(segmentGroup, route, segments) {
	if (route.path === "") {
		if (route.pathMatch === "full" && (segmentGroup.hasChildren() || segments.length > 0)) return { ...noMatch };
		return {
			matched: true,
			consumedSegments: [],
			remainingSegments: segments,
			parameters: {},
			positionalParamSegments: {}
		};
	}
	const res = (route.matcher || defaultUrlMatcher)(segments, segmentGroup, route);
	if (!res) return { ...noMatch };
	const posParams = {};
	Object.entries(res.posParams ?? {}).forEach(([k, v]) => {
		posParams[k] = v.path;
	});
	const parameters = res.consumed.length > 0 ? {
		...posParams,
		...res.consumed[res.consumed.length - 1].parameters
	} : posParams;
	return {
		matched: true,
		consumedSegments: res.consumed,
		remainingSegments: segments.slice(res.consumed.length),
		parameters,
		positionalParamSegments: res.posParams ?? {}
	};
}
function split(segmentGroup, consumedSegments, slicedSegments, config) {
	if (slicedSegments.length > 0 && containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) return {
		segmentGroup: new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(config, new UrlSegmentGroup(slicedSegments, segmentGroup.children))),
		slicedSegments: []
	};
	if (slicedSegments.length === 0 && containsEmptyPathMatches(segmentGroup, slicedSegments, config)) return {
		segmentGroup: new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children)),
		slicedSegments
	};
	return {
		segmentGroup: new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children),
		slicedSegments
	};
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
	const res = {};
	for (const r of routes) if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
		const s = new UrlSegmentGroup([], {});
		res[getOutlet(r)] = s;
	}
	return {
		...children,
		...res
	};
}
function createChildrenForEmptyPaths(routes, primarySegment) {
	const res = {};
	res[PRIMARY_OUTLET] = primarySegment;
	for (const r of routes) if (r.path === "" && getOutlet(r) !== "primary") {
		const s = new UrlSegmentGroup([], {});
		res[getOutlet(r)] = s;
	}
	return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
	return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet(r) !== "primary");
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
	return routes.some((r) => emptyPathMatch(segmentGroup, slicedSegments, r));
}
function emptyPathMatch(segmentGroup, slicedSegments, r) {
	if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === "full") return false;
	return r.path === "";
}
function noLeftoversInUrl(segmentGroup, segments, outlet) {
	return segments.length === 0 && !segmentGroup.hasChildren();
}
var NoLeftoversInUrl = class {};
async function recognize$1(injector, configLoader, rootComponentType, config, urlTree, urlSerializer, paramsInheritanceStrategy, abortSignal) {
	return new Recognizer(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer, abortSignal).recognize();
}
var MAX_ALLOWED_REDIRECTS = 31;
var Recognizer = class {
	injector;
	configLoader;
	rootComponentType;
	config;
	urlTree;
	paramsInheritanceStrategy;
	urlSerializer;
	abortSignal;
	applyRedirects;
	absoluteRedirectCount = 0;
	allowRedirects = true;
	queryParams;
	constructor(injector, configLoader, rootComponentType, config, urlTree, paramsInheritanceStrategy, urlSerializer, abortSignal) {
		this.injector = injector;
		this.configLoader = configLoader;
		this.rootComponentType = rootComponentType;
		this.config = config;
		this.urlTree = urlTree;
		this.paramsInheritanceStrategy = paramsInheritanceStrategy;
		this.urlSerializer = urlSerializer;
		this.abortSignal = abortSignal;
		this.applyRedirects = new ApplyRedirects(this.urlSerializer, this.urlTree);
		this.queryParams = Object.freeze({ ...this.urlTree.queryParams });
	}
	noMatchError(e) {
		return new RuntimeError(4002, typeof ngDevMode === "undefined" || ngDevMode ? `Cannot match any routes. URL Segment: '${e.segmentGroup}'` : `'${e.segmentGroup}'`);
	}
	async recognize() {
		const rootSegmentGroup = split(this.urlTree.root, [], [], this.config).segmentGroup;
		const { children, rootSnapshot } = await this.match(rootSegmentGroup);
		const routeState = new RouterStateSnapshot("", new TreeNode(rootSnapshot, children));
		const tree = createUrlTreeFromSnapshot(rootSnapshot, [], this.urlTree.queryParams, this.urlTree.fragment);
		tree.queryParams = this.urlTree.queryParams;
		routeState.url = this.urlSerializer.serialize(tree);
		return {
			state: routeState,
			tree
		};
	}
	async match(rootSegmentGroup) {
		const rootSnapshot = new ActivatedRouteSnapshot([], Object.freeze({}), this.queryParams, this.urlTree.fragment, Object.freeze({}), PRIMARY_OUTLET, this.rootComponentType, null, {}, this.injector);
		try {
			return {
				children: await this.processSegmentGroup(this.injector, this.config, rootSegmentGroup, PRIMARY_OUTLET, rootSnapshot),
				rootSnapshot
			};
		} catch (e) {
			if (e instanceof AbsoluteRedirect) {
				this.absoluteRedirectCount++;
				if (this.absoluteRedirectCount > MAX_ALLOWED_REDIRECTS) {
					if (ngDevMode) throw new RuntimeError(4016, `Detected possible infinite redirect when redirecting from '${this.urlTree}' to '${e.urlTree}'.`);
					this.allowRedirects = false;
				}
				this.urlTree = e.urlTree;
				this.queryParams = Object.freeze({ ...this.urlTree.queryParams });
				return this.match(e.urlTree.root);
			}
			if (e instanceof NoMatch) throw this.noMatchError(e);
			throw e;
		}
	}
	async processSegmentGroup(injector, config, segmentGroup, outlet, parentRoute) {
		if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) return this.processChildren(injector, config, segmentGroup, parentRoute);
		const child = await this.processSegment(injector, config, segmentGroup, segmentGroup.segments, outlet, true, parentRoute);
		return child instanceof TreeNode ? [child] : [];
	}
	async processChildren(injector, config, segmentGroup, parentRoute) {
		const childOutlets = [];
		for (const child of Object.keys(segmentGroup.children)) if (child === "primary") childOutlets.unshift(child);
		else childOutlets.push(child);
		let children = [];
		for (const childOutlet of childOutlets) {
			const child = segmentGroup.children[childOutlet];
			const sortedConfig = sortByMatchingOutlets(config, childOutlet);
			const outletChild = await this.processSegment(injector, sortedConfig, child, child.segments, childOutlet, true, parentRoute);
			if (outletChild instanceof TreeNode) children.push(outletChild);
		}
		const mergedChildren = mergeEmptyPathMatches(children);
		sortActivatedRouteSnapshots(mergedChildren);
		return mergedChildren;
	}
	async processSegment(injector, routes, segmentGroup, segments, outlet, allowRedirects, parentRoute) {
		for (const r of routes) try {
			return await this.processSegmentAgainstRoute(r._injector ?? injector, routes, r, segmentGroup, segments, outlet, allowRedirects, parentRoute);
		} catch (e) {
			if (e instanceof NoMatch || isEmptyError(e)) continue;
			throw e;
		}
		if (noLeftoversInUrl(segmentGroup, segments)) return new NoLeftoversInUrl();
		throw new NoMatch(segmentGroup);
	}
	async processSegmentAgainstRoute(injector, routes, route, rawSegment, segments, outlet, allowRedirects, parentRoute) {
		if (getOutlet(route) !== outlet && (outlet === "primary" || !emptyPathMatch(rawSegment, segments, route) || !route.children?.length && !route.loadChildren || segments.length === 0 && !rawSegment.hasChildren())) throw new NoMatch(rawSegment);
		if (route.redirectTo === void 0) return this.matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute);
		if (this.allowRedirects && allowRedirects) return this.expandSegmentAgainstRouteUsingRedirect(injector, rawSegment, routes, route, segments, outlet, parentRoute);
		throw new NoMatch(rawSegment);
	}
	async expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet, parentRoute) {
		const { matched, parameters, consumedSegments, positionalParamSegments, remainingSegments } = match(segmentGroup, route, segments);
		if (!matched) throw new NoMatch(segmentGroup);
		const currentSnapshot = this.createSnapshot(injector, route, segments, parameters, parentRoute);
		if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
		const newTree = await this.applyRedirects.applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments, createPreMatchRouteSnapshot(currentSnapshot), injector);
		const newSegments = await this.applyRedirects.lineralizeSegments(route, newTree);
		return this.processSegment(injector, routes, segmentGroup, newSegments.concat(remainingSegments), outlet, false, parentRoute);
	}
	createSnapshot(injector, route, segments, parameters, parentRoute) {
		const snapshot = new ActivatedRouteSnapshot(segments, parameters, this.queryParams, this.urlTree.fragment, getData(route), getOutlet(route), route.component ?? route._loadedComponent ?? null, route, getResolve(route), injector);
		const inherited = getInherited(snapshot, parentRoute, this.paramsInheritanceStrategy);
		snapshot.params = inherited.params;
		snapshot.data = inherited.data;
		return snapshot;
	}
	async matchSegmentAgainstRoute(injector, rawSegment, route, segments, outlet, parentRoute) {
		if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
		const createSnapshot = (result) => this.createSnapshot(injector, route, result.consumedSegments, result.parameters, parentRoute);
		const result = await firstValueFrom(matchWithChecks(rawSegment, route, segments, injector, this.urlSerializer, createSnapshot, this.abortSignal));
		if (route.path === "**") rawSegment.children = {};
		if (!result?.matched) throw new NoMatch(rawSegment);
		injector = route._injector ?? injector;
		const { routes: childConfig } = await this.getChildConfig(injector, route, segments);
		const childInjector = route._loadedInjector ?? injector;
		const { parameters, consumedSegments, remainingSegments } = result;
		const snapshot = this.createSnapshot(injector, route, consumedSegments, parameters, parentRoute);
		const matchedOnOutlet = getOutlet(route) === outlet;
		const { segmentGroup, slicedSegments } = matchedOnOutlet ? split(rawSegment, consumedSegments, remainingSegments, childConfig) : {
			segmentGroup: rawSegment,
			slicedSegments: remainingSegments
		};
		if (matchedOnOutlet && slicedSegments.length === 0 && segmentGroup.hasChildren()) return new TreeNode(snapshot, await this.processChildren(childInjector, childConfig, segmentGroup, snapshot));
		if (matchedOnOutlet && childConfig.length === 0 && slicedSegments.length === 0) return new TreeNode(snapshot, []);
		const child = await this.processSegment(childInjector, childConfig, segmentGroup, slicedSegments, matchedOnOutlet ? PRIMARY_OUTLET : outlet, true, snapshot);
		if (!matchedOnOutlet && !(child instanceof TreeNode)) throw new NoMatch(rawSegment);
		return new TreeNode(snapshot, child instanceof TreeNode ? [child] : []);
	}
	async getChildConfig(injector, route, segments) {
		if (route.children) return {
			routes: route.children,
			injector
		};
		if (route.loadChildren) {
			if (route._loadedRoutes !== void 0) {
				const ngModuleFactory = route._loadedNgModuleFactory;
				if (ngModuleFactory && !route._loadedInjector) route._loadedInjector = ngModuleFactory.create(injector).injector;
				return {
					routes: route._loadedRoutes,
					injector: route._loadedInjector
				};
			}
			if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
			if (await firstValueFrom(runCanLoadGuards(injector, route, segments, this.urlSerializer, this.abortSignal))) {
				const cfg = await this.configLoader.loadChildren(injector, route);
				route._loadedRoutes = cfg.routes;
				route._loadedInjector = cfg.injector;
				route._loadedNgModuleFactory = cfg.factory;
				return cfg;
			}
			throw canLoadFails(route);
		}
		return {
			routes: [],
			injector
		};
	}
};
function sortActivatedRouteSnapshots(nodes) {
	nodes.sort((a, b) => {
		if (a.value.outlet === "primary") return -1;
		if (b.value.outlet === "primary") return 1;
		return a.value.outlet.localeCompare(b.value.outlet);
	});
}
function hasEmptyPathConfig(node) {
	const config = node.value.routeConfig;
	return config && config.path === "";
}
function mergeEmptyPathMatches(nodes) {
	const result = [];
	const mergedNodes = /* @__PURE__ */ new Set();
	for (const node of nodes) {
		if (!hasEmptyPathConfig(node)) {
			result.push(node);
			continue;
		}
		const duplicateEmptyPathNode = result.find((resultNode) => node.value.routeConfig === resultNode.value.routeConfig);
		if (duplicateEmptyPathNode !== void 0) {
			duplicateEmptyPathNode.children.push(...node.children);
			mergedNodes.add(duplicateEmptyPathNode);
		} else result.push(node);
	}
	for (const mergedNode of mergedNodes) {
		const mergedChildren = mergeEmptyPathMatches(mergedNode.children);
		result.push(new TreeNode(mergedNode.value, mergedChildren));
	}
	const merged = result.filter((n) => !mergedNodes.has(n));
	checkOutletNameUniqueness(merged);
	return merged;
}
function checkOutletNameUniqueness(nodes) {
	const names = Object.create(null);
	nodes.forEach((n) => {
		const routeWithSameOutletName = names[n.value.outlet];
		if (routeWithSameOutletName) {
			const p = routeWithSameOutletName.url.map((s) => s.toString()).join("/");
			const c = n.value.url.map((s) => s.toString()).join("/");
			throw new RuntimeError(4006, (typeof ngDevMode === "undefined" || ngDevMode) && `Two segments cannot have the same outlet name: '${p}' and '${c}'.`);
		}
		names[n.value.outlet] = n.value;
	});
}
function getData(route) {
	return route.data || {};
}
function getResolve(route) {
	return route.resolve || {};
}
function recognize(injector, configLoader, rootComponentType, config, serializer, paramsInheritanceStrategy, abortSignal) {
	return (0, import_operators.mergeMap)(async (t) => {
		const { state: targetSnapshot, tree: urlAfterRedirects } = await recognize$1(injector, configLoader, rootComponentType, config, t.extractedUrl, serializer, paramsInheritanceStrategy, abortSignal);
		return {
			...t,
			targetSnapshot,
			urlAfterRedirects
		};
	});
}
function resolveData(paramsInheritanceStrategy) {
	return (0, import_operators.mergeMap)((t) => {
		const { targetSnapshot, guards: { canActivateChecks } } = t;
		if (!canActivateChecks.length) return (0, import_cjs.of)(t);
		const routesWithResolversToRun = new Set(canActivateChecks.map((check) => check.route));
		const routesNeedingDataUpdates = /* @__PURE__ */ new Set();
		for (const route of routesWithResolversToRun) {
			if (routesNeedingDataUpdates.has(route)) continue;
			for (const newRoute of flattenRouteTree(route)) routesNeedingDataUpdates.add(newRoute);
		}
		let routesProcessed = 0;
		return (0, import_cjs.from)(routesNeedingDataUpdates).pipe((0, import_operators.concatMap)((route) => {
			if (routesWithResolversToRun.has(route)) return runResolve(route, targetSnapshot, paramsInheritanceStrategy);
			else {
				route.data = getInherited(route, route.parent, paramsInheritanceStrategy).resolve;
				return (0, import_cjs.of)(void 0);
			}
		}), (0, import_operators.tap)(() => routesProcessed++), (0, import_operators.takeLast)(1), (0, import_operators.mergeMap)((_) => routesProcessed === routesNeedingDataUpdates.size ? (0, import_cjs.of)(t) : import_cjs.EMPTY));
	});
}
function flattenRouteTree(route) {
	return [route, ...route.children.map((child) => flattenRouteTree(child)).flat()];
}
function runResolve(futureARS, futureRSS, paramsInheritanceStrategy) {
	const config = futureARS.routeConfig;
	const resolve = futureARS._resolve;
	if (config?.title !== void 0 && !hasStaticTitle(config)) resolve[RouteTitleKey] = config.title;
	return (0, import_cjs.defer)(() => {
		futureARS.data = getInherited(futureARS, futureARS.parent, paramsInheritanceStrategy).resolve;
		return resolveNode(resolve, futureARS, futureRSS).pipe((0, import_operators.map)((resolvedData) => {
			futureARS._resolvedData = resolvedData;
			futureARS.data = {
				...futureARS.data,
				...resolvedData
			};
			return null;
		}));
	});
}
function resolveNode(resolve, futureARS, futureRSS) {
	const keys = getDataKeys(resolve);
	if (keys.length === 0) return (0, import_cjs.of)({});
	const data = {};
	return (0, import_cjs.from)(keys).pipe((0, import_operators.mergeMap)((key) => getResolver(resolve[key], futureARS, futureRSS).pipe((0, import_operators.first)(), (0, import_operators.tap)((value) => {
		if (value instanceof RedirectCommand) throw redirectingNavigationError(new DefaultUrlSerializer(), value);
		data[key] = value;
	}))), (0, import_operators.takeLast)(1), (0, import_operators.map)(() => data), (0, import_operators.catchError)((e) => isEmptyError(e) ? import_cjs.EMPTY : (0, import_cjs.throwError)(e)));
}
function getResolver(injectionToken, futureARS, futureRSS) {
	const closestInjector = futureARS._environmentInjector;
	const resolver = getTokenOrFunctionIdentity(injectionToken, closestInjector);
	return wrapIntoObservable(resolver.resolve ? resolver.resolve(futureARS, futureRSS) : runInInjectionContext(closestInjector, () => resolver(futureARS, futureRSS)));
}
var ROUTER_RESOURCES_FEATURE = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "Router Resources Feature" : "");
function switchTap(next) {
	return (0, import_operators.switchMap)((v) => {
		const nextResult = next(v);
		if (nextResult) return (0, import_cjs.from)(nextResult).pipe((0, import_operators.map)(() => v));
		return (0, import_cjs.of)(v);
	});
}
var TitleStrategy = class TitleStrategy {
	buildTitle(snapshot) {
		let pageTitle;
		let route = snapshot.root;
		while (route !== void 0) {
			pageTitle = this.getResolvedTitleForRoute(route) ?? pageTitle;
			route = route.children.find((child) => child.outlet === PRIMARY_OUTLET);
		}
		return pageTitle;
	}
	getResolvedTitleForRoute(snapshot) {
		return snapshot.data[RouteTitleKey];
	}
	static ɵfac = function TitleStrategy_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || TitleStrategy)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: TitleStrategy,
		factory: () => (() => inject(DefaultTitleStrategy))()
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TitleStrategy, [{
		type: Service,
		args: [{ factory: () => inject(DefaultTitleStrategy) }]
	}], null, null);
})();
var DefaultTitleStrategy = class DefaultTitleStrategy extends TitleStrategy {
	title;
	constructor(title) {
		super();
		this.title = title;
	}
	updateTitle(snapshot) {
		const title = this.buildTitle(snapshot);
		if (title !== void 0) this.title.setTitle(title);
	}
	static ɵfac = function DefaultTitleStrategy_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DefaultTitleStrategy)(ɵɵinject(Title));
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: DefaultTitleStrategy,
		factory: DefaultTitleStrategy.ɵfac,
		providedIn: "root"
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultTitleStrategy, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [{ type: Title }], null);
})();
var ROUTER_CONFIGURATION = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "router config" : "", { factory: () => ({}) });
var ROUTES = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "ROUTES" : "");
var RouterConfigLoader = class RouterConfigLoader {
	componentLoaders = /* @__PURE__ */ new WeakMap();
	childrenLoaders = /* @__PURE__ */ new WeakMap();
	onLoadStartListener;
	onLoadEndListener;
	compiler = inject(Compiler);
	async loadComponent(injector, route) {
		if (this.componentLoaders.get(route)) return this.componentLoaders.get(route);
		else if (route._loadedComponent) return Promise.resolve(route._loadedComponent);
		if (this.onLoadStartListener) this.onLoadStartListener(route);
		const loader = (async () => {
			try {
				const loaded = await wrapIntoPromise(runInInjectionContext(injector, () => route.loadComponent()));
				const component = await maybeResolveResources(maybeUnwrapDefaultExport(loaded));
				if (this.onLoadEndListener) this.onLoadEndListener(route);
				(typeof ngDevMode === "undefined" || ngDevMode) && assertStandalone(route.path ?? "", component);
				route._loadedComponent = component;
				return component;
			} finally {
				this.componentLoaders.delete(route);
			}
		})();
		this.componentLoaders.set(route, loader);
		return loader;
	}
	loadChildren(parentInjector, route) {
		if (this.childrenLoaders.get(route)) return this.childrenLoaders.get(route);
		else if (route._loadedRoutes) return Promise.resolve({
			routes: route._loadedRoutes,
			injector: route._loadedInjector
		});
		if (this.onLoadStartListener) this.onLoadStartListener(route);
		const loader = (async () => {
			try {
				const result = await loadChildren(route, this.compiler, parentInjector, this.onLoadEndListener);
				route._loadedRoutes = result.routes;
				route._loadedInjector = result.injector;
				route._loadedNgModuleFactory = result.factory;
				return result;
			} finally {
				this.childrenLoaders.delete(route);
			}
		})();
		this.childrenLoaders.set(route, loader);
		return loader;
	}
	static ɵfac = function RouterConfigLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || RouterConfigLoader)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: RouterConfigLoader,
		factory: RouterConfigLoader.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouterConfigLoader, [{ type: Service }], null, null);
})();
async function loadChildren(route, compiler, parentInjector, onLoadEndListener) {
	const loaded = await wrapIntoPromise(runInInjectionContext(parentInjector, () => route.loadChildren()));
	const t = await maybeResolveResources(maybeUnwrapDefaultExport(loaded));
	let factoryOrRoutes;
	if (t instanceof NgModuleFactory$1 || Array.isArray(t)) factoryOrRoutes = t;
	else factoryOrRoutes = await compiler.compileModuleAsync(t);
	if (onLoadEndListener) onLoadEndListener(route);
	let injector;
	let rawRoutes;
	let requireStandaloneComponents = false;
	let factory = void 0;
	if (Array.isArray(factoryOrRoutes)) {
		rawRoutes = factoryOrRoutes;
		requireStandaloneComponents = true;
	} else {
		injector = factoryOrRoutes.create(parentInjector).injector;
		factory = factoryOrRoutes;
		rawRoutes = injector.get(ROUTES, [], {
			optional: true,
			self: true
		}).flat();
	}
	const routes = rawRoutes.map(standardizeConfig);
	(typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(routes, route.path, requireStandaloneComponents);
	return {
		routes,
		injector,
		factory
	};
}
async function maybeResolveResources(value) {
	return value;
}
var UrlHandlingStrategy = class UrlHandlingStrategy {
	static ɵfac = function UrlHandlingStrategy_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || UrlHandlingStrategy)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: UrlHandlingStrategy,
		factory: () => (() => inject(DefaultUrlHandlingStrategy))()
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UrlHandlingStrategy, [{
		type: Service,
		args: [{ factory: () => inject(DefaultUrlHandlingStrategy) }]
	}], null, null);
})();
var DefaultUrlHandlingStrategy = class DefaultUrlHandlingStrategy {
	shouldProcessUrl(url) {
		return true;
	}
	extract(url) {
		return url;
	}
	merge(newUrlPart, wholeUrl) {
		return newUrlPart;
	}
	static ɵfac = function DefaultUrlHandlingStrategy_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DefaultUrlHandlingStrategy)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: DefaultUrlHandlingStrategy,
		factory: DefaultUrlHandlingStrategy.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultUrlHandlingStrategy, [{ type: Service }], null, null);
})();
var CREATE_VIEW_TRANSITION = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "view transition helper" : "");
new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "view transition options" : "");
var noop = () => {};
var NAVIGATION_ERROR_HANDLER = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "navigation error handler" : "");
var NavigationTransitions = class NavigationTransitions {
	currentNavigation = signal(null, {
		...ngDevMode ? { debugName: "currentNavigation" } : {},
		equal: () => false
	});
	currentTransition = null;
	lastSuccessfulNavigation = signal(null, ...ngDevMode ? [{ debugName: "lastSuccessfulNavigation" }] : []);
	events = new import_cjs.Subject();
	transitionAbortWithErrorSubject = new import_cjs.Subject();
	configLoader = inject(RouterConfigLoader);
	environmentInjector = inject(EnvironmentInjector);
	destroyRef = inject(DestroyRef);
	urlSerializer = inject(UrlSerializer);
	rootContexts = inject(ChildrenOutletContexts);
	location = inject(Location);
	inputBindingEnabled = inject(INPUT_BINDER, { optional: true }) !== null;
	titleStrategy = inject(TitleStrategy);
	options = inject(ROUTER_CONFIGURATION, { optional: true }) || {};
	paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || DEFAULT_PARAMS_INHERITANCE_STRATEGY;
	urlHandlingStrategy = inject(UrlHandlingStrategy);
	createViewTransition = inject(CREATE_VIEW_TRANSITION, { optional: true });
	navigationErrorHandler = inject(NAVIGATION_ERROR_HANDLER, { optional: true });
	routerResourcesFeature = inject(ROUTER_RESOURCES_FEATURE, { optional: true });
	navigationId = 0;
	get hasRequestedNavigation() {
		return this.navigationId !== 0;
	}
	transitions;
	afterPreactivation = () => (0, import_cjs.of)(void 0);
	rootComponentType = null;
	destroyed = false;
	constructor() {
		const onLoadStart = (r) => this.events.next(new RouteConfigLoadStart(r));
		const onLoadEnd = (r) => this.events.next(new RouteConfigLoadEnd(r));
		this.configLoader.onLoadEndListener = onLoadEnd;
		this.configLoader.onLoadStartListener = onLoadStart;
		this.destroyRef.onDestroy(() => {
			this.destroyed = true;
		});
	}
	complete() {
		this.transitions?.complete();
	}
	handleNavigationRequest(request) {
		const id = ++this.navigationId;
		untracked(() => {
			this.transitions?.next({
				...request,
				extractedUrl: this.urlHandlingStrategy.extract(request.rawUrl),
				targetSnapshot: null,
				targetRouterState: null,
				guards: {
					canActivateChecks: [],
					canDeactivateChecks: []
				},
				guardsResult: null,
				id,
				routesRecognizeHandler: {},
				beforeActivateHandler: {}
			});
		});
	}
	setupNavigations(router) {
		this.transitions = new import_cjs.BehaviorSubject(null);
		return this.transitions.pipe((0, import_operators.filter)((t) => t !== null), (0, import_operators.switchMap)((overallTransitionState) => {
			let abortable = true;
			let completedOrAborted = false;
			const abortController = new AbortController();
			const shouldContinueNavigation = () => {
				return !completedOrAborted && this.currentTransition?.id === overallTransitionState.id;
			};
			return (0, import_cjs.of)(overallTransitionState).pipe((0, import_operators.switchMap)((t) => {
				if (this.navigationId > overallTransitionState.id) {
					const cancellationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
					this.cancelNavigationTransition(overallTransitionState, cancellationReason, NavigationCancellationCode.SupersededByNewNavigation);
					return import_cjs.EMPTY;
				}
				this.currentTransition = overallTransitionState;
				const lastSuccessfulNavigation = this.lastSuccessfulNavigation();
				this.currentNavigation.set({
					id: t.id,
					initialUrl: t.rawUrl,
					extractedUrl: t.extractedUrl,
					targetBrowserUrl: typeof t.extras.browserUrl === "string" ? this.urlSerializer.parse(t.extras.browserUrl) : t.extras.browserUrl,
					trigger: t.source,
					extras: t.extras,
					previousNavigation: !lastSuccessfulNavigation ? null : {
						...lastSuccessfulNavigation,
						previousNavigation: null
					},
					abort: () => abortController.abort(),
					routesRecognizeHandler: t.routesRecognizeHandler,
					beforeActivateHandler: t.beforeActivateHandler
				});
				const urlTransition = !router.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl();
				const onSameUrlNavigation = t.extras.onSameUrlNavigation ?? router.onSameUrlNavigation;
				if (!urlTransition && onSameUrlNavigation !== "reload") {
					const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation to ${t.rawUrl} was ignored because it is the same as the current Router URL.` : "";
					this.events.next(new NavigationSkipped(t.id, this.urlSerializer.serialize(t.rawUrl), reason, NavigationSkippedCode.IgnoredSameUrlNavigation));
					t.resolve(false);
					return import_cjs.EMPTY;
				}
				if (this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) return (0, import_cjs.of)(t).pipe((0, import_operators.switchMap)((t) => {
					this.events.next(new NavigationStart(t.id, this.urlSerializer.serialize(t.extractedUrl), t.source, t.restoredState));
					if (t.id !== this.navigationId) return import_cjs.EMPTY;
					return Promise.resolve(t);
				}), recognize(this.environmentInjector, this.configLoader, this.rootComponentType, router.config, this.urlSerializer, this.paramsInheritanceStrategy, abortController.signal), (0, import_operators.tap)((t) => {
					overallTransitionState.targetSnapshot = t.targetSnapshot;
					overallTransitionState.urlAfterRedirects = t.urlAfterRedirects;
					this.currentNavigation.update((nav) => {
						nav.finalUrl = t.urlAfterRedirects;
						return nav;
					});
					this.events.next(new BeforeRoutesRecognized());
				}), (0, import_operators.switchMap)((value) => (0, import_cjs.from)(overallTransitionState.routesRecognizeHandler.deferredHandle ?? (0, import_cjs.of)(void 0)).pipe((0, import_operators.map)(() => value))), (0, import_operators.tap)(() => {
					const routesRecognized = new RoutesRecognized(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
					this.events.next(routesRecognized);
				}));
				else if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(t.currentRawUrl)) {
					const { id, extractedUrl, source, restoredState, extras } = t;
					const navStart = new NavigationStart(id, this.urlSerializer.serialize(extractedUrl), source, restoredState);
					this.events.next(navStart);
					const targetSnapshot = createEmptyState(this.rootComponentType, this.environmentInjector).snapshot;
					this.currentTransition = overallTransitionState = {
						...t,
						targetSnapshot,
						urlAfterRedirects: extractedUrl,
						extras: {
							...extras,
							skipLocationChange: false,
							replaceUrl: false
						}
					};
					this.currentNavigation.update((nav) => {
						nav.finalUrl = extractedUrl;
						return nav;
					});
					return (0, import_cjs.of)(overallTransitionState);
				} else {
					const reason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation was ignored because the UrlHandlingStrategy indicated neither the current URL ${t.currentRawUrl} nor target URL ${t.rawUrl} should be processed.` : "";
					this.events.next(new NavigationSkipped(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, NavigationSkippedCode.IgnoredByUrlHandlingStrategy));
					t.resolve(false);
					return import_cjs.EMPTY;
				}
			}), (0, import_operators.map)((t) => {
				const guardsStart = new GuardsCheckStart(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
				this.events.next(guardsStart);
				this.currentTransition = overallTransitionState = {
					...t,
					guards: getAllRouteGuards(t.targetSnapshot, t.currentSnapshot, this.rootContexts)
				};
				return overallTransitionState;
			}), checkGuards((evt) => this.events.next(evt)), (0, import_operators.switchMap)((t) => {
				overallTransitionState.guardsResult = t.guardsResult;
				if (t.guardsResult && typeof t.guardsResult !== "boolean") throw redirectingNavigationError(this.urlSerializer, t.guardsResult);
				const guardsEnd = new GuardsCheckEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
				this.events.next(guardsEnd);
				if (!shouldContinueNavigation()) return import_cjs.EMPTY;
				if (!t.guardsResult) {
					this.cancelNavigationTransition(t, "", NavigationCancellationCode.GuardRejected);
					return import_cjs.EMPTY;
				}
				if (t.guards.canActivateChecks.length === 0) return (0, import_cjs.of)(t);
				const resolveStart = new ResolveStart(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
				this.events.next(resolveStart);
				if (!shouldContinueNavigation()) return import_cjs.EMPTY;
				let dataResolved = false;
				return (0, import_cjs.of)(t).pipe(resolveData(this.paramsInheritanceStrategy), (0, import_operators.tap)({
					next: () => {
						dataResolved = true;
						const resolveEnd = new ResolveEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects), t.targetSnapshot);
						this.events.next(resolveEnd);
					},
					complete: () => {
						if (!dataResolved) this.cancelNavigationTransition(t, typeof ngDevMode === "undefined" || ngDevMode ? `At least one route resolver didn't emit any value.` : "", NavigationCancellationCode.NoDataFromResolver);
					}
				}));
			}), switchTap((t) => {
				const loadComponents = (route) => {
					const loaders = [];
					if (route.routeConfig?._loadedComponent) route.component = route.routeConfig?._loadedComponent;
					else if (route.routeConfig?.loadComponent) {
						const injector = route._environmentInjector;
						loaders.push(this.configLoader.loadComponent(injector, route.routeConfig).then((loadedComponent) => {
							route.component = loadedComponent;
						}));
					}
					for (const child of route.children) loaders.push(...loadComponents(child));
					return loaders;
				};
				const loaders = loadComponents(t.targetSnapshot.root);
				return loaders.length === 0 ? (0, import_cjs.of)(t) : (0, import_cjs.from)(Promise.all(loaders).then(() => t));
			}), (0, import_operators.switchMap)((t) => {
				const { newlyCreatedRoutes, state } = createRouterState(router.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
				this.currentTransition = overallTransitionState = t = {
					...t,
					targetRouterState: state,
					newlyCreatedRoutes
				};
				this.currentNavigation.update((nav) => {
					nav.targetRouterState = state;
					return nav;
				});
				return (0, import_cjs.of)(t);
			}), this.routerResourcesFeature?.setupAndRunResources(abortController.signal) ?? ((t) => t), switchTap(() => this.afterPreactivation()), (0, import_operators.switchMap)(() => {
				const { currentSnapshot, targetSnapshot } = overallTransitionState;
				const viewTransitionStarted = this.createViewTransition?.(this.environmentInjector, currentSnapshot.root, targetSnapshot.root, overallTransitionState.hasUAVisualTransition);
				return viewTransitionStarted ? (0, import_cjs.from)(viewTransitionStarted).pipe((0, import_operators.map)(() => overallTransitionState)) : (0, import_cjs.of)(overallTransitionState);
			}), (0, import_operators.take)(1), (0, import_operators.switchMap)((t) => {
				abortable = false;
				this.events.next(new BeforeActivateRoutes());
				const deferred = overallTransitionState.beforeActivateHandler.deferredHandle;
				return deferred ? (0, import_cjs.from)(deferred.then(() => t)) : (0, import_cjs.of)(t);
			}), (0, import_operators.tap)((t) => {
				new ActivateRoutes(router.routeReuseStrategy, overallTransitionState.targetRouterState, overallTransitionState.currentRouterState, (evt) => this.events.next(evt), this.inputBindingEnabled).activate(this.rootContexts);
				t.newlyCreatedRoutes?.clear();
				if (!shouldContinueNavigation()) return;
				resetPendingRoutes(t.targetRouterState);
				completedOrAborted = true;
				this.currentNavigation.update((nav) => {
					nav.abort = noop;
					return nav;
				});
				this.lastSuccessfulNavigation.set(untracked(this.currentNavigation));
				this.events.next(new NavigationEnd(t.id, this.urlSerializer.serialize(t.extractedUrl), this.urlSerializer.serialize(t.urlAfterRedirects)));
				this.titleStrategy?.updateTitle(t.targetRouterState.snapshot);
				t.resolve(true);
			}), (0, import_operators.takeUntil)(abortSignalToObservable(abortController.signal).pipe((0, import_operators.filter)(() => !completedOrAborted && abortable), (0, import_operators.tap)(() => {
				this.cancelNavigationTransition(overallTransitionState, abortController.signal.reason + "", NavigationCancellationCode.Aborted);
			}))), (0, import_operators.tap)({ complete: () => {
				completedOrAborted = true;
			} }), (0, import_operators.takeUntil)(this.transitionAbortWithErrorSubject.pipe((0, import_operators.tap)((err) => {
				throw err;
			}))), (0, import_operators.finalize)(() => {
				abortController.abort();
				if (!completedOrAborted) {
					const cancelationReason = typeof ngDevMode === "undefined" || ngDevMode ? `Navigation ID ${overallTransitionState.id} is not equal to the current navigation id ${this.navigationId}` : "";
					this.cancelNavigationTransition(overallTransitionState, cancelationReason, NavigationCancellationCode.SupersededByNewNavigation);
				}
				if (this.currentTransition?.id === overallTransitionState.id) {
					this.currentNavigation.set(null);
					this.currentTransition = null;
				}
			}), (0, import_operators.catchError)((e) => {
				completedOrAborted = true;
				rollbackState(overallTransitionState);
				if (this.destroyed) {
					overallTransitionState.resolve(false);
					return import_cjs.EMPTY;
				}
				if (e instanceof RedirectCommand) e = redirectingNavigationError(this.urlSerializer, e);
				if (isNavigationCancelingError(e)) {
					this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e.message, e.cancellationCode));
					if (!isRedirectingNavigationCancelingError(e)) overallTransitionState.resolve(false);
					else this.events.next(new RedirectRequest(e.url, e.navigationBehaviorOptions));
				} else {
					const navigationError = new NavigationError(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), e, overallTransitionState.targetSnapshot ?? void 0);
					try {
						const navigationErrorHandlerResult = runInInjectionContext(this.environmentInjector, () => this.navigationErrorHandler?.(navigationError));
						if (navigationErrorHandlerResult instanceof RedirectCommand) {
							const { message, cancellationCode } = redirectingNavigationError(this.urlSerializer, navigationErrorHandlerResult);
							this.events.next(new NavigationCancel(overallTransitionState.id, this.urlSerializer.serialize(overallTransitionState.extractedUrl), message, cancellationCode));
							this.events.next(new RedirectRequest(navigationErrorHandlerResult.redirectTo, navigationErrorHandlerResult.navigationBehaviorOptions));
						} else {
							this.events.next(navigationError);
							throw e;
						}
					} catch (ee) {
						if (this.options.resolveNavigationPromiseOnError) overallTransitionState.resolve(false);
						else overallTransitionState.reject(ee);
					}
				}
				return import_cjs.EMPTY;
			}));
		}));
	}
	cancelNavigationTransition(t, reason, code) {
		rollbackState(t);
		const navCancel = new NavigationCancel(t.id, this.urlSerializer.serialize(t.extractedUrl), reason, code);
		this.events.next(navCancel);
		t.resolve(false);
	}
	isUpdatingInternalState() {
		return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString();
	}
	isUpdatedBrowserUrl() {
		const currentBrowserUrl = this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true)));
		const currentNavigation = untracked(this.currentNavigation);
		const targetBrowserUrl = currentNavigation?.targetBrowserUrl ?? currentNavigation?.extractedUrl;
		return currentBrowserUrl.toString() !== targetBrowserUrl?.toString() && !currentNavigation?.extras.skipLocationChange;
	}
	static ɵfac = function NavigationTransitions_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || NavigationTransitions)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: NavigationTransitions,
		factory: NavigationTransitions.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NavigationTransitions, [{ type: Service }], () => [], null);
})();
function isBrowserTriggeredNavigation(source) {
	return source !== IMPERATIVE_NAVIGATION;
}
function rollbackState(t) {
	for (const r of t.newlyCreatedRoutes ?? []) {
		r._localInjector?.destroy();
		r._localInjector = void 0;
	}
	resetPendingRoutes(t.targetRouterState);
}
function resetPendingRoutes(targetRouterState) {
	if (!targetRouterState) return;
	const traverse = (node) => {
		node.value.pending?.set(false);
		node.children.forEach(traverse);
	};
	traverse(targetRouterState._root);
}
var ROUTE_INJECTOR_CLEANUP = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "RouteInjectorCleanup" : "");
var RouteReuseStrategy = class RouteReuseStrategy {
	static ɵfac = function RouteReuseStrategy_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || RouteReuseStrategy)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: RouteReuseStrategy,
		factory: () => (() => inject(DefaultRouteReuseStrategy))()
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RouteReuseStrategy, [{
		type: Service,
		args: [{ factory: () => inject(DefaultRouteReuseStrategy) }]
	}], null, null);
})();
var BaseRouteReuseStrategy = class {
	shouldDetach(route) {
		return false;
	}
	store(route, detachedTree) {}
	shouldAttach(route) {
		return false;
	}
	retrieve(route) {
		return null;
	}
	shouldReuseRoute(future, curr) {
		return future.routeConfig === curr.routeConfig;
	}
	shouldDestroyInjector(route) {
		return true;
	}
};
var DefaultRouteReuseStrategy = class DefaultRouteReuseStrategy extends BaseRouteReuseStrategy {
	static ɵfac = function DefaultRouteReuseStrategy_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || DefaultRouteReuseStrategy)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: DefaultRouteReuseStrategy,
		factory: DefaultRouteReuseStrategy.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultRouteReuseStrategy, [{ type: Service }], null, null);
})();
var StateManager = class StateManager {
	urlSerializer = inject(UrlSerializer);
	options = inject(ROUTER_CONFIGURATION, { optional: true }) || {};
	canceledNavigationResolution = this.options.canceledNavigationResolution || "replace";
	location = inject(Location);
	urlHandlingStrategy = inject(UrlHandlingStrategy);
	urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
	currentUrlTree = new UrlTree();
	getCurrentUrlTree() {
		return this.currentUrlTree;
	}
	rawUrlTree = this.currentUrlTree;
	getRawUrlTree() {
		return this.rawUrlTree;
	}
	createBrowserPath({ finalUrl, initialUrl, targetBrowserUrl }) {
		const rawUrl = finalUrl !== void 0 ? this.urlHandlingStrategy.merge(finalUrl, initialUrl) : initialUrl;
		const url = targetBrowserUrl ?? rawUrl;
		return url instanceof UrlTree ? this.urlSerializer.serialize(url) : url;
	}
	routerUrlState(navigation) {
		if (navigation?.targetBrowserUrl === void 0 || navigation?.finalUrl === void 0) return {};
		return { ɵrouterUrl: this.urlSerializer.serialize(navigation.finalUrl) };
	}
	commitTransition({ targetRouterState, finalUrl, initialUrl }) {
		if (finalUrl && targetRouterState) {
			this.currentUrlTree = finalUrl;
			this.rawUrlTree = this.urlHandlingStrategy.merge(finalUrl, initialUrl);
			this.routerState = targetRouterState;
		} else this.rawUrlTree = initialUrl;
	}
	routerState = createEmptyState(null, inject(EnvironmentInjector));
	getRouterState() {
		return this.routerState;
	}
	_stateMemento = this.createStateMemento();
	get stateMemento() {
		return this._stateMemento;
	}
	updateStateMemento() {
		this._stateMemento = this.createStateMemento();
	}
	createStateMemento() {
		return {
			rawUrlTree: this.rawUrlTree,
			currentUrlTree: this.currentUrlTree,
			routerState: this.routerState
		};
	}
	restoredState() {
		return this.location.getState();
	}
	static ɵfac = function StateManager_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || StateManager)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: StateManager,
		factory: () => (() => inject(HistoryStateManager))()
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StateManager, [{
		type: Service,
		args: [{ factory: () => inject(HistoryStateManager) }]
	}], null, null);
})();
var HistoryStateManager = class HistoryStateManager extends StateManager {
	currentPageId = 0;
	lastSuccessfulId = -1;
	get browserPageId() {
		if (this.canceledNavigationResolution !== "computed") return this.currentPageId;
		return this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
	}
	registerNonRouterCurrentEntryChangeListener(listener) {
		return this.location.subscribe((event) => {
			if (event["type"] === "popstate") setTimeout(() => {
				listener(event["url"], event.state, "popstate", { replaceUrl: true }, event.hasUAVisualTransition);
			});
		});
	}
	handleRouterEvent(e, currentTransition) {
		if (e instanceof NavigationStart) this.updateStateMemento();
		else if (e instanceof NavigationSkipped) this.commitTransition(currentTransition);
		else if (e instanceof RoutesRecognized) {
			if (this.urlUpdateStrategy === "eager") {
				if (!currentTransition.extras.skipLocationChange) this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
			}
		} else if (e instanceof BeforeActivateRoutes) {
			this.commitTransition(currentTransition);
			if (this.urlUpdateStrategy === "deferred" && !currentTransition.extras.skipLocationChange) this.setBrowserUrl(this.createBrowserPath(currentTransition), currentTransition);
		} else if (e instanceof NavigationCancel) {
			if (!isRedirectingEvent(e)) this.restoreHistory(currentTransition);
			else if (e.code === NavigationCancellationCode.Redirect && this.routerState === currentTransition.targetRouterState) this.resetInternalState(currentTransition);
		} else if (e instanceof NavigationError) this.restoreHistory(currentTransition, true);
		else if (e instanceof NavigationEnd) {
			this.lastSuccessfulId = e.id;
			this.currentPageId = this.browserPageId;
		}
	}
	setBrowserUrl(path, navigation) {
		const { extras, id } = navigation;
		const { replaceUrl, state } = extras;
		if (this.location.isCurrentPathEqualTo(path) || !!replaceUrl) {
			const currentBrowserPageId = this.browserPageId;
			const newState = {
				...state,
				...this.generateNgRouterState(id, currentBrowserPageId, navigation)
			};
			this.location.replaceState(path, "", newState);
		} else {
			const newState = {
				...state,
				...this.generateNgRouterState(id, this.browserPageId + 1, navigation)
			};
			this.location.go(path, "", newState);
		}
	}
	restoreHistory(navigation, restoringFromCaughtError = false) {
		if (this.canceledNavigationResolution === "computed") {
			const currentBrowserPageId = this.browserPageId;
			const targetPagePosition = this.currentPageId - currentBrowserPageId;
			if (targetPagePosition !== 0) this.location.historyGo(targetPagePosition);
			else if (this.getCurrentUrlTree() === navigation.finalUrl && targetPagePosition === 0) {
				this.resetInternalState(navigation);
				this.resetUrlToCurrentUrlTree();
			}
		} else if (this.canceledNavigationResolution === "replace") {
			if (restoringFromCaughtError) this.resetInternalState(navigation);
			this.resetUrlToCurrentUrlTree();
		}
	}
	resetInternalState({ finalUrl }) {
		this.routerState = this.stateMemento.routerState;
		this.currentUrlTree = this.stateMemento.currentUrlTree;
		this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, finalUrl ?? this.rawUrlTree);
	}
	resetUrlToCurrentUrlTree() {
		this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId));
	}
	generateNgRouterState(navigationId, routerPageId, navigation) {
		if (this.canceledNavigationResolution === "computed") return {
			navigationId,
			ɵrouterPageId: routerPageId,
			...this.routerUrlState(navigation)
		};
		return {
			navigationId,
			...this.routerUrlState(navigation)
		};
	}
	static ɵfac = function HistoryStateManager_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || HistoryStateManager)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: HistoryStateManager,
		factory: HistoryStateManager.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HistoryStateManager, [{ type: Service }], null, null);
})();
function afterNextNavigation(router, action) {
	router.events.pipe((0, import_operators.filter)((e) => e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError || e instanceof NavigationSkipped), (0, import_operators.map)((e) => {
		if (e instanceof NavigationEnd || e instanceof NavigationSkipped) return 0;
		return (e instanceof NavigationCancel ? e.code === NavigationCancellationCode.Redirect || e.code === NavigationCancellationCode.SupersededByNewNavigation : false) ? 2 : 1;
	}), (0, import_operators.filter)((result) => result !== 2), (0, import_operators.take)(1)).subscribe(() => {
		action();
	});
}
var Router = class Router {
	get currentUrlTree() {
		return this.stateManager.getCurrentUrlTree();
	}
	get rawUrlTree() {
		return this.stateManager.getRawUrlTree();
	}
	disposed = false;
	nonRouterCurrentEntryChangeSubscription;
	console = inject(Console$1);
	stateManager = inject(StateManager);
	options = inject(ROUTER_CONFIGURATION, { optional: true }) || {};
	pendingTasks = inject(PendingTasksInternal);
	urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred";
	navigationTransitions = inject(NavigationTransitions);
	urlSerializer = inject(UrlSerializer);
	location = inject(Location);
	urlHandlingStrategy = inject(UrlHandlingStrategy);
	injector = inject(EnvironmentInjector);
	_events = new import_cjs.Subject();
	get events() {
		return this._events;
	}
	get routerState() {
		return this.stateManager.getRouterState();
	}
	navigated = false;
	routeReuseStrategy = inject(RouteReuseStrategy);
	injectorCleanup = inject(ROUTE_INJECTOR_CLEANUP, { optional: true });
	onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore";
	config = inject(ROUTES, { optional: true })?.flat() ?? [];
	componentInputBindingEnabled = !!inject(INPUT_BINDER, { optional: true });
	currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
	constructor() {
		this.resetConfig(this.config);
		this.navigationTransitions.setupNavigations(this).subscribe({ error: (e) => {} });
		this.subscribeToNavigationEvents();
	}
	eventsSubscription = new import_cjs.Subscription();
	subscribeToNavigationEvents() {
		const subscription = this.navigationTransitions.events.subscribe((e) => {
			try {
				const currentTransition = this.navigationTransitions.currentTransition;
				const currentNavigation = untracked(this.navigationTransitions.currentNavigation);
				if (currentTransition !== null && currentNavigation !== null) {
					this.stateManager.handleRouterEvent(e, currentNavigation);
					if (e instanceof NavigationCancel && e.code !== NavigationCancellationCode.Redirect && e.code !== NavigationCancellationCode.SupersededByNewNavigation) this.navigated = true;
					else if (e instanceof NavigationEnd) {
						this.navigated = true;
						this.injectorCleanup?.(this.routeReuseStrategy, this.routerState, this.config);
					} else if (e instanceof RedirectRequest) {
						const opts = e.navigationBehaviorOptions;
						const mergedTree = this.urlHandlingStrategy.merge(e.url, currentTransition.currentRawUrl);
						const extras = {
							scroll: currentTransition.extras.scroll,
							browserUrl: currentTransition.extras.browserUrl,
							info: currentTransition.extras.info,
							skipLocationChange: currentTransition.extras.skipLocationChange,
							replaceUrl: currentTransition.extras.replaceUrl || this.urlUpdateStrategy === "eager" || isBrowserTriggeredNavigation(currentTransition.source),
							...opts
						};
						this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras, currentTransition.hasUAVisualTransition, {
							resolve: currentTransition.resolve,
							reject: currentTransition.reject,
							promise: currentTransition.promise
						});
					}
				}
				if (isPublicRouterEvent(e)) this._events.next(e);
			} catch (e) {
				this.navigationTransitions.transitionAbortWithErrorSubject.next(e);
			}
		});
		this.eventsSubscription.add(subscription);
	}
	resetRootComponentType(rootComponentType) {
		this.routerState.root.component = rootComponentType;
		this.navigationTransitions.rootComponentType = rootComponentType;
	}
	initialNavigation() {
		this.setUpLocationChangeListener();
		if (!this.navigationTransitions.hasRequestedNavigation) this.navigateToSyncWithBrowser(this.location.path(true), IMPERATIVE_NAVIGATION, this.stateManager.restoredState(), { replaceUrl: true });
	}
	setUpLocationChangeListener() {
		this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((url, state, source, extras, hasUAVisualTransition) => {
			this.navigateToSyncWithBrowser(url, source, state, extras, hasUAVisualTransition);
		});
	}
	navigateToSyncWithBrowser(url, source, state, extras, hasUAVisualTransition) {
		const restoredState = state?.navigationId ? state : null;
		const routerUrl = state?.ɵrouterUrl ?? url;
		if (state?.ɵrouterUrl) extras = {
			...extras,
			browserUrl: url
		};
		if (state) {
			const stateCopy = { ...state };
			delete stateCopy.navigationId;
			delete stateCopy.ɵrouterPageId;
			delete stateCopy.ɵrouterUrl;
			if (Object.keys(stateCopy).length !== 0) extras.state = stateCopy;
		}
		const urlTree = this.parseUrl(routerUrl);
		this.scheduleNavigation(urlTree, source, restoredState, extras, hasUAVisualTransition).catch((e) => {
			if (this.disposed) return;
			this.injector.get(INTERNAL_APPLICATION_ERROR_HANDLER)(e);
		});
	}
	get url() {
		return this.serializeUrl(this.currentUrlTree);
	}
	getCurrentNavigation() {
		return untracked(this.navigationTransitions.currentNavigation);
	}
	get lastSuccessfulNavigation() {
		return this.navigationTransitions.lastSuccessfulNavigation;
	}
	resetConfig(config) {
		(typeof ngDevMode === "undefined" || ngDevMode) && validateConfig(config);
		this.config = config.map(standardizeConfig);
		this.navigated = false;
	}
	ngOnDestroy() {
		this.dispose();
	}
	dispose() {
		this._events.unsubscribe();
		this.navigationTransitions.complete();
		this.nonRouterCurrentEntryChangeSubscription?.unsubscribe();
		this.nonRouterCurrentEntryChangeSubscription = void 0;
		this.disposed = true;
		this.eventsSubscription.unsubscribe();
	}
	createUrlTree(commands, navigationExtras = {}) {
		const { relativeTo, queryParams, fragment, queryParamsHandling, preserveFragment } = navigationExtras;
		const f = preserveFragment ? this.currentUrlTree.fragment : fragment;
		let q = null;
		switch (queryParamsHandling ?? this.options.defaultQueryParamsHandling) {
			case "merge":
				q = {
					...this.currentUrlTree.queryParams,
					...queryParams
				};
				break;
			case "preserve":
				q = this.currentUrlTree.queryParams;
				break;
			default: q = queryParams || null;
		}
		let relativeToUrlSegmentGroup;
		try {
			relativeToUrlSegmentGroup = createSegmentGroupFromRoute(relativeTo ? relativeTo.snapshot : this.routerState.snapshot.root);
		} catch (e) {
			if (typeof commands[0] !== "string" || commands[0][0] !== "/") commands = [];
			relativeToUrlSegmentGroup = this.currentUrlTree.root;
		}
		return createUrlTreeFromSegmentGroup(relativeToUrlSegmentGroup, commands, q, f ?? null, this.urlSerializer);
	}
	navigateByUrl(url, extras = { skipLocationChange: false }) {
		const urlTree = isUrlTree(url) ? url : this.parseUrl(url);
		const mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
		return this.scheduleNavigation(mergedTree, IMPERATIVE_NAVIGATION, null, extras);
	}
	navigate(commands, extras = { skipLocationChange: false }) {
		validateCommands(commands);
		return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
	}
	serializeUrl(url) {
		return this.urlSerializer.serialize(url);
	}
	parseUrl(url) {
		try {
			return this.urlSerializer.parse(url);
		} catch (e) {
			this.console.warn(formatRuntimeError(4018, ngDevMode && `Error parsing URL ${url}. Falling back to '/' instead. \n` + e));
			return this.urlSerializer.parse("/");
		}
	}
	isActive(url, matchOptions) {
		let options;
		if (matchOptions === true) options = { ...exactMatchOptions };
		else if (matchOptions === false) options = { ...subsetMatchOptions };
		else options = {
			...subsetMatchOptions,
			...matchOptions
		};
		if (isUrlTree(url)) return containsTree(this.currentUrlTree, url, options);
		const urlTree = this.parseUrl(url);
		return containsTree(this.currentUrlTree, urlTree, options);
	}
	scheduleNavigation(rawUrl, source, restoredState, extras, hasUAVisualTransition, priorPromise) {
		if (this.disposed) return Promise.resolve(false);
		let resolve;
		let reject;
		let promise;
		if (priorPromise) {
			resolve = priorPromise.resolve;
			reject = priorPromise.reject;
			promise = priorPromise.promise;
		} else promise = new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		});
		const taskId = this.pendingTasks.add();
		afterNextNavigation(this, () => {
			queueMicrotask(() => this.pendingTasks.remove(taskId));
		});
		this.navigationTransitions.handleNavigationRequest({
			source,
			restoredState,
			currentUrlTree: this.currentUrlTree,
			currentRawUrl: this.currentUrlTree,
			rawUrl,
			extras,
			hasUAVisualTransition,
			resolve,
			reject,
			promise,
			currentSnapshot: this.routerState.snapshot,
			currentRouterState: this.routerState
		});
		return promise.catch(Promise.reject.bind(Promise));
	}
	static ɵfac = function Router_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || Router)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineService({
		token: Router,
		factory: Router.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Router, [{ type: Service }], () => [], null);
})();
function validateCommands(commands) {
	for (let i = 0; i < commands.length; i++) {
		const cmd = commands[i];
		if (cmd == null) throw new RuntimeError(4008, (typeof ngDevMode === "undefined" || ngDevMode) && `The requested path contains ${cmd} segment at index ${i}`);
	}
}
// node_modules/@angular/router/fesm2022/router.mjs
/**
* @license Angular v22.2.4
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
// node_modules/@angular/ssr/fesm2022/_validation-chunk.mjs
var TRUST_ALL_PROXY_HEADERS = "*";
var HOST_HEADERS_TO_VALIDATE = ["host", "x-forwarded-host"];
var VALID_PORT_REGEX = /^\d+$/;
var VALID_PROTO_REGEX = /^https?$/i;
var VALID_PREFIX_REGEX = /^\/([a-z0-9_-]+\/)*[a-z0-9_-]*$/i;
function getFirstHeaderValue(value) {
	return value?.toString().split(",", 1)[0]?.trim();
}
function validateRequest(request, allowedHosts, disableHostCheck) {
	validateHeaders(request, allowedHosts, disableHostCheck);
	if (!disableHostCheck) validateUrl(new URL(request.url), allowedHosts);
}
function validateUrl(url, allowedHosts) {
	const { hostname } = url;
	if (!isHostAllowed(hostname, allowedHosts)) throw new Error(`URL with hostname "${hostname}" is not allowed.`);
}
function sanitizeRequestHeaders(request, trustProxyHeaders) {
	let headersDeleted = false;
	const headers = new Headers();
	for (const [key, value] of request.headers) {
		const lowerKey = key.toLowerCase();
		if ((lowerKey === "forwarded" || lowerKey.startsWith("x-forwarded-")) && !isProxyHeaderAllowed(lowerKey, trustProxyHeaders)) {
			console.warn(`Received "${key}" header but "trustProxyHeaders" was not set up to allow it.\nFor more information, see https://angular.dev/best-practices/security#configuring-trusted-proxy-headers`);
			headersDeleted = true;
		} else headers.set(key, value);
	}
	return headersDeleted ? new Request(request, { headers }) : request;
}
function verifyHostAllowed(headerName, headerValue, allowedHosts) {
	const url = `http://${headerValue}`;
	if (!URL.canParse(url)) throw new Error(`Header "${headerName}" contains an invalid value and cannot be parsed.`);
	const { hostname, pathname, search, hash, username, password } = new URL(url);
	if (pathname !== "/" || search || hash || username || password) throw new Error(`Header "${headerName}" with value "${headerValue}" contains characters that are not allowed.`);
	if (!isHostAllowed(hostname, allowedHosts)) throw new Error(`Header "${headerName}" with value "${headerValue}" is not allowed.`);
}
function isHostAllowed(hostname, allowedHosts) {
	if (allowedHosts.has("*") || allowedHosts.has(hostname)) return true;
	for (const allowedHost of allowedHosts) {
		if (!allowedHost.startsWith("*.")) continue;
		const domain = allowedHost.slice(1);
		if (hostname.endsWith(domain)) return true;
	}
	return false;
}
function validateHeaders(request, allowedHosts, disableHostCheck) {
	const headers = request.headers;
	for (const headerName of HOST_HEADERS_TO_VALIDATE) {
		const headerValue = getFirstHeaderValue(headers.get(headerName));
		if (headerValue && !disableHostCheck) verifyHostAllowed(headerName, headerValue, allowedHosts);
	}
	const forwarded = headers.get("forwarded");
	if (forwarded) {
		const forwardedParams = parseForwardedHeader(forwarded);
		if (forwardedParams.host && !disableHostCheck) verifyHostAllowed("Forwarded \"host\"", forwardedParams.host, allowedHosts);
		if (forwardedParams.proto && !VALID_PROTO_REGEX.test(forwardedParams.proto)) throw new Error("Header \"forwarded\" proto parameter must be either \"http\" or \"https\".");
	}
	const xForwardedPort = getFirstHeaderValue(headers.get("x-forwarded-port"));
	if (xForwardedPort && !VALID_PORT_REGEX.test(xForwardedPort)) throw new Error("Header \"x-forwarded-port\" must be a numeric value.");
	const xForwardedProto = getFirstHeaderValue(headers.get("x-forwarded-proto"));
	if (xForwardedProto && !VALID_PROTO_REGEX.test(xForwardedProto)) throw new Error("Header \"x-forwarded-proto\" must be either \"http\" or \"https\".");
	const xForwardedPrefix = getFirstHeaderValue(headers.get("x-forwarded-prefix"));
	if (xForwardedPrefix && !VALID_PREFIX_REGEX.test(xForwardedPrefix)) throw new Error("Header \"x-forwarded-prefix\" is invalid. It must start with a \"/\" and contain only alphanumeric characters, hyphens, and underscores, separated by single slashes.");
}
function isProxyHeaderAllowed(headerName, trustProxyHeaders) {
	return trustProxyHeaders.has(TRUST_ALL_PROXY_HEADERS) || trustProxyHeaders.has(headerName.toLowerCase());
}
function normalizeTrustProxyHeaders(trustProxyHeaders) {
	if (!trustProxyHeaders) return /* @__PURE__ */ new Set();
	if (trustProxyHeaders === true) return /* @__PURE__ */ new Set([TRUST_ALL_PROXY_HEADERS]);
	const normalizedTrustedProxyHeaders = /* @__PURE__ */ new Set();
	for (const header of trustProxyHeaders) {
		const lowerHeader = header.toLowerCase();
		if (lowerHeader === TRUST_ALL_PROXY_HEADERS) throw new Error(`"${TRUST_ALL_PROXY_HEADERS}" is not allowed as a value for the "trustProxyHeaders" option.`);
		if (!(lowerHeader === "forwarded" || lowerHeader.startsWith("x-forwarded-"))) throw new Error(`"${header}" is not a valid proxy header. Trusted proxy headers must be "forwarded" or start with "x-forwarded-".`);
		normalizedTrustedProxyHeaders.add(lowerHeader);
	}
	return normalizedTrustedProxyHeaders;
}
function parseForwardedHeader(headerValue) {
	if (!headerValue) return {};
	const params = {};
	let inQuotes = false;
	let escaped = false;
	let currentKey = "";
	let currentValue = "";
	let isParsingValue = false;
	let isKeyEnded = false;
	let isParsingValueEnded = false;
	for (const char of headerValue) {
		if (escaped) {
			escaped = false;
			if (isParsingValue) currentValue += char;
			else currentKey += char;
			continue;
		}
		if (char === "\\") {
			if (inQuotes) escaped = true;
			else if (isParsingValue) currentValue += char;
			else currentKey += char;
			continue;
		}
		if (char === "\"") {
			inQuotes = !inQuotes;
			continue;
		}
		if (inQuotes) {
			if (isParsingValue) currentValue += char;
			else currentKey += char;
			continue;
		}
		if (char === ",") {
			addParam(currentKey, currentValue, isParsingValue, params);
			break;
		}
		if (char === ";") {
			addParam(currentKey, currentValue, isParsingValue, params);
			currentKey = "";
			currentValue = "";
			isParsingValue = false;
			isKeyEnded = false;
			isParsingValueEnded = false;
			continue;
		}
		if (char === "=") {
			if (!isParsingValue) isParsingValue = true;
			else currentValue += char;
			continue;
		}
		if (char === " " || char === "	") {
			if (isParsingValue) {
				if (currentValue.length > 0) isParsingValueEnded = true;
			} else if (currentKey.length > 0) isKeyEnded = true;
			continue;
		}
		if (isParsingValue) {
			if (!isParsingValueEnded) currentValue += char;
		} else if (isKeyEnded) {
			currentKey = char;
			isKeyEnded = false;
		} else currentKey += char;
	}
	if (currentKey || currentValue || isParsingValue) addParam(currentKey, currentValue, isParsingValue, params);
	return params;
}
function addParam(key, value, hasValue, params) {
	if (!hasValue) return;
	const trimmedKey = key.trim().toLowerCase();
	if (trimmedKey) params[trimmedKey] = value;
}
// node_modules/@angular/platform-server/fesm2022/_server-chunk.mjs
/**
* @license Angular v22.2.4
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function setDomTypes() {
	Object.assign(globalThis, index.impl);
	globalThis["KeyboardEvent"] = index.impl.Event;
}
function parseDocument(html, url = "/") {
	return index.createWindow(html, url).document;
}
function serializeDocument(doc) {
	return doc.serialize();
}
var DominoAdapter = class DominoAdapter extends BrowserDomAdapter {
	static makeCurrent() {
		setDomTypes();
		setRootDomAdapter(new DominoAdapter());
	}
	supportsDOMEvents = false;
	static defaultDoc;
	createHtmlDocument() {
		return parseDocument("<html><head><title>fakeTitle</title></head><body></body></html>");
	}
	getDefaultDocument() {
		if (!DominoAdapter.defaultDoc) DominoAdapter.defaultDoc = index.createDocument();
		return DominoAdapter.defaultDoc;
	}
	isElementNode(node) {
		return node ? node.nodeType === DominoAdapter.defaultDoc.ELEMENT_NODE : false;
	}
	isShadowRoot(node) {
		return node.shadowRoot == node;
	}
	getGlobalEventTarget(doc, target) {
		if (target === "window") return doc.defaultView;
		if (target === "document") return doc;
		if (target === "body") return doc.body;
		return null;
	}
	getBaseHref(doc) {
		const length = doc.head.children.length;
		for (let i = 0; i < length; i++) {
			const child = doc.head.children[i];
			if (child.tagName === "BASE") return child.getAttribute("href") || "";
		}
		return "";
	}
	dispatchEvent(el, evt) {
		el.dispatchEvent(evt);
		const win = (el.ownerDocument || el).defaultView;
		if (win) win.dispatchEvent(evt);
	}
	getUserAgent() {
		return "Fake user agent";
	}
	getCookie(name) {
		throw new RuntimeError(5700, (typeof ngDevMode === "undefined" || ngDevMode) && "getCookie has not been implemented");
	}
};
var INITIAL_CONFIG = new InjectionToken("Server.INITIAL_CONFIG");
var BEFORE_APP_SERIALIZED = new InjectionToken("Server.RENDER_MODULE_HOOK");
var ENABLE_DOM_EMULATION = new InjectionToken("ENABLE_DOM_EMULATION");
var PlatformState = class PlatformState {
	_doc;
	_enableDomEmulation = enableDomEmulation(inject(Injector));
	constructor(_doc) {
		this._doc = _doc;
	}
	renderToString() {
		if (ngDevMode && !this._enableDomEmulation && !window?.document) throw new RuntimeError(5704, (typeof ngDevMode === "undefined" || ngDevMode) && "Disabled DOM emulation should only run in browser environments");
		const measuringLabel = "renderToString";
		startMeasuring(measuringLabel);
		const rendered = this._enableDomEmulation ? serializeDocument(this._doc) : this._doc.documentElement.outerHTML;
		stopMeasuring(measuringLabel);
		return rendered;
	}
	getDocument() {
		return this._doc;
	}
	static ɵfac = function PlatformState_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || PlatformState)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: PlatformState,
		factory: PlatformState.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformState, [{ type: Injectable }], () => [{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	}], null);
})();
function enableDomEmulation(injector) {
	return injector.get(ENABLE_DOM_EMULATION, true);
}
var HTTP_OR_HTTPS_PROTOCOL_REGEXP = /^https?:/i;
var HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP = /^https?:(?![/\\]{2})/i;
function resolveUrl(urlStr, origin, options = {}) {
	const originUrl = typeof origin === "string" ? new URL("/", origin) : origin;
	if (!urlStr) return originUrl || null;
	let resolved;
	if (!originUrl || !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(urlStr)) try {
		resolved = new URL(urlStr);
	} catch {}
	const { allowProtocolRelative = false, allowOriginChange = true } = options;
	if (resolved) {
		if (isDisallowedProtocolRelative(resolved, allowProtocolRelative)) throwProtocolRelativeUrlError(urlStr);
		if (originUrl && !isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) throwSuspiciousUrlError(urlStr);
		return resolved;
	}
	if (!URL.canParse(urlStr, "http://fake")) throw new RuntimeError(5701, typeof ngDevMode === "undefined" || ngDevMode ? `Invalid URL: ${urlStr}` : urlStr);
	if (!originUrl) return null;
	if (urlStr.startsWith("//")) {
		if (!allowProtocolRelative) throwProtocolRelativeUrlError(urlStr);
		return new URL(urlStr, origin);
	}
	resolved = new URL(urlStr, origin);
	if (isDisallowedProtocolRelative(resolved, allowProtocolRelative)) throwProtocolRelativeUrlError(urlStr);
	if (!isSafeOriginChange(resolved, originUrl, urlStr, allowOriginChange)) throwSuspiciousUrlError(urlStr);
	return resolved;
}
function isDisallowedProtocolRelative(resolved, allowProtocolRelative) {
	return !allowProtocolRelative && resolved.pathname.startsWith("//");
}
function throwProtocolRelativeUrlError(urlStr) {
	throw new RuntimeError(5702, typeof ngDevMode === "undefined" || ngDevMode ? `Protocol relative URLs are not allowed in this context. URL: ${urlStr}` : urlStr);
}
function throwSuspiciousUrlError(urlStr) {
	throw new RuntimeError(-5703, typeof ngDevMode === "undefined" || ngDevMode ? `URL ${urlStr} changed origin unexpectedly. This is suspicious and may indicate a security bypass attempt.` : urlStr);
}
function isSafeOriginChange(resolved, origin, urlStr, allowOriginChange) {
	if (origin.origin === resolved.origin) return true;
	if (!allowOriginChange) return false;
	return HTTP_OR_HTTPS_PROTOCOL_REGEXP.test(urlStr) && !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(urlStr);
}
var ServerXhr = class ServerXhr {
	xhrImpl;
	async ɵloadImpl() {
		if (!this.xhrImpl) {
			if (typeof ngDevMode === "undefined" || ngDevMode) console.warn("XHR support in `@angular/platform-server` is deprecated and will be removed in Angular 23. It has known security and performance issues in server environments, such as forwarding `Authorization` headers on cross-origin redirects and susceptibility to denial-of-service (DoS) via redirect loops. Please use the HttpClient fetch backend instead, which is the default since Angular 22.");
			const { default: xhr } = await import("./xhr2-C93bXoRa.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
			this.xhrImpl = xhr;
		}
	}
	build() {
		const impl = this.xhrImpl;
		if (!impl) throw new RuntimeError(5705, (typeof ngDevMode === "undefined" || ngDevMode) && "Unexpected state in ServerXhr: XHR implementation is not loaded.");
		return new impl.XMLHttpRequest();
	}
	static ɵfac = function ServerXhr_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerXhr)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ServerXhr,
		factory: ServerXhr.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerXhr, [{ type: Injectable }], null, null);
})();
var URL_SCHEMA_REGEXP = /^(?:[a-zA-Z][a-zA-Z0-9+\-.]*:)/;
function relativeUrlsTransformerInterceptorFn(request, next) {
	if (URL_SCHEMA_REGEXP.test(request.url) && !HTTP_OR_HTTPS_NO_AUTHORITY_REGEXP.test(request.url)) return next(request);
	const platformLocation = inject(PlatformLocation);
	const { href, protocol, hostname, port } = platformLocation;
	if (!protocol.startsWith("http")) return next(request);
	let urlPrefix = `${protocol}//${hostname}`;
	if (port) urlPrefix += `:${port}`;
	const baseHref = platformLocation.getBaseHrefFromDOM() || href;
	const baseUrl = new URL(baseHref, urlPrefix);
	const parsedUrl = resolveUrl(request.url, baseUrl, { allowProtocolRelative: true });
	return next(request.clone({ url: parsedUrl.toString() }));
}
var SERVER_HTTP_PROVIDERS = [{
	provide: XhrFactory,
	useClass: ServerXhr
}, {
	provide: HTTP_ROOT_INTERCEPTOR_FNS,
	useValue: relativeUrlsTransformerInterceptorFn,
	multi: true
}];
var ServerPlatformLocation = class ServerPlatformLocation {
	href = "/";
	hostname = "/";
	protocol = "/";
	port = "/";
	pathname = "/";
	search = "";
	hash = "";
	_hashUpdate = new import_cjs.Subject();
	_doc = inject(DOCUMENT);
	origin = this._doc.location.origin;
	constructor() {
		const config = inject(INITIAL_CONFIG, { optional: true });
		if (!config) return;
		if (config.url) {
			const { protocol, hostname, port, pathname, search, hash, href, origin } = resolveUrl(config.url, this.origin);
			this.protocol = protocol;
			this.hostname = hostname;
			this.port = port;
			this.pathname = pathname;
			this.search = search;
			this.hash = hash;
			this.href = href;
			this.origin = origin;
		}
	}
	getBaseHrefFromDOM() {
		return getDOM().getBaseHref(this._doc);
	}
	onPopState(fn) {
		return () => {};
	}
	onHashChange(fn) {
		const subscription = this._hashUpdate.subscribe(fn);
		return () => subscription.unsubscribe();
	}
	get url() {
		return `${this.pathname}${this.search}${this.hash}`;
	}
	setHash(value, oldUrl) {
		if (this.hash === value) return;
		this.hash = value;
		const newUrl = this.url;
		queueMicrotask(() => this._hashUpdate.next({
			type: "hashchange",
			state: null,
			oldUrl,
			newUrl
		}));
	}
	replaceState(state, title, newUrl) {
		const oldUrl = this.url;
		const { pathname, search, hash, href, protocol } = resolveUrl(newUrl, this.origin, { allowOriginChange: false });
		const writableThis = this;
		writableThis.pathname = pathname;
		writableThis.search = search;
		writableThis.href = href;
		writableThis.protocol = protocol;
		this.setHash(hash, oldUrl);
	}
	pushState(state, title, newUrl) {
		this.replaceState(state, title, newUrl);
	}
	forward() {
		throw new Error("Not implemented");
	}
	back() {
		throw new Error("Not implemented");
	}
	getState() {}
	static ɵfac = function ServerPlatformLocation_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerPlatformLocation)();
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ServerPlatformLocation,
		factory: ServerPlatformLocation.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerPlatformLocation, [{ type: Injectable }], () => [], null);
})();
var ServerEventManagerPlugin = class ServerEventManagerPlugin extends EventManagerPlugin {
	doc;
	constructor(doc) {
		super(doc);
		this.doc = doc;
	}
	supports(eventName) {
		return true;
	}
	addEventListener(element, eventName, handler, options) {
		return getDOM().onAndCancel(element, eventName, handler, options);
	}
	static ɵfac = function ServerEventManagerPlugin_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerEventManagerPlugin)(ɵɵinject(DOCUMENT));
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: ServerEventManagerPlugin,
		factory: ServerEventManagerPlugin.ɵfac
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerEventManagerPlugin, [{ type: Injectable }], () => [{
		type: void 0,
		decorators: [{
			type: Inject,
			args: [DOCUMENT]
		}]
	}], null);
})();
var TRANSFER_STATE_STATUS = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "TRANSFER_STATE_STATUS" : "", { factory: () => ({ serialized: false }) });
var TRANSFER_STATE_SERIALIZATION_PROVIDERS = [{
	provide: BEFORE_APP_SERIALIZED,
	useFactory: serializeTransferStateFactory,
	multi: true
}];
function createScript(doc, textContent, nonce) {
	const script = doc.createElement("script");
	script.textContent = textContent;
	if (nonce) script.setAttribute("nonce", nonce);
	return script;
}
function warnIfStateTransferHappened(injector) {
	const transferStateStatus = injector.get(TRANSFER_STATE_STATUS);
	if (transferStateStatus.serialized) console.warn("Angular detected an incompatible configuration, which causes duplicate serialization of the server-side application state.\n\nThis can happen if the server providers have been provided more than once using different mechanisms. For example:\n\n  imports: [ServerModule], // Registers server providers\n  providers: [provideServerRendering()] // Also registers server providers\n\nTo fix this, ensure that the `provideServerRendering()` function is the only provider used and remove the other(s).");
	transferStateStatus.serialized = true;
}
function serializeTransferStateFactory() {
	const doc = inject(DOCUMENT);
	const appId = inject(APP_ID);
	const transferStore = inject(TransferState);
	const injector = inject(Injector);
	return () => {
		const measuringLabel = "serializeTransferStateFactory";
		startMeasuring(measuringLabel);
		const content = transferStore.toJson();
		if (transferStore.isEmpty) return;
		if (typeof ngDevMode !== "undefined" && ngDevMode) warnIfStateTransferHappened(injector);
		const script = createScript(doc, content, null);
		script.id = appId + "-state";
		script.setAttribute("type", "application/json");
		doc.body.appendChild(script);
		stopMeasuring(measuringLabel);
	};
}
var INTERNAL_SERVER_PLATFORM_PROVIDERS = [
	{
		provide: DOCUMENT,
		useFactory: _document
	},
	{
		provide: PLATFORM_ID,
		useValue: PLATFORM_SERVER_ID
	},
	{
		provide: PLATFORM_INITIALIZER,
		useFactory: initDominoAdapter,
		multi: true
	},
	{
		provide: PlatformLocation,
		useClass: ServerPlatformLocation,
		deps: []
	},
	{
		provide: PlatformState,
		deps: [DOCUMENT]
	}
];
function initDominoAdapter() {
	const _enableDomEmulation = enableDomEmulation(inject(Injector));
	return () => {
		if (_enableDomEmulation) DominoAdapter.makeCurrent();
		else BrowserDomAdapter.makeCurrent();
	};
}
var PLATFORM_SERVER_PROVIDERS = [
	TRANSFER_STATE_SERIALIZATION_PROVIDERS,
	[{
		provide: EVENT_MANAGER_PLUGINS,
		multi: true,
		useClass: ServerEventManagerPlugin
	}],
	SERVER_HTTP_PROVIDERS,
	{
		provide: Testability,
		useValue: null
	},
	{
		provide: TESTABILITY,
		useValue: null
	},
	{
		provide: ViewportScroller,
		useClass: NullViewportScroller
	}
];
var ServerModule = class ServerModule {
	static ɵfac = function ServerModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || ServerModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: ServerModule,
		exports: [BrowserModule]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({
		providers: PLATFORM_SERVER_PROVIDERS,
		imports: [BrowserModule]
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ServerModule, [{
		type: NgModule,
		args: [{
			exports: [BrowserModule],
			providers: PLATFORM_SERVER_PROVIDERS
		}]
	}], null, null);
})();
function _document() {
	const injector = inject(Injector);
	const config = injector.get(INITIAL_CONFIG, null);
	const _enableDomEmulation = enableDomEmulation(injector);
	let document;
	if (config && config.document) document = typeof config.document === "string" ? _enableDomEmulation ? parseDocument(config.document, config.url !== void 0 ? resolveUrl(config.url, "http://localhost").href : void 0) : window.document : config.document;
	else document = getDOM().createHtmlDocument();
	setDocument(document);
	return document;
}
function platformServer(extraProviders) {
	return createPlatformFactory(platformCore, "server", INTERNAL_SERVER_PLATFORM_PROVIDERS)(extraProviders);
}
// node_modules/@angular/platform-server/fesm2022/platform-server.mjs
/**
* @license Angular v22.2.4
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function provideServerRendering$1(options) {
	const providers = [...PLATFORM_SERVER_PROVIDERS];
	if (options?.maxResponseBodySize) providers.push({
		provide: HTTP_FETCH_MAX_RESPONSE_SIZE,
		useValue: options.maxResponseBodySize
	});
	return makeEnvironmentProviders(providers);
}
var EVENT_DISPATCH_SCRIPT_ID = "ng-event-dispatch-contract";
function findEventDispatchScript(doc) {
	return doc.getElementById(EVENT_DISPATCH_SCRIPT_ID);
}
function removeEventDispatchScript(doc) {
	findEventDispatchScript(doc)?.remove();
}
function prepareForHydration(platformState, applicationRef) {
	const measuringLabel = "prepareForHydration";
	startMeasuring(measuringLabel);
	const environmentInjector = applicationRef.injector;
	const doc = platformState.getDocument();
	if (!environmentInjector.get(IS_HYDRATION_DOM_REUSE_ENABLED, false)) {
		removeEventDispatchScript(doc);
		return;
	}
	appendSsrContentIntegrityMarker(doc);
	const eventTypesToReplay = annotateForHydration(applicationRef, doc);
	if (eventTypesToReplay.regular.size || eventTypesToReplay.capture.size) insertEventRecordScript(environmentInjector.get(APP_ID), doc, eventTypesToReplay, environmentInjector.get(CSP_NONCE, null));
	else removeEventDispatchScript(doc);
	stopMeasuring(measuringLabel);
}
function appendSsrContentIntegrityMarker(doc) {
	const comment = doc.createComment(SSR_CONTENT_INTEGRITY_MARKER);
	doc.body.firstChild ? doc.body.insertBefore(comment, doc.body.firstChild) : doc.body.append(comment);
}
function appendServerContextInfo(applicationRef) {
	const injector = applicationRef.injector;
	let serverContext = sanitizeServerContext(injector.get(SERVER_CONTEXT, DEFAULT_SERVER_CONTEXT));
	applicationRef.components.forEach((componentRef) => {
		const renderer = componentRef.injector.get(Renderer2);
		const element = componentRef.location.nativeElement;
		if (element) renderer.setAttribute(element, "ng-server-context", serverContext);
	});
}
function insertEventRecordScript(appId, doc, eventTypesToReplay, nonce) {
	const measuringLabel = "insertEventRecordScript";
	startMeasuring(measuringLabel);
	const { regular, capture } = eventTypesToReplay;
	const eventDispatchScript = findEventDispatchScript(doc);
	if (eventDispatchScript) {
		const replayScript = createScript(doc, `window.__jsaction_bootstrap(document.body,"${appId}",${JSON.stringify(Array.from(regular))},${JSON.stringify(Array.from(capture))});`, nonce);
		eventDispatchScript.after(replayScript);
	}
	stopMeasuring(measuringLabel);
}
async function renderInternal(platformRef, applicationRef) {
	const platformState = platformRef.injector.get(PlatformState);
	prepareForHydration(platformState, applicationRef);
	appendServerContextInfo(applicationRef);
	const environmentInjector = applicationRef.injector;
	const errorHandler = environmentInjector.get(INTERNAL_APPLICATION_ERROR_HANDLER);
	const callbacks = environmentInjector.get(BEFORE_APP_SERIALIZED, null);
	if (callbacks) {
		const asyncCallbacks = [];
		for (const callback of callbacks) try {
			const callbackResult = callback();
			if (callbackResult) asyncCallbacks.push(callbackResult);
		} catch (e) {
			errorHandler(e);
		}
		if (asyncCallbacks.length) {
			for (const result of await Promise.allSettled(asyncCallbacks)) if (result.status === "rejected") errorHandler(result.reason);
		}
	}
	return platformState.renderToString();
}
var DEFAULT_SERVER_CONTEXT = "other";
var SERVER_CONTEXT = new InjectionToken("SERVER_CONTEXT");
function sanitizeServerContext(serverContext) {
	const context = serverContext.replace(/[^a-zA-Z0-9\-]/g, "");
	return context.length > 0 ? context : DEFAULT_SERVER_CONTEXT;
}
// node_modules/beasties/dist/plan-DLQRCYVX.mjs
var HEX_ESCAPE_RE = /\\([0-9a-f]{1,6})[\t\n\f\r ]?/gi;
var CHAR_ESCAPE_RE = /\\(.)/g;
var WHITESPACE_RE$1 = /\s+/g;
/**
* Whether any of a document's codepoints falls inside a face's `unicode-range`.
* Unknown ranges or unknown document text count as a match, so a face is only
* excluded when its subset is provably unused.
*/
function unicodeRangeUsed(ranges, chars) {
	if (!ranges || !chars) return true;
	for (const codepoint of chars) for (let i = 0; i < ranges.length; i += 2) if (codepoint >= ranges[i] && codepoint <= ranges[i + 1]) return true;
	return false;
}
var ENTITY_RE = /&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/iy;
var NAMED_ENTITIES = {
	amp: "&",
	apos: "'",
	gt: ">",
	lt: "<",
	nbsp: "\xA0",
	quot: "\""
};
function createTextCodepoints() {
	return {
		bmp: /* @__PURE__ */ new Uint8Array(65536),
		astral: /* @__PURE__ */ new Set(),
		complete: true
	};
}
/** Materialize collected codepoints, or `undefined` if some text was undecodable */
function toCodepointSet(text) {
	if (!text.complete) return;
	const chars = new Set(text.astral);
	for (let codepoint = 0; codepoint < text.bmp.length; codepoint++) if (text.bmp[codepoint]) chars.add(codepoint);
	return chars;
}
/**
* Add the codepoints of a run of (possibly entity-encoded) HTML text. An
* entity that can't be decoded clears `complete`, since the document then
* contains characters we can't account for.
*/
function addTextCodepoints(text, into) {
	const { bmp } = into;
	for (let index = 0; index < text.length; index++) {
		const code = text.charCodeAt(index);
		if (code === 38) {
			ENTITY_RE.lastIndex = index;
			const entity = ENTITY_RE.exec(text);
			if (entity) {
				const body = entity[1];
				if (body[0] === "#") {
					const codepoint = body[1] === "x" || body[1] === "X" ? Number.parseInt(body.slice(2), 16) : Number.parseInt(body.slice(1), 10);
					if (codepoint >= 0 && codepoint <= 65535) bmp[codepoint] = 1;
					else if (codepoint > 65535 && codepoint <= 1114111) into.astral.add(codepoint);
				} else {
					const decoded = NAMED_ENTITIES[body.toLowerCase()];
					if (decoded) bmp[decoded.charCodeAt(0)] = 1;
					else into.complete = false;
				}
				index = ENTITY_RE.lastIndex - 1;
				continue;
			}
		}
		if (code >= 55296 && code <= 56319 && index + 1 < text.length) {
			const low = text.charCodeAt(index + 1);
			if (low >= 56320 && low <= 57343) {
				into.astral.add((code - 55296) * 1024 + low - 56320 + 65536);
				index++;
				continue;
			}
		}
		bmp[code] = 1;
	}
}
/** Case-fold, unquote and unescape a single family name for comparison */
function normalizeFontFamily(family) {
	let value = family.trim();
	const quote = value[0];
	if ((quote === "\"" || quote === "'") && value.endsWith(quote) && value.length > 1) value = value.slice(1, -1);
	value = value.replace(HEX_ESCAPE_RE, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16))).replace(CHAR_ESCAPE_RE, "$1").replace(WHITESPACE_RE$1, " ").trim();
	return value.toLowerCase();
}
var ATTR_ACTIONS = [
	"exists",
	"equals",
	"element",
	"start",
	"end",
	"any",
	"hyphen"
];
/** Whether a value is a compact plan rather than a `CompiledSheet` */
function isCompactPlan(plan) {
	return Array.isArray(plan) && plan[0] === 1;
}
// node_modules/beasties/dist/runtime.mjs
/**
* Conservative allowlist for re-emitting a `media` attribute value into
* generated JavaScript. `validateMediaQuery()` parses the query but tolerates
* quotes and semicolons, which would break out of the `onload` handler that the
* `media` and `js*` strategies build.
*
* @see https://github.com/angular/angular-cli/issues/33342
*/
var SAFE_MEDIA_RE = /^[\w\s\-(),:.]+$/;
function isSafeMediaValue(media) {
	return SAFE_MEDIA_RE.test(media);
}
function decodePlan(plan) {
	const [, href, size, pool, wraps, rules] = plan;
	const deref = (value) => typeof value === "number" ? pool[value - 1] : value;
	const derefAll = (values) => values.map(deref);
	const wrapChains = wraps.map(derefAll);
	return {
		href: href === 0 ? void 0 : href,
		size,
		warnings: [],
		rules: rules.map((rule) => decodeRule(rule, deref, derefAll, wrapChains))
	};
}
function decodeRule(compact, deref, derefAll, wrapChains) {
	const flags = compact[0];
	let cursor = 1;
	const next = () => compact[cursor++];
	const rule = {};
	if (flags & 1) {
		const selectors = next();
		rule.selectors = Array.isArray(selectors) ? derefAll(selectors) : [deref(selectors)];
		rule.body = deref(next());
	}
	if (flags & 2) rule.css = deref(next());
	if (flags & 4) rule.match = next().map((condition, index) => decodeMatch(condition, rule.selectors?.[index], deref, derefAll));
	if (flags & 8) rule.always = true;
	if (flags & 16) rule.wrap = wrapChains[next()];
	if (flags & 32) rule.fontsUsed = derefAll(next());
	if (flags & 64) rule.keyframesUsed = derefAll(next());
	if (flags & 128) {
		const [family, src, ranges] = next();
		rule.fontFace = {
			family: family === 0 ? void 0 : deref(family),
			src: src === 0 ? void 0 : deref(src),
			ranges
		};
	}
	if (flags & 256) rule.keyframes = deref(next());
	return rule;
}
function decodeMatch(compact, selector, deref, derefAll) {
	if (compact === 0) return true;
	if (compact === 1) return { classes: [selector.slice(1)] };
	if (compact === 2) return { ids: [selector.slice(1)] };
	if (compact === 3) return { tags: [selector.toLowerCase()] };
	if (typeof compact[0] === "string") return { program: decodeProgram(compact, deref, derefAll) };
	const [classes, ids, tags, attrs] = compact;
	const condition = {};
	if (classes !== 0) condition.classes = derefAll(classes);
	if (ids !== 0) condition.ids = derefAll(ids);
	if (tags !== 0) condition.tags = derefAll(tags);
	if (attrs !== 0) condition.attrs = derefAll(attrs);
	return condition;
}
function decodeProgram(compact, deref, derefAll) {
	const [combinators, compounds] = compact;
	return {
		combinators: [...combinators],
		compounds: compounds.map((compound) => decodeCompound(compound, deref, derefAll))
	};
}
function decodeCompound(compact, deref, derefAll) {
	if (!Array.isArray(compact)) return { classes: [deref(compact)] };
	const [tag, classes, ids, attrs] = compact;
	const compound = {};
	if (tag !== 0) compound.tag = deref(tag);
	if (classes !== 0) compound.classes = derefAll(classes);
	if (ids !== 0) compound.ids = derefAll(ids);
	if (attrs !== 0) compound.attrs = attrs.map(([name, action, value, ignoreCase]) => {
		const test = {
			name: deref(name),
			action: ATTR_ACTIONS[action]
		};
		if (value !== 0) test.value = deref(value);
		if (ignoreCase) test.ignoreCase = true;
		return test;
	});
	return compound;
}
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
	"area",
	"base",
	"br",
	"col",
	"embed",
	"hr",
	"img",
	"input",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
var RAW_TEXT_ELEMENTS = /* @__PURE__ */ new Set([
	"script",
	"style",
	"textarea",
	"title",
	"xmp"
]);
/** Raw text elements whose contents are still rendered as page text */
var RENDERED_RAW_TEXT_ELEMENTS = /* @__PURE__ */ new Set(["textarea", "xmp"]);
/** Attributes whose value can be rendered as text */
var RENDERED_ATTRS = /* @__PURE__ */ new Set([
	"alt",
	"label",
	"placeholder",
	"title",
	"value"
]);
var TAG_START_RE = /[a-z]/;
var TAG_NAME_END_RE = /[\s/>]/;
var ATTR_NAME_END_RE = /[\s=/>]/;
var WHITESPACE_RE = /\s/;
var CLASS_SPLIT_RE = /\s+/;
function createTokens() {
	return {
		tags: /* @__PURE__ */ new Set(),
		classes: /* @__PURE__ */ new Set(),
		ids: /* @__PURE__ */ new Set(),
		attrs: /* @__PURE__ */ new Set()
	};
}
function preparePrograms(programs) {
	const prepared = {
		programs,
		flat: [],
		byClass: /* @__PURE__ */ new Map(),
		byId: /* @__PURE__ */ new Map(),
		byTag: /* @__PURE__ */ new Map(),
		byAttr: /* @__PURE__ */ new Map(),
		universal: []
	};
	for (let p = 0; p < programs.length; p++) {
		const { compounds, combinators } = programs[p];
		const start = prepared.flat.length;
		for (let c = 0; c < compounds.length; c++) prepared.flat.push({
			test: compounds[c],
			edge: combinators[c] ?? null,
			last: c === compounds.length - 1,
			program: p
		});
		const first = compounds[0];
		if (first.classes?.length) pushIndex(prepared.byClass, first.classes[0], start);
		else if (first.ids?.length) pushIndex(prepared.byId, first.ids[0], start);
		else if (first.tag) pushIndex(prepared.byTag, first.tag, start);
		else if (first.attrs?.length) pushIndex(prepared.byAttr, first.attrs[0].name, start);
		else prepared.universal.push(start);
	}
	return prepared;
}
function pushIndex(map, key, position) {
	const list = map.get(key);
	if (list) list.push(position);
	else map.set(key, [position]);
}
function getAttrValue(element, name) {
	for (const [attrName, value] of element.attrs) if (attrName === name) return value ?? "";
}
function matchesAttr(test, element) {
	let value = getAttrValue(element, test.name);
	if (value === void 0) return false;
	if (test.action === "exists") return true;
	let expected = test.value ?? "";
	if (test.ignoreCase) {
		value = value.toLowerCase();
		expected = expected.toLowerCase();
	}
	switch (test.action) {
		case "equals": return value === expected;
		case "element": return expected.length > 0 && value.split(CLASS_SPLIT_RE).includes(expected);
		case "start": return expected.length > 0 && value.startsWith(expected);
		case "end": return expected.length > 0 && value.endsWith(expected);
		case "any": return expected.length > 0 && value.includes(expected);
		case "hyphen": return value === expected || value.startsWith(`${expected}-`);
	}
	return false;
}
function matchesCompound(test, element) {
	if (test.tag && test.tag !== element.tag) return false;
	if (test.ids) {
		for (const id of test.ids) if (element.id !== id) return false;
	}
	if (test.classes) {
		for (const cls of test.classes) if (!element.classes.includes(cls)) return false;
	}
	if (test.attrs) {
		for (const attr of test.attrs) if (!matchesAttr(attr, element)) return false;
	}
	return true;
}
function createFrame(container, desc, child) {
	return {
		container,
		desc,
		child,
		adjacent: [],
		sibling: []
	};
}
function scanHtml(html, programs, options = {}) {
	const collectText = options.chars !== false;
	const lower = html.toLowerCase();
	const all = createTokens();
	const contained = createTokens();
	const text = createTextCodepoints();
	const collectChars = collectText ? (run) => addTextCodepoints(run, text) : () => {};
	const prepared = programs && programs.length > 0 ? preparePrograms(programs) : void 0;
	const matchedAll = prepared ? Array.from({ length: prepared.programs.length }).fill(false) : [];
	const matchedContained = prepared ? Array.from({ length: prepared.programs.length }).fill(false) : [];
	const candidateSet = /* @__PURE__ */ new Set();
	let containerFound = false;
	const frames = [createFrame(false, [], [])];
	let i = 0;
	const length = html.length;
	while (i < length) {
		const textStart = i;
		i = lower.indexOf("<", i);
		if (i === -1) {
			collectChars(html.slice(textStart));
			break;
		}
		if (i > textStart) collectChars(html.slice(textStart, i));
		const next = lower[i + 1];
		if (next === "/") {
			const end = lower.indexOf(">", i);
			if (end === -1) break;
			if (frames.length > 1) frames.pop();
			i = end + 1;
			continue;
		}
		if (next === "!") {
			if (lower.startsWith("<!--", i)) {
				const end = lower.indexOf("-->", i + 4);
				i = end === -1 ? length : end + 3;
			} else {
				const end = lower.indexOf(">", i);
				i = end === -1 ? length : end + 1;
			}
			continue;
		}
		if (next === "?") {
			const end = lower.indexOf(">", i);
			i = end === -1 ? length : end + 1;
			continue;
		}
		if (!next || !TAG_START_RE.test(next)) {
			i++;
			continue;
		}
		let pos = i + 1;
		while (pos < length && !TAG_NAME_END_RE.test(lower[pos])) pos++;
		const tagName = lower.slice(i + 1, pos);
		const element = {
			tag: tagName,
			id: null,
			classes: [],
			attrs: []
		};
		let isContainer = false;
		let selfClosing = false;
		while (pos < length) {
			while (pos < length && WHITESPACE_RE.test(lower[pos])) pos++;
			if (lower[pos] === "/") {
				selfClosing = true;
				pos++;
				continue;
			}
			if (lower[pos] === ">" || pos >= length) break;
			selfClosing = false;
			const nameStart = pos;
			while (pos < length && !ATTR_NAME_END_RE.test(lower[pos])) pos++;
			const attrName = lower.slice(nameStart, pos);
			let value = null;
			while (pos < length && WHITESPACE_RE.test(lower[pos])) pos++;
			if (lower[pos] === "=") {
				pos++;
				while (pos < length && WHITESPACE_RE.test(lower[pos])) pos++;
				const quote = lower[pos];
				if (quote === "\"" || quote === "'") {
					const valueEnd = lower.indexOf(quote, pos + 1);
					value = html.slice(pos + 1, valueEnd === -1 ? length : valueEnd);
					pos = valueEnd === -1 ? length : valueEnd + 1;
				} else {
					const valueStart = pos;
					while (pos < length && !WHITESPACE_RE.test(lower[pos]) && lower[pos] !== ">") pos++;
					value = html.slice(valueStart, pos);
				}
			}
			if (attrName) {
				element.attrs.push([attrName, value]);
				if (value !== null && RENDERED_ATTRS.has(attrName)) collectChars(value);
				if (attrName === "data-beasties-container") {
					isContainer = true;
					containerFound = true;
				} else if (attrName === "class" && value !== null) {
					for (const cls of value.trim().split(CLASS_SPLIT_RE)) if (cls) element.classes.push(cls);
				} else if (attrName === "id" && value !== null) element.id = value.trim() || null;
			}
		}
		const frame = frames[frames.length - 1];
		const insideContainer = frame.container || isContainer;
		collectElement(all, element);
		if (insideContainer) collectElement(contained, element);
		let descOut;
		let childOut;
		if (prepared) {
			const strictlyInside = frame.container;
			candidateSet.clear();
			for (const list of [
				frame.desc,
				frame.child,
				frame.adjacent,
				frame.sibling
			]) for (const encoded of list) candidateSet.add(encoded);
			addAnchoredStarts(candidateSet, prepared, element);
			const adjacentOut = [];
			frame.adjacent = adjacentOut;
			for (const encoded of candidateSet) {
				const position = encoded >> 1;
				const compound = prepared.flat[position];
				if (!matchesCompound(compound.test, element)) continue;
				const chainContained = (encoded & 1) === 1 && strictlyInside;
				if (compound.last) {
					matchedAll[compound.program] = true;
					if (chainContained) matchedContained[compound.program] = true;
					continue;
				}
				const nextEncoded = position + 1 << 1 | (chainContained ? 1 : 0);
				switch (compound.edge) {
					case " ":
						(descOut ??= []).push(nextEncoded);
						break;
					case ">":
						(childOut ??= []).push(nextEncoded);
						break;
					case "+":
						adjacentOut.push(nextEncoded);
						break;
					case "~": frame.sibling.push(nextEncoded);
				}
			}
		} else frame.adjacent = [];
		const isVoid = VOID_ELEMENTS.has(tagName) || selfClosing;
		const isRawText = RAW_TEXT_ELEMENTS.has(tagName);
		if (!isVoid && !isRawText) frames.push(createFrame(insideContainer, descOut ? frame.desc.concat(descOut) : frame.desc, childOut ?? []));
		i = lower[pos] === ">" ? pos + 1 : pos;
		if (!isVoid && isRawText) {
			const close = lower.indexOf(`</${tagName}`, i);
			if (close === -1) break;
			if (RENDERED_RAW_TEXT_ELEMENTS.has(tagName)) collectChars(html.slice(i, close));
			const end = lower.indexOf(">", close);
			i = end === -1 ? length : end + 1;
		}
	}
	const tokens = containerFound ? contained : all;
	if (collectText) tokens.chars = toCodepointSet(text);
	if (prepared) {
		const matched = containerFound ? matchedContained : matchedAll;
		tokens.matchedPrograms = /* @__PURE__ */ new Map();
		for (let p = 0; p < prepared.programs.length; p++) tokens.matchedPrograms.set(prepared.programs[p], matched[p]);
	}
	return tokens;
}
function collectElement(tokens, element) {
	tokens.tags.add(element.tag);
	if (element.id) tokens.ids.add(element.id);
	for (const cls of element.classes) tokens.classes.add(cls);
	for (const [name] of element.attrs) tokens.attrs.add(name);
}
function addAnchoredStarts(candidates, prepared, element) {
	for (const cls of element.classes) {
		const starts = prepared.byClass.get(cls);
		if (starts) for (const position of starts) candidates.add(position << 1 | 1);
	}
	if (element.id) {
		const starts = prepared.byId.get(element.id);
		if (starts) for (const position of starts) candidates.add(position << 1 | 1);
	}
	const tagStarts = prepared.byTag.get(element.tag);
	if (tagStarts) for (const position of tagStarts) candidates.add(position << 1 | 1);
	for (const [name] of element.attrs) {
		const starts = prepared.byAttr.get(name);
		if (starts) for (const position of starts) candidates.add(position << 1 | 1);
	}
	for (const position of prepared.universal) candidates.add(position << 1 | 1);
}
function matchesCondition(condition, tokens) {
	if (condition === true) return true;
	if (condition.program) {
		const exact = tokens.matchedPrograms?.get(condition.program);
		if (exact !== void 0) return exact;
	}
	if (condition.classes) {
		for (const cls of condition.classes) if (!tokens.classes.has(cls)) return false;
	}
	if (condition.ids) {
		for (const id of condition.ids) if (!tokens.ids.has(id)) return false;
	}
	if (condition.tags) {
		for (const tag of condition.tags) if (!tokens.tags.has(tag)) return false;
	}
	if (condition.attrs) {
		for (const attr of condition.attrs) if (!tokens.attrs.has(attr)) return false;
	}
	return true;
}
/** Collect structural programs referenced by the compiled sheets */
function collectPrograms(sheets) {
	const programs = [];
	for (const sheet of sheets) for (const rule of sheet.rules) {
		if (!rule.match) continue;
		for (const condition of rule.match) if (condition !== true && condition.program) programs.push(condition.program);
	}
	return programs;
}
/**
* Evaluate a compiled sheet against scanned document tokens, producing the
* critical CSS subset.
*/
function renderCriticalCss(sheet, tokens, options = {}) {
	let keyframesMode = options.keyframes ?? "critical";
	if (keyframesMode === true) keyframesMode = "all";
	if (keyframesMode === false) keyframesMode = "none";
	const shouldPreloadFonts = options.fonts === true || options.preloadFonts === true;
	const shouldInlineFonts = options.fonts !== false && options.inlineFonts === true;
	const rules = sheet.rules;
	const texts = Array.from({ length: rules.length }).fill(null);
	const inverseTexts = options.inverse ? Array.from({ length: rules.length }).fill(null) : void 0;
	const criticalFonts = /* @__PURE__ */ new Set();
	const criticalKeyframeNames = /* @__PURE__ */ new Set();
	const fontPreloads = [];
	const preloadedFonts = /* @__PURE__ */ new Set();
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		if (rule.fontFace) continue;
		if (rule.keyframes !== void 0) continue;
		const text = ruleText(rule, tokens);
		if (inverseTexts) inverseTexts[i] = ruleText(rule, tokens, true);
		if (text === null) continue;
		texts[i] = text;
		if (rule.fontsUsed) for (const family of rule.fontsUsed) criticalFonts.add(normalizeFontFamily(family));
		if (rule.keyframesUsed) for (const name of rule.keyframesUsed) criticalKeyframeNames.add(name);
	}
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		if (rule.keyframes !== void 0) {
			if (keyframesMode !== "none" && (keyframesMode === "all" || criticalKeyframeNames.has(rule.keyframes))) texts[i] = rule.css ?? "";
			else if (inverseTexts) inverseTexts[i] = rule.css ?? "";
			continue;
		}
		if (rule.fontFace) {
			const { family, src, ranges } = rule.fontFace;
			const used = !!family && criticalFonts.has(normalizeFontFamily(family)) && unicodeRangeUsed(ranges, tokens.chars);
			if (used && src && shouldPreloadFonts && !preloadedFonts.has(src)) {
				preloadedFonts.add(src);
				fontPreloads.push(src.trim());
			}
			if (shouldInlineFonts && used) texts[i] = rule.css ?? "";
			else if (inverseTexts) inverseTexts[i] = rule.css ?? "";
		}
	}
	const result = {
		css: assemble(texts, rules),
		fontPreloads
	};
	if (inverseTexts) result.inverseCss = assemble(inverseTexts, rules);
	return result;
}
/** Emit every rule in the sheet, as when a stylesheet is inlined in full */
function renderFullCss(sheet) {
	return assemble(sheet.rules.map(wholeRuleText), sheet.rules);
}
function wholeRuleText(rule) {
	if (rule.css !== void 0) return rule.css;
	return rule.selectors ? rule.selectors.join(",") + rule.body : "";
}
/** Join rule texts, opening and closing at-rule wrappers as needed */
function assemble(texts, rules) {
	const out = [];
	let openWrap = [];
	for (let i = 0; i < texts.length; i++) {
		const text = texts[i];
		if (text == null) continue;
		const wrap = rules[i].wrap ?? [];
		let common = 0;
		while (common < openWrap.length && common < wrap.length && openWrap[common] === wrap[common]) common++;
		for (let j = openWrap.length; j > common; j--) out.push("}");
		for (let j = common; j < wrap.length; j++) out.push(wrap[j]);
		openWrap = wrap;
		out.push(text);
	}
	for (let j = openWrap.length; j > 0; j--) out.push("}");
	return out.join("");
}
/**
* The rule's text as inlined, or `null` when it isn't. With `invert`, returns
* the complement instead: what the external stylesheet still has to provide.
*/
function ruleText(rule, tokens, invert = false) {
	if (rule.always) return invert ? null : wholeRuleText(rule);
	if (!rule.match) return invert ? null : rule.css ?? null;
	const body = rule.body;
	if (rule.selectors && body !== void 0) {
		const kept = rule.selectors.filter((_, index) => matchesCondition(rule.match[index], tokens) !== invert);
		if (kept.length === 0) return null;
		return kept.join(",") + body;
	}
	if (rule.match.some((condition) => matchesCondition(condition, tokens)) !== invert) return rule.css ?? "";
	return null;
}
var DEFAULT_CACHE_SIZE = 100;
/**
* Fingerprint the scanned tokens. Token sets iterate in insertion order,
* which is deterministic for a given document shape; a differently-ordered
* but equal set only costs a cache miss, never a wrong hit.
*/
function fingerprintTokens(tokens) {
	const parts = [];
	for (const set of [
		tokens.tags,
		tokens.classes,
		tokens.ids,
		tokens.attrs
	]) {
		for (const token of set) parts.push(token);
		parts.push("\n");
	}
	if (tokens.chars) parts.push(Array.from(tokens.chars).join(","));
	parts.push("\n");
	if (tokens.matchedPrograms) for (const matched of tokens.matchedPrograms.values()) parts.push(matched ? "1" : "0");
	return parts.join(" ");
}
var CSS_HREF_RE = /\.css(?:[?#]|$)/i;
var LINK_TAG_RE = /<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi;
var REL_STYLESHEET_RE = /\brel\s*=\s*(?:"stylesheet"|'stylesheet'|stylesheet(?=[\s>]))/i;
var REL_PRELOAD_RE = /\brel\s*=\s*(?:"preload"|'preload'|preload(?=[\s>]))/i;
var AS_FONT_RE = /\bas\s*=\s*(?:"font"|'font'|font(?=[\s>]))/i;
var CSS_LOADER_PREAMBLE = "function $loadcss(u,m,l){(l=document.createElement('link')).rel='stylesheet';l.href=u;document.head.appendChild(l)}";
var CSS_LOADER_LAZY_PREAMBLE = CSS_LOADER_PREAMBLE.replace("l.href", "l.media='print';l.onload=function(){l.media=m};l.href");
var CSS_LOADER_INVOKE = "$loadcss(document.currentScript.dataset.href,document.currentScript.dataset.media)";
var DEFERRED_MEDIA_ATTR = "data-beasties-media";
var DEFERRED_MEDIA_SCRIPT = `document.querySelectorAll('link[${DEFERRED_MEDIA_ATTR}]').forEach(function(l){l.media=l.getAttribute('${DEFERRED_MEDIA_ATTR}');l.removeAttribute('${DEFERRED_MEDIA_ATTR}')})`;
function attrValueRegex(name) {
	return new RegExp(`(^|\\s)(${name})\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, "i");
}
function attrNameRegex(name) {
	return new RegExp(`(^|\\s)${name}(?=[\\s/>=])`, "i");
}
function escapeAttr(value) {
	return value.replace(/"/g, "&quot;");
}
/** Get a (raw, un-decoded) attribute value from a tag string */
function getAttr(tag, name) {
	const match = tag.match(attrValueRegex(name));
	if (match) {
		const raw = match[3];
		if (raw[0] === "\"" || raw[0] === "'") return raw.slice(1, -1);
		return raw;
	}
	return attrNameRegex(name).test(tag) ? "" : null;
}
/** Set an attribute in a tag string, replacing in place or appending before `>` */
function setAttr(tag, name, value) {
	const valueRe = attrValueRegex(name);
	if (valueRe.test(tag)) return tag.replace(valueRe, `$1$2="${escapeAttr(value)}"`);
	const nameRe = attrNameRegex(name);
	if (nameRe.test(tag)) return tag.replace(nameRe, `$1${name}="${escapeAttr(value)}"`);
	if (!tag.endsWith(">")) return tag;
	let cut = tag.length - 1;
	if (tag[cut - 1] === "/") cut--;
	while (cut > 0 && WHITESPACE_RE.test(tag[cut - 1])) cut--;
	return `${tag.slice(0, cut)} ${name}="${escapeAttr(value)}"${tag.slice(cut)}`;
}
/** Remove an attribute from a tag string */
function removeAttr(tag, name) {
	return tag.replace(attrValueRegex(name), "").replace(attrNameRegex(name), "");
}
function toPreload(tag) {
	return setAttr(setAttr(tag, "rel", "preload"), "as", "style");
}
function normalizeHref(href) {
	const query = href.indexOf("?");
	const hash = href.indexOf("#");
	let end = href.length;
	if (query !== -1) end = query;
	if (hash !== -1 && hash < end) end = hash;
	let start = 0;
	if (href[0] === "." && href[1] === "/") start = 2;
	else if (href[0] === "/") start = 1;
	return href.slice(start, end);
}
function sheetForHref(sheets, href) {
	const normalized = normalizeHref(href);
	return sheets.find((sheet) => {
		if (!sheet.href) return false;
		const sheetHref = normalizeHref(sheet.href);
		return normalized === sheetHref || normalized.endsWith(`/${sheetHref}`);
	});
}
function applyEdits(html, edits) {
	edits.sort((a, b) => a.start - b.start || a.end - b.end);
	let out = "";
	let cursor = 0;
	for (const edit of edits) {
		if (edit.start < cursor) continue;
		out += html.slice(cursor, edit.start) + edit.text;
		cursor = edit.end;
	}
	return out + html.slice(cursor);
}
function createProcessor(plans, options = {}) {
	const sheets = plans.map((plan) => isCompactPlan(plan) ? decodePlan(plan) : plan);
	const programs = collectPrograms(sheets);
	const scanOptions = { chars: sheets.some((sheet) => sheet.rules.some((rule) => rule.fontFace?.ranges)) };
	const cacheSize = options.cache === false ? 0 : typeof options.cache === "object" ? options.cache.maxSize ?? DEFAULT_CACHE_SIZE : DEFAULT_CACHE_SIZE;
	const cache = cacheSize > 0 ? /* @__PURE__ */ new Map() : void 0;
	const renderOptions = {
		...options,
		inverse: !!options.minimumExternalSize
	};
	const fullCssCache = /* @__PURE__ */ new Map();
	function fullCss(sheet) {
		let css = fullCssCache.get(sheet);
		if (css === void 0) {
			css = renderFullCss(sheet);
			fullCssCache.set(sheet, css);
		}
		return css;
	}
	/**
	* Whether the whole stylesheet should be inlined, making its `<link>`
	* unnecessary: either it is small enough outright, or what would be left for
	* it to serve is small enough that the request isn't worth saving.
	*/
	function inlineInFull(sheet, critical) {
		if (options.inlineThreshold && sheet.size < options.inlineThreshold) return true;
		if (options.minimumExternalSize && critical.inverseCss !== void 0) return critical.inverseCss.length < options.minimumExternalSize;
		return false;
	}
	function renderSheet(sheet, tokens, key) {
		if (!cache || key === void 0) return renderCriticalCss(sheet, tokens, renderOptions);
		let bySheet = cache.get(key);
		if (bySheet) {
			cache.delete(key);
			cache.set(key, bySheet);
		} else {
			bySheet = /* @__PURE__ */ new Map();
			cache.set(key, bySheet);
			if (cache.size > cacheSize) cache.delete(cache.keys().next().value);
		}
		let result = bySheet.get(sheet);
		if (!result) {
			result = renderCriticalCss(sheet, tokens, renderOptions);
			bySheet.set(sheet, result);
		}
		return result;
	}
	function skippedSheets(html) {
		let skipped;
		for (const match of html.matchAll(LINK_TAG_RE)) {
			const tag = match[0];
			if (!REL_STYLESHEET_RE.test(tag) || getAttr(tag, "data-beasties-skip") === null) continue;
			const href = getAttr(tag, "href");
			const sheet = href ? sheetForHref(sheets, href) : void 0;
			if (sheet) (skipped ??= /* @__PURE__ */ new Set()).add(sheet);
		}
		return skipped;
	}
	function extract(html) {
		const tokens = scanHtml(html, programs, scanOptions);
		const key = cache ? fingerprintTokens(tokens) : void 0;
		const skipped = skippedSheets(html);
		const css = [];
		const fontPreloads = [];
		for (const sheet of sheets) {
			if (skipped?.has(sheet)) continue;
			const result = renderSheet(sheet, tokens, key);
			css.push(inlineInFull(sheet, result) ? fullCss(sheet) : result.css);
			fontPreloads.push(...result.fontPreloads);
		}
		return {
			css: css.join(""),
			fontPreloads
		};
	}
	function process(html, processOptions) {
		const tokens = scanHtml(html, programs, scanOptions);
		const key = cache ? fingerprintTokens(tokens) : void 0;
		const strategy = options.preload;
		const nonce = processOptions?.nonce ?? options.nonce;
		const nonceAttr = nonce ? ` nonce="${escapeAttr(nonce)}"` : "";
		let firstLinkIndex = -1;
		const edits = [];
		const bodyAppends = [];
		let deferredMedia = false;
		const criticalParts = [];
		const fontPreloads = /* @__PURE__ */ new Set();
		const existingFontPreloads = /* @__PURE__ */ new Set();
		let isFirstSheet = true;
		for (const match of html.matchAll(LINK_TAG_RE)) {
			const tag = match[0];
			if (!REL_STYLESHEET_RE.test(tag)) {
				if (REL_PRELOAD_RE.test(tag) && AS_FONT_RE.test(tag)) {
					const preloaded = getAttr(tag, "href");
					if (preloaded) existingFontPreloads.add(preloaded);
				}
				continue;
			}
			if (getAttr(tag, "data-beasties-skip") !== null) continue;
			const href = getAttr(tag, "href");
			if (!href) continue;
			const sheet = sheetForHref(sheets, href);
			if (!sheet) {
				if (CSS_HREF_RE.test(href)) options.logger?.warn?.(`Unable to locate stylesheet: ${href}`);
				continue;
			}
			const result = renderSheet(sheet, tokens, key);
			const wholeSheet = inlineInFull(sheet, result);
			criticalParts.push(wholeSheet ? fullCss(sheet) : result.css);
			for (const preload of result.fontPreloads) fontPreloads.add(preload);
			const start = match.index;
			const end = start + tag.length;
			if (firstLinkIndex === -1) firstLinkIndex = start;
			if (wholeSheet) {
				edits.push({
					start,
					end,
					text: ""
				});
				continue;
			}
			if (strategy === false) continue;
			const rawMedia = getAttr(tag, "media");
			const media = rawMedia && isSafeMediaValue(rawMedia) ? rawMedia : void 0;
			let newTag = tag;
			let noscriptFallback = false;
			let scriptAfter;
			if (strategy === "body") {
				bodyAppends.push(tag);
				newTag = "";
			} else if (strategy === "media-script") {
				newTag = setAttr(setAttr(tag, "media", "print"), DEFERRED_MEDIA_ATTR, media || "all");
				deferredMedia = true;
				noscriptFallback = true;
			} else if (strategy === "media") {
				newTag = setAttr(setAttr(tag, "media", "print"), "onload", `this.media='${media || "all"}'`);
				noscriptFallback = true;
			} else if (strategy === "swap") {
				newTag = toPreload(setAttr(tag, "onload", "this.rel='stylesheet'"));
				noscriptFallback = true;
			} else if (strategy === "swap-high") {
				newTag = setAttr(setAttr(setAttr(setAttr(tag, "rel", "alternate stylesheet preload"), "title", "styles"), "as", "style"), "onload", "this.title='';this.rel='stylesheet'");
				noscriptFallback = true;
			} else if (strategy === "swap-low") {
				newTag = setAttr(setAttr(setAttr(tag, "rel", "alternate stylesheet"), "title", "styles"), "onload", "this.title='';this.rel='stylesheet'");
				noscriptFallback = true;
			} else if (strategy === "js" || strategy === "js-lazy") {
				const preamble = isFirstSheet ? strategy === "js-lazy" ? CSS_LOADER_LAZY_PREAMBLE : CSS_LOADER_PREAMBLE : "";
				scriptAfter = `<script${nonceAttr} data-href="${escapeAttr(href)}" data-media="${escapeAttr(media || "all")}">${preamble}${CSS_LOADER_INVOKE}<\/script>`;
				newTag = toPreload(tag);
				noscriptFallback = true;
			} else {
				bodyAppends.push(removeAttr(tag, "id"));
				newTag = toPreload(tag);
			}
			if (options.noscriptFallback !== false && noscriptFallback && !href.includes("</noscript>")) edits.push({
				start: end,
				end,
				text: `<noscript>${removeAttr(tag, "id")}</noscript>`
			});
			if (scriptAfter) edits.push({
				start: end,
				end,
				text: scriptAfter
			});
			if (newTag !== tag) edits.push({
				start,
				end,
				text: newTag
			});
			isFirstSheet = false;
		}
		for (const preloaded of existingFontPreloads) fontPreloads.delete(preloaded);
		const critical = criticalParts.join("");
		if (!critical && fontPreloads.size === 0 && edits.length === 0 && bodyAppends.length === 0) return html;
		const headInsertions = [];
		for (const preload of fontPreloads) headInsertions.push(`<link rel="preload" as="font" crossorigin="anonymous" href="${escapeAttr(preload)}">`);
		if (critical) headInsertions.push(`<style${nonceAttr}>${critical}</style>`);
		if (deferredMedia) bodyAppends.push(`<script${nonceAttr}>${DEFERRED_MEDIA_SCRIPT}<\/script>`);
		if (headInsertions.length > 0) {
			let insertAt = firstLinkIndex;
			if (insertAt === -1) insertAt = html.match(/<\/head\s*>/i)?.index ?? 0;
			edits.push({
				start: insertAt,
				end: insertAt,
				text: headInsertions.join("")
			});
		}
		if (bodyAppends.length > 0) {
			const bodyClose = lastIndexOfRe(html, /<\/body\s*>/gi);
			const insertAt = bodyClose === -1 ? html.length : bodyClose;
			edits.push({
				start: insertAt,
				end: insertAt,
				text: bodyAppends.join("")
			});
		}
		return applyEdits(html, edits);
	}
	return {
		process,
		extract
	};
}
function lastIndexOfRe(html, re) {
	let last = -1;
	for (const match of html.matchAll(re)) last = match.index;
	return last;
}
// node_modules/@angular/ssr/fesm2022/ssr.mjs
var ServerAssets = class {
	manifest;
	constructor(manifest) {
		this.manifest = manifest;
	}
	getServerAsset(path) {
		const asset = this.manifest.assets[path];
		if (!asset) throw new Error(`Server asset '${path}' does not exist.`);
		return asset;
	}
	hasServerAsset(path) {
		return !!this.manifest.assets[path];
	}
	getIndexServerHtml() {
		return this.getServerAsset("index.server.html");
	}
};
var IGNORED_LOGS = /* @__PURE__ */ new Set(["Angular is running in development mode."]);
var Console = class extends Console$1 {
	log(message) {
		if (!IGNORED_LOGS.has(message)) super.log(message);
	}
};
var angularAppManifest;
function setAngularAppManifest(manifest) {
	angularAppManifest = manifest;
}
function getAngularAppManifest() {
	if (!angularAppManifest) throw new Error("Angular app manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.");
	return angularAppManifest;
}
var angularAppEngineManifest;
function setAngularAppEngineManifest(manifest) {
	angularAppEngineManifest = manifest;
}
function getAngularAppEngineManifest() {
	if (!angularAppEngineManifest) throw new Error("Angular app engine manifest is not set. Please ensure you are using the '@angular/build:application' builder to build your server application.");
	return angularAppEngineManifest;
}
function stripTrailingSlash(url) {
	return url.length > 1 && url.at(-1) === "/" ? url.slice(0, -1) : url;
}
function stripLeadingSlash(url) {
	return url.length > 1 && url[0] === "/" ? url.slice(1) : url;
}
function addLeadingSlash(url) {
	return url[0] === "/" ? url : `/${url}`;
}
function addTrailingSlash(url) {
	return url.at(-1) === "/" ? url : `${url}/`;
}
function joinUrlParts(...parts) {
	const normalizedParts = [];
	let suffix = "";
	let lastIndex = parts.length - 1;
	while (lastIndex >= 0 && parts[lastIndex] === "") lastIndex--;
	for (let i = 0; i <= lastIndex; i++) {
		const part = parts[i];
		if (part === "") continue;
		let start = 0;
		let end = part.length;
		if (i === lastIndex) {
			const queryIndex = part.indexOf("?");
			const hashIndex = part.indexOf("#");
			const suffixIndex = queryIndex === -1 ? hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
			if (suffixIndex !== -1) {
				suffix = part.slice(suffixIndex);
				end = suffixIndex;
			}
		}
		while (start < end && part[start] === "/") start++;
		while (end > start && part[end - 1] === "/") end--;
		if (start < end) normalizedParts.push(part.slice(start, end));
	}
	return addLeadingSlash(normalizedParts.join("/")) + suffix;
}
function stripIndexHtmlFromURL(url) {
	if (url.pathname.endsWith("/index.html")) {
		const modifiedURL = new URL(url);
		modifiedURL.pathname = modifiedURL.pathname.slice(0, -11);
		return modifiedURL;
	}
	return url;
}
var urlSerializer;
function buildUrlWithParams(toUrl, fromPath, fromSearch) {
	if (toUrl[0] !== "/") throw new Error(`Invalid toUrl: The string must start with a '/'. Received: '${toUrl}'`);
	if (fromPath[0] !== "/") throw new Error(`Invalid fromPath: The string must start with a '/'. Received: '${fromPath}'`);
	if (!toUrl.includes("/*") && (fromSearch === void 0 || !toUrl.includes("=:"))) return toUrl;
	const [path] = toUrl.split(/[?#]/, 1);
	let resolvedPath = path;
	let suffix = toUrl.slice(path.length);
	if (path.includes("/*")) {
		const fromPathParts = fromPath.split("/");
		resolvedPath = joinUrlParts(...path.split("/").map((part, index) => part[0] === "*" ? fromPathParts[part.length === 1 ? index : Number(part.slice(1))] ?? part : part));
	}
	if (fromSearch !== void 0 && suffix[0] === "?" && suffix.includes("=:")) {
		urlSerializer ??= new DefaultUrlSerializer();
		const toTree = urlSerializer.parse(suffix);
		const actualParams = fromSearch ? urlSerializer.parse(fromSearch).queryParams : {};
		for (const [key, value] of Object.entries(toTree.queryParams)) if (typeof value === "string" && value[0] === ":") toTree.queryParams[key] = actualParams[value.slice(1)];
		suffix = urlSerializer.serialize(toTree).slice(1);
	}
	return resolvedPath + suffix;
}
var MATRIX_PARAMS_REGEX = /;[^/]+/g;
function stripMatrixParams(pathname) {
	return pathname.includes(";") ? pathname.replace(MATRIX_PARAMS_REGEX, "") : pathname;
}
async function renderAngular(html, bootstrap, url, platformProviders, serverContext) {
	const urlToRender = stripIndexHtmlFromURL(url);
	const platformRef = platformServer([
		{
			provide: INITIAL_CONFIG,
			useValue: {
				url: urlToRender.href,
				document: html
			}
		},
		{
			provide: SERVER_CONTEXT,
			useValue: serverContext
		},
		{
			provide: Console$1,
			useFactory: () => new Console()
		},
		...platformProviders
	]);
	let redirectTo;
	let hasNavigationError = true;
	try {
		let applicationRef;
		if (isNgModule(bootstrap)) applicationRef = (await platformRef.bootstrapModule(bootstrap)).injector.get(ApplicationRef);
		else applicationRef = await bootstrap({ platformRef });
		await applicationRef.whenStable();
		if (applicationRef.destroyed) return { hasNavigationError: true };
		const envInjector = applicationRef.injector;
		const routerIsProvided = !!envInjector.get(ActivatedRoute, null);
		const router = envInjector.get(Router);
		const lastSuccessfulNavigation = router.lastSuccessfulNavigation();
		if (!routerIsProvided) hasNavigationError = false;
		else if (lastSuccessfulNavigation?.finalUrl) {
			hasNavigationError = false;
			const requestPrefix = envInjector.get(APP_BASE_HREF, null, { optional: true }) ?? getFirstHeaderValue(envInjector.get(REQUEST, null, { optional: true })?.headers.get("X-Forwarded-Prefix"));
			const { pathname, search, hash } = envInjector.get(PlatformLocation);
			const finalUrl = constructSerializedUrl(router, {
				pathname,
				search,
				hash
			}, requestPrefix);
			if (constructSerializedUrl(router, urlToRender, requestPrefix) !== finalUrl) redirectTo = [
				pathname,
				search,
				hash
			].join("");
		}
		return {
			destroy: () => void asyncDestroyPlatform(platformRef),
			hasNavigationError,
			redirectTo,
			content: () => new Promise((resolve, reject) => {
				setTimeout(() => {
					renderInternal(platformRef, applicationRef).then(resolve).catch(reject).finally(() => void asyncDestroyPlatform(platformRef));
				}, 0);
			})
		};
	} catch (error) {
		await asyncDestroyPlatform(platformRef);
		throw error;
	} finally {
		if (hasNavigationError || redirectTo) asyncDestroyPlatform(platformRef);
	}
}
function isNgModule(value) {
	return "ɵmod" in value;
}
function asyncDestroyPlatform(platformRef) {
	if (platformRef.destroyed) return Promise.resolve();
	return new Promise((resolve) => {
		setTimeout(() => {
			if (!platformRef.destroyed) platformRef.destroy();
			resolve();
		}, 0);
	});
}
function constructSerializedUrl(router, url, prefix) {
	const { pathname, hash, search } = url;
	const urlParts = [];
	if (prefix && !addTrailingSlash(pathname).startsWith(addTrailingSlash(prefix))) urlParts.push(joinUrlParts(prefix, pathname));
	else urlParts.push(stripTrailingSlash(pathname));
	urlParts.push(search, hash);
	const urlTree = router.parseUrl(urlParts.join(""));
	return router.serializeUrl(urlTree);
}
function promiseWithAbort(promise, signal, errorMessagePrefix) {
	return new Promise((resolve, reject) => {
		const abortHandler = () => {
			reject(new DOMException(`${errorMessagePrefix} was aborted.\n${signal.reason}`, "AbortError"));
		};
		if (signal.aborted) {
			abortHandler();
			return;
		}
		signal.addEventListener("abort", abortHandler, { once: true });
		promise.then(resolve).catch(reject).finally(() => {
			signal.removeEventListener("abort", abortHandler);
		});
	});
}
var VALID_REDIRECT_RESPONSE_CODES = /* @__PURE__ */ new Set([
	301,
	302,
	303,
	307,
	308
]);
function isValidRedirectResponseCode(code) {
	return VALID_REDIRECT_RESPONSE_CODES.has(code);
}
function createRedirectResponse(location, status = 302, headers) {
	if (ngDevMode && !isValidRedirectResponseCode(status)) throw new Error(`Invalid redirect status code: ${status}. Please use one of the following redirect response codes: ${[...VALID_REDIRECT_RESPONSE_CODES.values()].join(", ")}.`);
	const resHeaders = headers instanceof Headers ? headers : new Headers(headers);
	if (ngDevMode && resHeaders.has("location")) console.warn(`Location header "${resHeaders.get("location")}" will be ignored and set to "${location}".`);
	const varyArray = resHeaders.get("Vary")?.split(",") ?? [];
	const varySet = /* @__PURE__ */ new Set(["X-Forwarded-Prefix"]);
	for (const vary of varyArray) {
		const value = vary.trim();
		if (value) varySet.add(value);
	}
	resHeaders.set("Vary", [...varySet].join(", "));
	resHeaders.set("Location", location);
	return new Response(null, {
		status,
		headers: resHeaders
	});
}
var APP_SHELL_ROUTE = "ng-app-shell";
var ServerRenderingFeatureKind;
(function(ServerRenderingFeatureKind) {
	ServerRenderingFeatureKind[ServerRenderingFeatureKind["AppShell"] = 0] = "AppShell";
	ServerRenderingFeatureKind[ServerRenderingFeatureKind["ServerRoutes"] = 1] = "ServerRoutes";
})(ServerRenderingFeatureKind || (ServerRenderingFeatureKind = {}));
var RenderMode;
(function(RenderMode) {
	RenderMode[RenderMode["Server"] = 0] = "Server";
	RenderMode[RenderMode["Client"] = 1] = "Client";
	RenderMode[RenderMode["Prerender"] = 2] = "Prerender";
})(RenderMode || (RenderMode = {}));
var PrerenderFallback;
(function(PrerenderFallback) {
	PrerenderFallback[PrerenderFallback["Server"] = 0] = "Server";
	PrerenderFallback[PrerenderFallback["Client"] = 1] = "Client";
	PrerenderFallback[PrerenderFallback["None"] = 2] = "None";
})(PrerenderFallback || (PrerenderFallback = {}));
var SERVER_ROUTES_CONFIG = new InjectionToken("SERVER_ROUTES_CONFIG");
function withRoutes(routes) {
	const config = { routes };
	return {
		ɵkind: ServerRenderingFeatureKind.ServerRoutes,
		ɵproviders: [{
			provide: SERVER_ROUTES_CONFIG,
			useValue: config
		}]
	};
}
function withAppShell(component) {
	const routeConfig = { path: APP_SHELL_ROUTE };
	if ("ɵcmp" in component) routeConfig.component = component;
	else routeConfig.loadComponent = component;
	return {
		ɵkind: ServerRenderingFeatureKind.AppShell,
		ɵproviders: [{
			provide: ROUTES,
			useValue: routeConfig,
			multi: true
		}, provideEnvironmentInitializer(() => {
			const config = inject(SERVER_ROUTES_CONFIG);
			config.appShellRoute = APP_SHELL_ROUTE;
		})]
	};
}
function provideServerRendering(...args) {
	let options;
	let features;
	if (hasOptions(args)) {
		const [first, ...rest] = args;
		options = first;
		features = rest;
	} else features = args;
	const providers = [provideServerRendering$1(options)];
	let hasAppShell = false;
	let hasServerRoutes = false;
	for (const { ɵkind, ɵproviders } of features) {
		hasAppShell ||= ɵkind === ServerRenderingFeatureKind.AppShell;
		hasServerRoutes ||= ɵkind === ServerRenderingFeatureKind.ServerRoutes;
		providers.push(...ɵproviders);
	}
	if (!hasServerRoutes && hasAppShell) throw new Error("Configuration error: found 'withAppShell()' without 'withRoutes()' in the same call to 'provideServerRendering()'. The 'withAppShell()' function requires 'withRoutes()' to be used.");
	return makeEnvironmentProviders(providers);
}
function hasOptions(args) {
	const value = args[0];
	return !!value && typeof value === "object" && !("ɵkind" in value);
}
var RouteTree = class RouteTree {
	root = this.createEmptyRouteTreeNode();
	insert(route, metadata) {
		let node = this.root;
		const segments = this.getPathSegments(route);
		const normalizedSegments = [];
		for (const segment of segments) {
			const normalizedSegment = segment[0] === ":" ? "*" : segment;
			let childNode = node.children.get(normalizedSegment);
			if (!childNode) {
				childNode = this.createEmptyRouteTreeNode();
				node.children.set(normalizedSegment, childNode);
			}
			node = childNode;
			normalizedSegments.push(normalizedSegment);
		}
		node.metadata = {
			...metadata,
			route: addLeadingSlash(normalizedSegments.join("/"))
		};
	}
	match(route) {
		const segments = this.getPathSegments(route);
		return this.traverseBySegments(segments)?.metadata;
	}
	toObject() {
		return Array.from(this.traverse());
	}
	static fromObject(value) {
		const tree = new RouteTree();
		for (const { route, ...metadata } of value) tree.insert(route, metadata);
		return tree;
	}
	*traverse(node = this.root) {
		if (node.metadata) yield node.metadata;
		for (const childNode of node.children.values()) yield* this.traverse(childNode);
	}
	getPathSegments(route) {
		return route.split("/").filter(Boolean).map(decodeURIComponent);
	}
	traverseBySegments(segments, node = this.root, currentIndex = 0) {
		if (currentIndex >= segments.length) return node.metadata ? node : node.children.get("**");
		if (!node.children.size) return;
		const segment = segments[currentIndex];
		const exactMatch = node.children.get(segment);
		if (exactMatch) {
			const match = this.traverseBySegments(segments, exactMatch, currentIndex + 1);
			if (match) return match;
		}
		const wildcardMatch = node.children.get("*");
		if (wildcardMatch) {
			const match = this.traverseBySegments(segments, wildcardMatch, currentIndex + 1);
			if (match) return match;
		}
		return node.children.get("**");
	}
	createEmptyRouteTreeNode() {
		return { children: /* @__PURE__ */ new Map() };
	}
};
var IS_DISCOVERING_ROUTES = new InjectionToken(typeof ngDevMode === "undefined" || ngDevMode ? "IS_DISCOVERING_ROUTES" : "", {
	providedIn: "platform",
	factory: () => false
});
var MODULE_PRELOAD_MAX = 10;
var CATCH_ALL_REGEXP = /\/(\*\*)$/;
var URL_PARAMETER_REGEXP = /(?<!\\):([^/]+)/;
var URL_PARAMETER_GLOBAL_REGEXP = new RegExp(URL_PARAMETER_REGEXP, "g");
async function* handleRoute(options) {
	try {
		const { metadata, currentRoutePath, parentRoute, baseHref, route, compiler, parentInjector, serverConfigRouteTree, entryPointToBrowserMapping, invokeGetPrerenderParams, includePrerenderFallbackRoutes } = options;
		const { redirectTo, loadChildren: loadChildren$1, loadComponent, children, ɵentryName } = route;
		if (ɵentryName && (loadComponent || loadChildren$1)) appendPreloadToMetadata(ɵentryName, entryPointToBrowserMapping, metadata);
		const parentRoutes = /* @__PURE__ */ new Map();
		if (typeof redirectTo === "string") {
			metadata.redirectTo = resolveRedirectTo(parentRoute, route, redirectTo, (parameter) => {
				return `*${joinUrlParts(baseHref, currentRoutePath).split("/").lastIndexOf(parameter)}`;
			});
			metadata.relativeRedirect = redirectTo[0] !== "/" ? true : void 0;
		}
		if (metadata.renderMode === RenderMode.Prerender) for await (const result of handleSSGRoute(serverConfigRouteTree, route, parentRoute, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes)) if ("error" in result) yield result;
		else parentRoutes.set(result.route, result);
		else if (redirectTo !== void 0 && metadata.status && !isValidRedirectResponseCode(metadata.status)) yield { error: `The '${metadata.status}' status code is not a valid redirect response code. Please use one of the following redirect response codes: ${[...VALID_REDIRECT_RESPONSE_CODES.values()].join(", ")}.` };
		else parentRoutes.set(metadata.route, metadata);
		let childRoutes = children;
		let childInjector = parentInjector;
		if (!childRoutes?.length && loadChildren$1) {
			const routeInjector = route.providers ? createEnvironmentInjector(route.providers, parentInjector.get(EnvironmentInjector), `Route: ${route.path}`) : parentInjector;
			const loadedChildRoutes = await loadChildren(route, compiler, routeInjector);
			if (loadedChildRoutes) {
				childRoutes = loadedChildRoutes.routes;
				childInjector = loadedChildRoutes.injector ?? routeInjector;
			}
		}
		if (!childRoutes?.length) {
			yield* parentRoutes.values();
			return;
		}
		const childResults = [];
		const overriddenParentRoutes = /* @__PURE__ */ new Set();
		const traverseChildRoutes = traverseRoutesConfig({
			...options,
			routes: childRoutes,
			parentInjector: childInjector,
			parentRoute: currentRoutePath,
			parentPreloads: metadata.preload
		});
		for await (const result of traverseChildRoutes) {
			if ("error" in result) {
				childResults.push(result);
				continue;
			}
			if (parentRoutes.has(result.route)) {
				if (!overriddenParentRoutes.has(result.route)) {
					overriddenParentRoutes.add(result.route);
					parentRoutes.set(result.route, result);
				}
			} else childResults.push(result);
		}
		yield* parentRoutes.values();
		yield* childResults;
	} catch (error) {
		yield { error: `Error in handleRoute for '${options.currentRoutePath}': ${error.message}` };
	}
}
async function* traverseRoutesConfig(options) {
	const { routes: routeConfigs, parentPreloads, parentRoute, serverConfigRouteTree } = options;
	for (const route of routeConfigs) {
		const { matcher, path = matcher ? "**" : "" } = route;
		const currentRoutePath = joinUrlParts(parentRoute, path);
		if (matcher && serverConfigRouteTree) {
			const matches = [];
			for (const matchedMetaData of serverConfigRouteTree.traverse()) if (matchedMetaData.route.startsWith(currentRoutePath)) matches.push(matchedMetaData);
			if (!matches.length) {
				const matchedMetaData = serverConfigRouteTree.match(currentRoutePath);
				if (matchedMetaData) matches.push(matchedMetaData);
			}
			for (const matchedMetaData of matches) {
				matchedMetaData.presentInClientRouter = true;
				if (matchedMetaData.renderMode === RenderMode.Prerender) {
					yield { error: `The route '${stripLeadingSlash(currentRoutePath)}' is set for prerendering but has a defined matcher. Routes with matchers cannot use prerendering. Please specify a different 'renderMode'.` };
					continue;
				}
				yield* handleRoute({
					...options,
					currentRoutePath,
					route,
					metadata: {
						...matchedMetaData,
						preload: parentPreloads,
						route: matchedMetaData.route,
						presentInClientRouter: void 0
					}
				});
			}
			if (!matches.length) yield { error: `The route '${stripLeadingSlash(currentRoutePath)}' has a defined matcher but does not match any route in the server routing configuration. Please ensure this route is added to the server routing configuration.` };
			continue;
		}
		let matchedMetaData;
		if (serverConfigRouteTree) {
			matchedMetaData = serverConfigRouteTree.match(currentRoutePath);
			if (!matchedMetaData) {
				yield { error: `The '${stripLeadingSlash(currentRoutePath)}' route does not match any route defined in the server routing configuration. Please ensure this route is added to the server routing configuration.` };
				continue;
			}
			matchedMetaData.presentInClientRouter = true;
		}
		yield* handleRoute({
			...options,
			metadata: {
				renderMode: RenderMode.Prerender,
				...matchedMetaData,
				preload: parentPreloads,
				route: currentRoutePath,
				presentInClientRouter: void 0
			},
			currentRoutePath,
			route
		});
	}
}
function appendPreloadToMetadata(entryName, entryPointToBrowserMapping, metadata) {
	const existingPreloads = metadata.preload ?? [];
	if (!entryPointToBrowserMapping || existingPreloads.length >= MODULE_PRELOAD_MAX) return;
	const preload = entryPointToBrowserMapping[entryName];
	if (!preload?.length) return;
	const combinedPreloads = new Set(existingPreloads);
	for (const href of preload) {
		combinedPreloads.add(href);
		if (combinedPreloads.size === MODULE_PRELOAD_MAX) break;
	}
	metadata.preload = Array.from(combinedPreloads);
}
async function* handleSSGRoute(serverConfigRouteTree, route, parentRoute, metadata, parentInjector, invokeGetPrerenderParams, includePrerenderFallbackRoutes) {
	if (metadata.renderMode !== RenderMode.Prerender) throw new Error(`'handleSSGRoute' was called for a route which rendering mode is not prerender.`);
	const { route: currentRoutePath, fallback, ...meta } = metadata;
	const getPrerenderParams = "getPrerenderParams" in meta ? meta.getPrerenderParams : void 0;
	if ("getPrerenderParams" in meta) delete meta["getPrerenderParams"];
	const isCatchAllRoute = CATCH_ALL_REGEXP.test(currentRoutePath);
	if (isCatchAllRoute && !getPrerenderParams || !isCatchAllRoute && !URL_PARAMETER_REGEXP.test(currentRoutePath)) {
		yield {
			...meta,
			route: currentRoutePath
		};
		return;
	}
	if (invokeGetPrerenderParams) {
		if (!getPrerenderParams) {
			yield { error: `The '${stripLeadingSlash(currentRoutePath)}' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing. Please define 'getPrerenderParams' function for this route in your server routing configuration or specify a different 'renderMode'.` };
			return;
		}
		if (serverConfigRouteTree) {
			const catchAllRoutePath = isCatchAllRoute ? currentRoutePath : joinUrlParts(currentRoutePath, "**");
			const match = serverConfigRouteTree.match(catchAllRoutePath);
			if (match && match.renderMode === RenderMode.Prerender && !("getPrerenderParams" in match)) serverConfigRouteTree.insert(catchAllRoutePath, {
				...match,
				presentInClientRouter: true,
				getPrerenderParams
			});
		}
		const redirectTo = typeof route.redirectTo === "string" ? route.redirectTo : void 0;
		const parameters = await runInInjectionContext(parentInjector, () => getPrerenderParams());
		try {
			for (const params of parameters) {
				const replacer = handlePrerenderParamsReplacement(params, currentRoutePath);
				const routeWithResolvedParams = currentRoutePath.replace(URL_PARAMETER_GLOBAL_REGEXP, replacer).replace(CATCH_ALL_REGEXP, replacer);
				yield {
					...meta,
					route: routeWithResolvedParams,
					redirectTo: redirectTo === void 0 ? void 0 : resolveRedirectTo(parentRoute.replace(URL_PARAMETER_GLOBAL_REGEXP, replacer), route, redirectTo, (parameter) => params[parameter.slice(1)])
				};
			}
		} catch (error) {
			yield { error: `${error.message}` };
			return;
		}
	}
	if (includePrerenderFallbackRoutes && (fallback !== PrerenderFallback.None || !invokeGetPrerenderParams)) yield {
		...meta,
		route: currentRoutePath,
		renderMode: fallback === PrerenderFallback.Client ? RenderMode.Client : RenderMode.Server
	};
}
function handlePrerenderParamsReplacement(params, currentRoutePath) {
	return (match) => {
		const parameterName = match.slice(1);
		const value = params[parameterName];
		if (typeof value !== "string") throw new Error(`The 'getPrerenderParams' function defined for the '${stripLeadingSlash(currentRoutePath)}' route returned a non-string value for parameter '${parameterName}'. Please make sure the 'getPrerenderParams' function returns values for all parameters specified in this route.`);
		return parameterName === "**" ? `/${value}` : value;
	};
}
function resolveRedirectTo(parentRoute, route, redirectTo, resolveParam) {
	if (redirectTo[0] === "/" && (route.matcher || !redirectTo.includes("/:"))) return redirectTo;
	const [path] = redirectTo.split(/[?#]/, 1);
	let resolvedPath = path;
	if (!route.matcher && path.includes(":")) {
		const routeSegments = route.path?.split("/") ?? [];
		resolvedPath = path.split("/").map((segment) => {
			if (segment[0] !== ":") return segment;
			if (!routeSegments.includes(segment)) throw new Error(`Cannot redirect to '${redirectTo}'. Cannot find '${segment}'.`);
			return resolveParam(segment);
		}).join("/");
	}
	return redirectTo[0] === "/" ? resolvedPath + redirectTo.slice(path.length) : joinUrlParts(parentRoute.replace(URL_PARAMETER_GLOBAL_REGEXP, "*"), resolvedPath);
}
function buildServerConfigRouteTree({ routes, appShellRoute }) {
	const serverRoutes = [...routes];
	if (appShellRoute !== void 0) serverRoutes.unshift({
		path: appShellRoute,
		renderMode: RenderMode.Prerender
	});
	const serverConfigRouteTree = new RouteTree();
	const errors = [];
	for (const { path, ...metadata } of serverRoutes) {
		if (path[0] === "/") {
			errors.push(`Invalid '${path}' route configuration: the path cannot start with a slash.`);
			continue;
		}
		if ("getPrerenderParams" in metadata && (path.includes("/*/") || path.endsWith("/*"))) {
			errors.push(`Invalid '${path}' route configuration: 'getPrerenderParams' cannot be used with a '*' route.`);
			continue;
		}
		serverConfigRouteTree.insert(path, metadata);
	}
	return {
		serverConfigRouteTree,
		errors
	};
}
async function getRoutesFromAngularRouterConfig(bootstrap, document, url, invokeGetPrerenderParams = false, includePrerenderFallbackRoutes = true, entryPointToBrowserMapping = void 0) {
	const { protocol, host } = url;
	const platformRef = platformServer([
		{
			provide: INITIAL_CONFIG,
			useValue: {
				document,
				url: `${protocol}//${host}/`
			}
		},
		{
			provide: Console$1,
			useFactory: () => new Console()
		},
		{
			provide: ENABLE_ROOT_COMPONENT_BOOTSTRAP,
			useValue: false
		},
		{
			provide: IS_DISCOVERING_ROUTES,
			useValue: true
		}
	]);
	try {
		let applicationRef;
		if (isNgModule(bootstrap)) applicationRef = (await platformRef.bootstrapModule(bootstrap)).injector.get(ApplicationRef);
		else applicationRef = await bootstrap({ platformRef });
		const injector = applicationRef.injector;
		const router = injector.get(Router);
		router.navigationTransitions.afterPreactivation()?.next?.();
		await applicationRef.whenStable();
		const errors = [];
		const rawBaseHref = injector.get(APP_BASE_HREF, null, { optional: true }) ?? injector.get(PlatformLocation).getBaseHrefFromDOM();
		const { pathname: baseHref } = new URL(rawBaseHref, "http://localhost");
		const compiler = injector.get(Compiler);
		const serverRoutesConfig = injector.get(SERVER_ROUTES_CONFIG, null, { optional: true });
		let serverConfigRouteTree;
		if (serverRoutesConfig) {
			const result = buildServerConfigRouteTree(serverRoutesConfig);
			serverConfigRouteTree = result.serverConfigRouteTree;
			errors.push(...result.errors);
		}
		if (errors.length) return {
			baseHref,
			routes: [],
			errors
		};
		const routesResults = [];
		if (router.config.length) {
			const traverseRoutes = traverseRoutesConfig({
				routes: router.config,
				compiler,
				parentInjector: injector,
				parentRoute: "",
				baseHref,
				serverConfigRouteTree,
				invokeGetPrerenderParams,
				includePrerenderFallbackRoutes,
				entryPointToBrowserMapping
			});
			const seenRoutes = /* @__PURE__ */ new Set();
			for await (const routeMetadata of traverseRoutes) {
				if ("error" in routeMetadata) {
					errors.push(routeMetadata.error);
					continue;
				}
				const routePath = routeMetadata.route;
				if (!seenRoutes.has(routePath)) {
					routesResults.push(routeMetadata);
					seenRoutes.add(routePath);
				}
			}
			await new Promise((resolve) => setTimeout(resolve, 0));
			if (serverConfigRouteTree) for (const { route, presentInClientRouter } of serverConfigRouteTree.traverse()) {
				if (presentInClientRouter || route.endsWith("/**")) continue;
				errors.push(`The '${stripLeadingSlash(route)}' server route does not match any routes defined in the Angular routing configuration (typically provided as a part of the 'provideRouter' call). Please make sure that the mentioned server route is present in the Angular routing configuration.`);
			}
		} else {
			const rootRouteMetadata = serverConfigRouteTree?.match("") ?? {
				route: "",
				renderMode: RenderMode.Prerender
			};
			routesResults.push({
				...rootRouteMetadata,
				route: ""
			});
		}
		return {
			baseHref,
			routes: routesResults,
			errors,
			appShellRoute: serverRoutesConfig?.appShellRoute
		};
	} finally {
		platformRef.destroy();
	}
}
function extractRoutesAndCreateRouteTree(options) {
	const { url, manifest = getAngularAppManifest(), invokeGetPrerenderParams = false, includePrerenderFallbackRoutes = true, signal } = options;
	async function extract() {
		const routeTree = new RouteTree();
		const document = await new ServerAssets(manifest).getIndexServerHtml().text();
		const { baseHref, appShellRoute, routes, errors } = await getRoutesFromAngularRouterConfig(await manifest.bootstrap(), document, url, invokeGetPrerenderParams, includePrerenderFallbackRoutes, manifest.entryPointToBrowserMapping);
		for (const { route, ...metadata } of routes) {
			if (metadata.redirectTo !== void 0) metadata.redirectTo = joinUrlParts(baseHref, metadata.redirectTo);
			for (const [key, value] of Object.entries(metadata)) if (value === void 0) delete metadata[key];
			const fullRoute = joinUrlParts(baseHref, route);
			routeTree.insert(fullRoute, metadata);
		}
		return {
			appShellRoute,
			routeTree,
			errors
		};
	}
	return signal ? promiseWithAbort(extract(), signal, "Routes extraction") : extract();
}
var Hooks = class {
	store = /* @__PURE__ */ new Map();
	async run(name, context) {
		const hooks = this.store.get(name);
		switch (name) {
			case "html:transform:pre": {
				if (!hooks) return context.html;
				const ctx = { ...context };
				for (const hook of hooks) ctx.html = await hook(ctx);
				return ctx.html;
			}
			default: throw new Error(`Running hook "${name}" is not supported.`);
		}
	}
	on(name, handler) {
		const hooks = this.store.get(name);
		if (hooks) hooks.push(handler);
		else this.store.set(name, [handler]);
	}
	has(name) {
		return !!this.store.get(name)?.length;
	}
};
var ServerRouter = class ServerRouter {
	routeTree;
	constructor(routeTree) {
		this.routeTree = routeTree;
	}
	static #extractionPromise;
	static from(manifest, url) {
		if (manifest.routes) {
			const routeTree = RouteTree.fromObject(manifest.routes);
			return Promise.resolve(new ServerRouter(routeTree));
		}
		ServerRouter.#extractionPromise ??= extractRoutesAndCreateRouteTree({
			url,
			manifest
		}).then(({ routeTree, errors }) => {
			if (errors.length > 0) throw new Error("Error(s) occurred while extracting routes:\n" + errors.map((error) => `- ${error}`).join("\n"));
			return new ServerRouter(routeTree);
		}).finally(() => {
			ServerRouter.#extractionPromise = void 0;
		});
		return ServerRouter.#extractionPromise;
	}
	match(url) {
		let { pathname } = stripIndexHtmlFromURL(url);
		pathname = stripMatrixParams(pathname);
		return this.routeTree.match(pathname);
	}
};
var WELL_KNOWN_NON_ANGULAR_URLS = /* @__PURE__ */ new Set(["/favicon.ico", "/.well-known/appspecific/com.chrome.devtools.json"]);
var SERVER_CONTEXT_VALUE = {
	[RenderMode.Prerender]: "ssg",
	[RenderMode.Server]: "ssr",
	[RenderMode.Client]: ""
};
var AngularServerApp = class {
	options;
	allowStaticRouteRender;
	hooks;
	constructor(options = {}) {
		this.options = options;
		this.allowStaticRouteRender = this.options.allowStaticRouteRender ?? false;
		this.hooks = options.hooks ?? new Hooks();
	}
	manifest = getAngularAppManifest();
	assets = new ServerAssets(this.manifest);
	router;
	inlineCriticalCssProcessor;
	boostrap;
	textEncoder = new TextEncoder();
	async handle(request, requestContext) {
		const url = new URL(request.url);
		if (WELL_KNOWN_NON_ANGULAR_URLS.has(url.pathname)) return null;
		this.router ??= await ServerRouter.from(this.manifest, url);
		const matchedRoute = this.router.match(url);
		if (!matchedRoute) return null;
		const { redirectTo, relativeRedirect, status, renderMode, headers } = matchedRoute;
		if (redirectTo !== void 0) {
			const location = joinUrlParts(getFirstHeaderValue(request.headers.get("X-Forwarded-Prefix")) ?? "", buildUrlWithParams(redirectTo, url.pathname, relativeRedirect ? void 0 : url.search));
			return createRedirectResponse(relativeRedirect ? location + url.search : location, status, headers);
		}
		if (renderMode === RenderMode.Prerender) {
			const response = await this.handleServe(request, matchedRoute);
			if (response) return response;
		}
		return promiseWithAbort(this.handleRendering(request, matchedRoute, requestContext), request.signal, `Request for: ${request.url}`);
	}
	async handleServe(request, matchedRoute) {
		const { headers, renderMode } = matchedRoute;
		if (renderMode !== RenderMode.Prerender) return null;
		const { method } = request;
		if (method !== "GET" && method !== "HEAD") return null;
		const assetPath = this.buildServerAssetPathFromRequest(request);
		const { manifest: { locale }, assets } = this;
		if (!assets.hasServerAsset(assetPath)) return null;
		const { text, hash, size } = assets.getServerAsset(assetPath);
		const etag = `"${hash}"`;
		return request.headers.get("if-none-match") === etag ? new Response(void 0, {
			status: 304,
			statusText: "Not Modified"
		}) : new Response(await text(), { headers: {
			"Content-Length": size.toString(),
			"ETag": etag,
			"Content-Type": "text/html;charset=UTF-8",
			...locale !== void 0 ? { "Content-Language": locale } : {},
			...headers
		} });
	}
	async handleRendering(request, matchedRoute, requestContext) {
		const { renderMode, headers, status, preload } = matchedRoute;
		if (!this.allowStaticRouteRender && renderMode === RenderMode.Prerender) return null;
		const url = new URL(request.url);
		const platformProviders = [];
		const { manifest: { bootstrap, locale }, assets } = this;
		const responseInit = {
			status,
			headers: new Headers({
				"Content-Type": "text/html;charset=UTF-8",
				...locale !== void 0 ? { "Content-Language": locale } : {},
				...headers
			})
		};
		if (renderMode === RenderMode.Server) platformProviders.push({
			provide: REQUEST,
			useValue: request
		}, {
			provide: REQUEST_CONTEXT,
			useValue: requestContext
		}, {
			provide: RESPONSE_INIT,
			useValue: responseInit
		});
		else if (renderMode === RenderMode.Client) {
			let html = await this.assets.getServerAsset("index.csr.html").text();
			html = await this.runTransformsOnHtml(html, url, preload);
			return new Response(html, responseInit);
		}
		if (locale !== void 0) platformProviders.push({
			provide: LOCALE_ID,
			useValue: locale
		});
		this.boostrap ??= await bootstrap();
		let html = await assets.getIndexServerHtml().text();
		html = await this.runTransformsOnHtml(html, url, preload);
		const result = await renderAngular(html, this.boostrap, url, platformProviders, SERVER_CONTEXT_VALUE[renderMode]);
		if (result.hasNavigationError) return null;
		if (result.redirectTo) return createRedirectResponse(result.redirectTo, responseInit.status, responseInit.headers);
		if (renderMode === RenderMode.Prerender) {
			const renderedHtml = await result.content();
			const finalHtml = this.inlineCriticalCss(renderedHtml);
			return new Response(finalHtml, responseInit);
		}
		const stream = new ReadableStream({
			start: async (controller) => {
				try {
					let renderedHtml = await result.content();
					renderedHtml = this.inlineCriticalCss(renderedHtml);
					controller.enqueue(this.textEncoder.encode(renderedHtml));
					controller.close();
				} catch (error) {
					result.destroy();
					controller.error(error);
				}
			},
			cancel: () => {
				result.destroy();
			}
		});
		return new Response(stream, responseInit);
	}
	inlineCriticalCss(html) {
		const { criticalCssPlans, nonce } = this.manifest;
		if (!criticalCssPlans?.length) return html;
		try {
			this.inlineCriticalCssProcessor ??= createProcessor([...criticalCssPlans], {
				preload: "media-script",
				nonce,
				preloadFonts: true,
				inlineFonts: true,
				noscriptFallback: true,
				cache: true,
				logger: { warn: console.warn }
			}).process;
			return this.inlineCriticalCssProcessor(html);
		} catch (error) {
			console.error("An error occurred while inlining critical CSS.", error);
			return html;
		}
	}
	buildServerAssetPathFromRequest(request) {
		let { pathname: assetPath } = new URL(request.url);
		try {
			assetPath = decodeURIComponent(assetPath);
		} catch {}
		if (!assetPath.endsWith("/index.html")) assetPath = joinUrlParts(assetPath, "index.html");
		const { baseHref } = this.manifest;
		if (baseHref.length > 1 && assetPath.startsWith(baseHref)) assetPath = assetPath.slice(baseHref.length);
		return stripLeadingSlash(assetPath);
	}
	async runTransformsOnHtml(html, url, preload) {
		if (this.hooks.has("html:transform:pre")) html = await this.hooks.run("html:transform:pre", {
			html,
			url
		});
		if (preload?.length) html = appendPreloadHintsToHtml(html, preload);
		return html;
	}
};
var angularServerApp;
function getOrCreateAngularServerApp(options) {
	return angularServerApp ??= new AngularServerApp(options);
}
function destroyAngularServerApp() {
	if (typeof ngDevMode === "undefined" || ngDevMode) resetCompiledComponents();
	angularServerApp = void 0;
}
function appendPreloadHintsToHtml(html, preload) {
	const bodyCloseIdx = html.lastIndexOf("</body>");
	if (bodyCloseIdx === -1) return html;
	return [
		html.slice(0, bodyCloseIdx),
		...preload.map((val) => `<link rel="modulepreload" href="${val}">`),
		html.slice(bodyCloseIdx)
	].join("\n");
}
function getPotentialLocaleIdFromUrl(url, basePath) {
	const { pathname } = url;
	let start = basePath.length;
	if (pathname[start] === "/") start++;
	let end = pathname.indexOf("/", start);
	if (end === -1) end = pathname.length;
	return pathname.slice(start, end);
}
function parseLanguageHeader(header) {
	if (header === "*") return /* @__PURE__ */ new Map([["*", 1]]);
	const parsedValues = header.split(",").map((item) => {
		const [locale, qualityValue] = item.split(";", 2).map((v) => v.trim());
		let quality = qualityValue?.startsWith("q=") ? parseFloat(qualityValue.slice(2)) : void 0;
		if (typeof quality !== "number" || isNaN(quality) || quality < 0 || quality > 1) quality = 1;
		return [locale, quality];
	}).sort(([_localeA, qualityA], [_localeB, qualityB]) => qualityB - qualityA);
	return new Map(parsedValues);
}
function getPreferredLocale(header, supportedLocales) {
	if (supportedLocales.length < 2) return supportedLocales[0];
	const parsedLocales = parseLanguageHeader(header);
	if (parsedLocales.size === 0 || parsedLocales.size === 1 && parsedLocales.has("*")) return supportedLocales[0];
	const normalizedSupportedLocales = /* @__PURE__ */ new Map();
	for (const locale of supportedLocales) normalizedSupportedLocales.set(normalizeLocale(locale), locale);
	let bestMatch;
	const qualityZeroNormalizedLocales = /* @__PURE__ */ new Set();
	for (const [locale, quality] of parsedLocales) {
		const normalizedLocale = normalizeLocale(locale);
		if (quality === 0) {
			qualityZeroNormalizedLocales.add(normalizedLocale);
			continue;
		}
		if (normalizedSupportedLocales.has(normalizedLocale)) return normalizedSupportedLocales.get(normalizedLocale);
		if (bestMatch !== void 0) continue;
		const [languagePrefix] = normalizedLocale.split("-", 1);
		for (const supportedLocale of normalizedSupportedLocales.keys()) if (supportedLocale.startsWith(languagePrefix)) {
			bestMatch = normalizedSupportedLocales.get(supportedLocale);
			break;
		}
	}
	if (bestMatch !== void 0) return bestMatch;
	for (const [normalizedLocale, locale] of normalizedSupportedLocales) if (!qualityZeroNormalizedLocales.has(normalizedLocale)) return locale;
}
function normalizeLocale(locale) {
	return locale.toLowerCase();
}
var AngularAppEngine = class AngularAppEngine {
	static ɵallowStaticRouteRender = false;
	static ɵdisableAllowedHostsCheck = false;
	static ɵhooks = new Hooks();
	manifest = getAngularAppEngineManifest();
	allowedHosts;
	supportedLocales = Object.keys(this.manifest.supportedLocales);
	trustProxyHeaders;
	entryPointsCache = /* @__PURE__ */ new Map();
	constructor(options) {
		this.allowedHosts = this.getAllowedHosts(options);
		this.trustProxyHeaders = normalizeTrustProxyHeaders(options?.trustProxyHeaders);
	}
	getAllowedHosts(options) {
		const allowedHosts = /* @__PURE__ */ new Set([...options?.allowedHosts ?? [], ...this.manifest.allowedHosts]);
		if (allowedHosts.has("*")) console.warn("Allowing all hosts via \"*\" is a security risk. This configuration should only be used when validation for \"Host\" and \"X-Forwarded-Host\" headers is performed in another layer, such as a load balancer or reverse proxy. For more information see: https://angular.dev/best-practices/security#preventing-server-side-request-forgery-ssrf");
		return allowedHosts;
	}
	async handle(request, requestContext) {
		const allowedHost = this.allowedHosts;
		const securedRequest = sanitizeRequestHeaders(request, this.trustProxyHeaders);
		try {
			validateRequest(securedRequest, allowedHost, AngularAppEngine.ɵdisableAllowedHostsCheck);
		} catch (error) {
			return this.handleValidationError(securedRequest.url, error);
		}
		const serverApp = await this.getAngularServerAppForRequest(securedRequest);
		if (serverApp) return serverApp.handle(securedRequest, requestContext);
		if (this.supportedLocales.length > 1) return this.redirectBasedOnAcceptLanguage(securedRequest);
		return null;
	}
	redirectBasedOnAcceptLanguage(request) {
		const { basePath, supportedLocales } = this.manifest;
		const { pathname } = new URL(request.url);
		if (pathname !== basePath) return null;
		const preferredLocale = getPreferredLocale(request.headers.get("Accept-Language") || "*", this.supportedLocales);
		if (preferredLocale) {
			const subPath = supportedLocales[preferredLocale];
			if (subPath !== void 0) return createRedirectResponse(joinUrlParts(getFirstHeaderValue(request.headers.get("X-Forwarded-Prefix")) ?? "", pathname, subPath), 302, { "Vary": "Accept-Language" });
		}
		return null;
	}
	async getAngularServerAppForRequest(request) {
		const url = new URL(request.url);
		const entryPoint = await this.getEntryPointExportsForUrl(url);
		if (!entryPoint) return null;
		const ɵgetOrCreateAngularServerApp = entryPoint.ɵgetOrCreateAngularServerApp;
		return ɵgetOrCreateAngularServerApp({
			allowStaticRouteRender: AngularAppEngine.ɵallowStaticRouteRender,
			hooks: AngularAppEngine.ɵhooks
		});
	}
	getEntryPointExports(potentialLocale) {
		const cachedEntryPoint = this.entryPointsCache.get(potentialLocale);
		if (cachedEntryPoint) return cachedEntryPoint;
		const { entryPoints } = this.manifest;
		const entryPoint = entryPoints[potentialLocale];
		if (!entryPoint) return;
		const entryPointExports = entryPoint();
		this.entryPointsCache.set(potentialLocale, entryPointExports);
		return entryPointExports;
	}
	getEntryPointExportsForUrl(url) {
		const { basePath, supportedLocales } = this.manifest;
		if (this.supportedLocales.length === 1) return this.getEntryPointExports(supportedLocales[this.supportedLocales[0]]);
		const potentialLocale = getPotentialLocaleIdFromUrl(url, basePath);
		return this.getEntryPointExports(potentialLocale) ?? this.getEntryPointExports("");
	}
	handleValidationError(url, error) {
		const errorMessage = error.message;
		console.error(`ERROR: Bad Request ("${url}").\n` + errorMessage + "\n\nFor more information, see https://angular.dev/best-practices/security#preventing-server-side-request-forgery-ssrf");
		return new Response(errorMessage, {
			status: 400,
			statusText: "Bad Request",
			headers: { "Content-Type": "text/plain" }
		});
	}
};
function createRequestHandler(handler) {
	handler["__ng_request_handler__"] = true;
	return handler;
}
export { AngularAppEngine, IS_DISCOVERING_ROUTES, PrerenderFallback, RenderMode, createRequestHandler, provideServerRendering, withAppShell, withRoutes, destroyAngularServerApp as ɵdestroyAngularServerApp, extractRoutesAndCreateRouteTree as ɵextractRoutesAndCreateRouteTree, getOrCreateAngularServerApp as ɵgetOrCreateAngularServerApp, getRoutesFromAngularRouterConfig as ɵgetRoutesFromAngularRouterConfig, setAngularAppEngineManifest as ɵsetAngularAppEngineManifest, setAngularAppManifest as ɵsetAngularAppManifest };
