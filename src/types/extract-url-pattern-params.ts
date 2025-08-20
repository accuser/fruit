import type { ExtractPatternParams } from './extract-pattern-params';
import type { ExtractSearchParams } from './extract-search-params';

export type ExtractURLPatternParams<T extends URLPatternInit> = (T extends { protocol: infer Protocol extends string }
	? ExtractPatternParams<Protocol>
	: {}) &
	(T extends { username: infer Username extends string } ? ExtractPatternParams<Username> : {}) &
	(T extends { password: infer Password extends string } ? ExtractPatternParams<Password> : {}) &
	(T extends { hostname: infer Hostname extends string } ? ExtractPatternParams<Hostname> : {}) &
	(T extends { port: infer Port extends string } ? ExtractPatternParams<Port> : {}) &
	(T extends { pathname: infer Pathname extends string } ? ExtractPatternParams<Pathname> : {}) &
	(T extends { search: infer Search extends string } ? ExtractSearchParams<Search> : {}) &
	(T extends { hash: infer Hash extends string } ? ExtractPatternParams<Hash> : {});

type A = ExtractURLPatternParams<{
	protocol: 'https';
	username: 'user';
	password: 'pass';
	hostname: 'api.:tenant';
	port: ':port';
	pathname: '/users/:id';
	search: '?q=:q';
	hash: '#section';
}>; // { id: string }
