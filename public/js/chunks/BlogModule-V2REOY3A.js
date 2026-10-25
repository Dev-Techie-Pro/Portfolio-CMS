import {
  bindCommaSeparatedChipInput,
  getRteHtml,
  promptUrl,
  setRteHtml,
  updateRteButtonStates
} from "./chunk-ZSETD5SA.js";
import {
  open
} from "./chunk-RUYB3ZSS.js";
import "./chunk-HT4C2QOZ.js";
import {
  syncPaSelect
} from "./chunk-HYF3MIUV.js";
import {
  handleFileValidation,
  uploadCmsFileWithPreview
} from "./chunk-XZ5R2AN2.js";
import {
  isValidSlug,
  slugify
} from "./chunk-2XY7RIAB.js";
import {
  getChipValues,
  populateChips
} from "./chunk-JFWNZ4BR.js";
import "./chunk-777AU2J4.js";
import {
  CrudCardModule
} from "./chunk-7454QW5C.js";
import {
  setStatTrend,
  setStatValue
} from "./chunk-NAHW6JXX.js";
import "./chunk-25T6YHMS.js";
import "./chunk-VXJMB3CY.js";
import {
  normalizeCategoryKey
} from "./chunk-FRUJZYET.js";
import "./chunk-PD6FJZHW.js";
import "./chunk-6FXKQLBA.js";
import {
  formatDate,
  sortByNewestFirst
} from "./chunk-JWEJ6YLS.js";
import {
  closeListRow,
  listActionBtn,
  renderListActionsCell,
  renderListDateCell,
  renderListIndexCell,
  renderListProjectCell,
  renderListRowStart,
  renderListStatusCell,
  renderListTextCell
} from "./chunk-5C5ORR3Y.js";
import "./chunk-X5DANJIQ.js";
import "./chunk-HSXC6VYX.js";
import "./chunk-IZ7T64RP.js";
import "./chunk-UHXU6UPR.js";
import {
  storage
} from "./chunk-7KTA4S5K.js";
import {
  canManageContent,
  requestConfirm,
  requestDelete
} from "./chunk-FTMH3SUW.js";
import "./chunk-HWSNCMVP.js";
import {
  $all,
  $field,
  $id,
  $img,
  $input,
  $select,
  escapeHtml
} from "./chunk-HFEWIT3P.js";
import {
  __export,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField
} from "./chunk-MTDZJ6X7.js";

// node_modules/prettier/standalone.mjs
var Ru = Object.defineProperty;
var yt = (t, e) => {
  for (var r in e) Ru(t, r, { get: e[r], enumerable: true });
};
var Su = {};
yt(Su, { __debug: () => $i, check: () => Vi, doc: () => ar, format: () => Pu, formatWithCursor: () => Ou, getSupportInfo: () => Wi, util: () => fr, version: () => gu });
var X = (t, e) => (r, n, ...u) => r | 1 && n == null ? void 0 : (e.call(n) ?? n[t]).apply(n, u);
var vu = String.prototype.replaceAll ?? function(t, e) {
  return t.global ? this.replace(t, e) : this.split(t).join(e);
};
var Lu = X("replaceAll", function() {
  if (typeof this == "string") return vu;
});
var ne = Lu;
var Ne = class {
  diff(e, r, n = {}) {
    let u;
    typeof n == "function" ? (u = n, n = {}) : "callback" in n && (u = n.callback);
    let o = this.castInput(e, n), i = this.castInput(r, n), D2 = this.removeEmpty(this.tokenize(o, n)), s = this.removeEmpty(this.tokenize(i, n));
    return this.diffWithOptionsObj(D2, s, n, u);
  }
  diffWithOptionsObj(e, r, n, u) {
    var o;
    let i = (C2) => {
      if (C2 = this.postProcess(C2, n), u) {
        setTimeout(function() {
          u(C2);
        }, 0);
        return;
      } else return C2;
    }, D2 = r.length, s = e.length, a = 1, c = D2 + s;
    n.maxEditLength != null && (c = Math.min(c, n.maxEditLength));
    let p2 = (o = n.timeout) !== null && o !== void 0 ? o : 1 / 0, l = Date.now() + p2, m2 = [{ oldPos: -1, lastComponent: void 0 }], f = this.extractCommon(m2[0], r, e, 0, n);
    if (m2[0].oldPos + 1 >= s && f + 1 >= D2) return i(this.buildValues(m2[0].lastComponent, r, e));
    let F2 = -1 / 0, d = 1 / 0, E2 = () => {
      for (let C2 = Math.max(F2, -a); C2 <= Math.min(d, a); C2 += 2) {
        let h, _ = m2[C2 - 1], P2 = m2[C2 + 1];
        _ && (m2[C2 - 1] = void 0);
        let A2 = false;
        if (P2) {
          let J2 = P2.oldPos - C2;
          A2 = P2 && 0 <= J2 && J2 < D2;
        }
        let B2 = _ && _.oldPos + 1 < s;
        if (!A2 && !B2) {
          m2[C2] = void 0;
          continue;
        }
        if (!B2 || A2 && _.oldPos < P2.oldPos ? h = this.addToPath(P2, true, false, 0, n) : h = this.addToPath(_, false, true, 1, n), f = this.extractCommon(h, r, e, C2, n), h.oldPos + 1 >= s && f + 1 >= D2) return i(this.buildValues(h.lastComponent, r, e)) || true;
        m2[C2] = h, h.oldPos + 1 >= s && (d = Math.min(d, C2 - 1)), f + 1 >= D2 && (F2 = Math.max(F2, C2 + 1));
      }
      a++;
    };
    if (u) (function C2() {
      setTimeout(function() {
        if (a > c || Date.now() > l) return u(void 0);
        E2() || C2();
      }, 0);
    })();
    else for (; a <= c && Date.now() <= l; ) {
      let C2 = E2();
      if (C2) return C2;
    }
  }
  addToPath(e, r, n, u, o) {
    let i = e.lastComponent;
    return i && !o.oneChangePerToken && i.added === r && i.removed === n ? { oldPos: e.oldPos + u, lastComponent: { count: i.count + 1, added: r, removed: n, previousComponent: i.previousComponent } } : { oldPos: e.oldPos + u, lastComponent: { count: 1, added: r, removed: n, previousComponent: i } };
  }
  extractCommon(e, r, n, u, o) {
    let i = r.length, D2 = n.length, s = e.oldPos, a = s - u, c = 0;
    for (; a + 1 < i && s + 1 < D2 && this.equals(n[s + 1], r[a + 1], o); ) a++, s++, c++, o.oneChangePerToken && (e.lastComponent = { count: 1, previousComponent: e.lastComponent, added: false, removed: false });
    return c && !o.oneChangePerToken && (e.lastComponent = { count: c, previousComponent: e.lastComponent, added: false, removed: false }), e.oldPos = s, a;
  }
  equals(e, r, n) {
    return n.comparator ? n.comparator(e, r) : e === r || !!n.ignoreCase && e.toLowerCase() === r.toLowerCase();
  }
  removeEmpty(e) {
    let r = [];
    for (let n = 0; n < e.length; n++) e[n] && r.push(e[n]);
    return r;
  }
  castInput(e, r) {
    return e;
  }
  tokenize(e, r) {
    return Array.from(e);
  }
  join(e) {
    return e.join("");
  }
  postProcess(e, r) {
    return e;
  }
  get useLongestToken() {
    return false;
  }
  buildValues(e, r, n) {
    let u = [], o;
    for (; e; ) u.push(e), o = e.previousComponent, delete e.previousComponent, e = o;
    u.reverse();
    let i = u.length, D2 = 0, s = 0, a = 0;
    for (; D2 < i; D2++) {
      let c = u[D2];
      if (c.removed) c.value = this.join(n.slice(a, a + c.count)), a += c.count;
      else {
        if (!c.added && this.useLongestToken) {
          let p2 = r.slice(s, s + c.count);
          p2 = p2.map(function(l, m2) {
            let f = n[a + m2];
            return f.length > l.length ? f : l;
          }), c.value = this.join(p2);
        } else c.value = this.join(r.slice(s, s + c.count));
        s += c.count, c.added || (a += c.count);
      }
    }
    return u;
  }
};
var At = class extends Ne {
  tokenize(e) {
    return e.slice();
  }
  join(e) {
    return e;
  }
  removeEmpty(e) {
    return e;
  }
};
var pr = new At();
function xt(t, e, r) {
  return pr.diff(t, e, r);
}
var Mu = () => {
};
var k = Mu;
var dr = "cr";
var Fr = "crlf";
var Yu = "lf";
var ju = Yu;
var Bt = "\r";
var Er = `\r
`;
var ze = `
`;
var Uu = ze;
function Cr(t) {
  let e = t.indexOf(Bt);
  return e !== -1 ? t.charAt(e + 1) === ze ? Fr : dr : ju;
}
function we(t) {
  return t === dr ? Bt : t === Fr ? Er : Uu;
}
var Vu = /* @__PURE__ */ new Map([[ze, /\n/g], [Bt, /\r/g], [Er, /\r\n/g]]);
function Tt(t, e) {
  let r = Vu.get(e);
  return t.match(r)?.length ?? 0;
}
var Wu = /\r\n?/g;
function hr(t) {
  return ne(0, t, Wu, ze);
}
var ue = /* @__PURE__ */ Symbol.for("comments");
function $u(t) {
  return this[t < 0 ? this.length + t : t];
}
var zu = X("at", function() {
  if (Array.isArray(this) || typeof this == "string") return $u;
});
var y = zu;
var G = "string";
var U = "array";
var V = "cursor";
var I = "indent";
var R = "align";
var v = "trim";
var x = "group";
var S = "fill";
var T = "if-break";
var L = "indent-if-break";
var M = "line-suffix";
var Y = "line-suffix-boundary";
var g = "line";
var b = "label";
var N = "break-parent";
var Ge = /* @__PURE__ */ new Set([V, I, R, v, x, S, T, L, M, Y, g, b, N]);
function gr(t) {
  let e = t.length;
  for (; e > 0 && (t[e - 1] === "\r" || t[e - 1] === `
`); ) e--;
  return e < t.length ? t.slice(0, e) : t;
}
function Fe(t, e, r) {
  if (!t.has(e)) {
    let n = r(e);
    t.set(e, n);
  }
  return t.get(e);
}
function Gu(t) {
  if (typeof t == "string") return G;
  if (Array.isArray(t)) return U;
  if (!t) return;
  let { type: e } = t;
  if (Ge.has(e)) return e;
}
var q = Gu;
var Ku = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t);
function Hu(t) {
  let e = t === null ? "null" : typeof t;
  if (e !== "string" && e !== "object") return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
  if (q(t)) throw new Error("doc is valid.");
  let r = Object.prototype.toString.call(t);
  if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
  let n = Ku([...Ge].map((u) => `'${u}'`));
  return `Unexpected doc.type '${t.type}'.
Expected it to be ${n}.`;
}
var Nt = class extends Error {
  constructor(e) {
    super(Hu(e));
    __publicField(this, "name", "InvalidDocError");
    this.doc = e;
  }
};
var Z = Nt;
var _r = {};
function Ju(t, e, r, n) {
  let u = [t];
  for (; u.length > 0; ) {
    let o = u.pop();
    if (o === _r) {
      r(u.pop());
      continue;
    }
    r && u.push(o, _r);
    let i = q(o);
    if (!i) throw new Z(o);
    if (e?.(o) !== false) switch (i) {
      case U:
      case S: {
        let D2 = i === U ? o : o.parts;
        for (let s = D2.length, a = s - 1; a >= 0; --a) u.push(D2[a]);
        break;
      }
      case T:
        u.push(o.flatContents, o.breakContents);
        break;
      case x:
        if (n && o.expandedStates) for (let D2 = o.expandedStates.length, s = D2 - 1; s >= 0; --s) u.push(o.expandedStates[s]);
        else u.push(o.contents);
        break;
      case R:
      case I:
      case L:
      case b:
      case M:
        u.push(o.contents);
        break;
      case G:
      case V:
      case v:
      case Y:
      case g:
      case N:
        break;
      default:
        throw new Z(o);
    }
  }
}
var Oe = Ju;
function Se(t, e) {
  if (typeof t == "string") return e(t);
  let r = /* @__PURE__ */ new Map();
  return n(t);
  function n(o) {
    return Fe(r, o, u);
  }
  function u(o) {
    switch (q(o)) {
      case U:
        return e(o.map(n));
      case S:
        return e({ ...o, parts: o.parts.map(n) });
      case T:
        return e({ ...o, breakContents: n(o.breakContents), flatContents: n(o.flatContents) });
      case x: {
        let { expandedStates: i, contents: D2 } = o;
        return i ? (i = i.map(n), D2 = i[0]) : D2 = n(D2), e({ ...o, contents: D2, expandedStates: i });
      }
      case R:
      case I:
      case L:
      case b:
      case M:
        return e({ ...o, contents: n(o.contents) });
      case G:
      case V:
      case v:
      case Y:
      case g:
      case N:
        return e(o);
      default:
        throw new Z(o);
    }
  }
}
function Ke(t, e, r) {
  let n = r, u = false;
  function o(i) {
    if (u) return false;
    let D2 = e(i);
    D2 !== void 0 && (u = true, n = D2);
  }
  return Oe(t, o), n;
}
function qu(t) {
  if (t.type === x && t.break || t.type === g && t.hard || t.type === N) return true;
}
function xr(t) {
  return Ke(t, qu, false);
}
function yr(t) {
  if (t.length > 0) {
    let e = y(0, t, -1);
    !e.expandedStates && !e.break && (e.break = "propagated");
  }
  return null;
}
function Br(t) {
  let e = /* @__PURE__ */ new Set(), r = [];
  function n(o) {
    if (o.type === N && yr(r), o.type === x) {
      if (r.push(o), e.has(o)) return false;
      e.add(o);
    }
  }
  function u(o) {
    o.type === x && r.pop().break && yr(r);
  }
  Oe(t, n, u, true);
}
function Xu(t) {
  return t.type === g && !t.hard ? t.soft ? "" : " " : t.type === T ? t.flatContents : t;
}
function Tr(t) {
  return Se(t, Xu);
}
function Ar(t) {
  for (t = [...t]; t.length >= 2 && y(0, t, -2).type === g && y(0, t, -1).type === N; ) t.length -= 2;
  if (t.length > 0) {
    let e = Pe(y(0, t, -1));
    t[t.length - 1] = e;
  }
  return t;
}
function Pe(t) {
  switch (q(t)) {
    case I:
    case L:
    case x:
    case M:
    case b: {
      let e = Pe(t.contents);
      return { ...t, contents: e };
    }
    case T:
      return { ...t, breakContents: Pe(t.breakContents), flatContents: Pe(t.flatContents) };
    case S:
      return { ...t, parts: Ar(t.parts) };
    case U:
      return Ar(t);
    case G:
      return gr(t);
    case R:
    case V:
    case v:
    case Y:
    case g:
    case N:
      break;
    default:
      throw new Z(t);
  }
  return t;
}
function He(t) {
  return Pe(Zu(t));
}
function Qu(t) {
  switch (q(t)) {
    case S: {
      let { parts: e } = t;
      if (e.every((r) => r === "")) return "";
      if (e.length === 1) return e[0];
      break;
    }
    case x:
      if (!t.contents && !t.id && !t.break && !t.expandedStates) return "";
      if (t.contents.type === x && t.contents.id === t.id && t.contents.break === t.break && t.contents.expandedStates === t.expandedStates) return t.contents;
      break;
    case R:
    case I:
    case L:
    case M:
      if (!t.contents) return "";
      break;
    case T:
      if (!t.flatContents && !t.breakContents) return "";
      break;
    case U: {
      let e = [];
      for (let r of t) {
        if (!r) continue;
        let [n, ...u] = Array.isArray(r) ? r : [r];
        typeof n == "string" && typeof y(0, e, -1) == "string" ? e[e.length - 1] += n : e.push(n), e.push(...u);
      }
      return e.length === 0 ? "" : e.length === 1 ? e[0] : e;
    }
    case G:
    case V:
    case v:
    case Y:
    case g:
    case b:
    case N:
      break;
    default:
      throw new Z(t);
  }
  return t;
}
function Zu(t) {
  return Se(t, (e) => Qu(e));
}
function Nr(t, e = Je) {
  return Se(t, (r) => typeof r == "string" ? be(e, r.split(`
`)) : r);
}
function eo(t) {
  if (t.type === g) return true;
}
function wr(t) {
  return Ke(t, eo, false);
}
function Ee(t, e) {
  return t.type === b ? { ...t, contents: e(t.contents) } : e(t);
}
var w = k;
var qe = k;
var Or = k;
var Pr = k;
function oe(t) {
  return w(t), { type: I, contents: t };
}
function De(t, e) {
  return Pr(t), w(e), { type: R, contents: e, n: t };
}
function Sr(t) {
  return De(Number.NEGATIVE_INFINITY, t);
}
function Xe(t) {
  return De({ type: "root" }, t);
}
function br(t) {
  return De(-1, t);
}
function Qe(t, e, r) {
  w(t);
  let n = t;
  if (e > 0) {
    for (let u = 0; u < Math.floor(e / r); ++u) n = oe(n);
    n = De(e % r, n), n = De(Number.NEGATIVE_INFINITY, n);
  }
  return n;
}
var ae = { type: N };
var ee = { type: V };
function kr(t) {
  return Or(t), { type: S, parts: t };
}
function wt(t, e = {}) {
  return w(t), qe(e.expandedStates, true), { type: x, id: e.id, contents: t, break: !!e.shouldBreak, expandedStates: e.expandedStates };
}
function Ir(t, e) {
  return wt(t[0], { ...e, expandedStates: t });
}
function Rr(t, e = "", r = {}) {
  return w(t), e !== "" && w(e), { type: T, breakContents: t, flatContents: e, groupId: r.groupId };
}
function vr(t, e) {
  return w(t), { type: L, contents: t, groupId: e.groupId, negate: e.negate };
}
function be(t, e) {
  w(t), qe(e);
  let r = [];
  for (let n = 0; n < e.length; n++) n !== 0 && r.push(t), r.push(e[n]);
  return r;
}
function Lr(t, e) {
  return w(e), t ? { type: b, label: t, contents: e } : e;
}
var Ze = { type: g };
var Mr = { type: g, soft: true };
var ke = { type: g, hard: true };
var W = [ke, ae];
var Ot = { type: g, hard: true, literal: true };
var Je = [Ot, ae];
function Ie(t) {
  return w(t), { type: M, contents: t };
}
var Yr = { type: Y };
var jr = { type: v };
function te(t) {
  if (!t) return "";
  if (Array.isArray(t)) {
    let e = [];
    for (let r of t) if (Array.isArray(r)) e.push(...te(r));
    else {
      let n = te(r);
      n !== "" && e.push(n);
    }
    return e;
  }
  return t.type === T ? { ...t, breakContents: te(t.breakContents), flatContents: te(t.flatContents) } : t.type === x ? { ...t, contents: te(t.contents), expandedStates: t.expandedStates?.map(te) } : t.type === S ? { type: "fill", parts: t.parts.map(te) } : t.contents ? { ...t, contents: te(t.contents) } : t;
}
function Ur(t) {
  let e = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ new Set();
  return n(te(t));
  function n(o, i, D2) {
    if (typeof o == "string") return JSON.stringify(o);
    if (Array.isArray(o)) {
      let s = o.map(n).filter(Boolean);
      return s.length === 1 ? s[0] : `[${s.join(", ")}]`;
    }
    if (o.type === g) {
      let s = D2?.[i + 1]?.type === N;
      return o.literal ? s ? "literalline" : "literallineWithoutBreakParent" : o.hard ? s ? "hardline" : "hardlineWithoutBreakParent" : o.soft ? "softline" : "line";
    }
    if (o.type === N) return D2?.[i - 1]?.type === g && D2[i - 1].hard ? void 0 : "breakParent";
    if (o.type === v) return "trim";
    if (o.type === I) return "indent(" + n(o.contents) + ")";
    if (o.type === R) return o.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + n(o.contents) + ")" : o.n < 0 ? "dedent(" + n(o.contents) + ")" : o.n.type === "root" ? "markAsRoot(" + n(o.contents) + ")" : "align(" + JSON.stringify(o.n) + ", " + n(o.contents) + ")";
    if (o.type === T) return "ifBreak(" + n(o.breakContents) + (o.flatContents ? ", " + n(o.flatContents) : "") + (o.groupId ? (o.flatContents ? "" : ', ""') + `, { groupId: ${u(o.groupId)} }` : "") + ")";
    if (o.type === L) {
      let s = [];
      o.negate && s.push("negate: true"), o.groupId && s.push(`groupId: ${u(o.groupId)}`);
      let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
      return `indentIfBreak(${n(o.contents)}${a})`;
    }
    if (o.type === x) {
      let s = [];
      o.break && o.break !== "propagated" && s.push("shouldBreak: true"), o.id && s.push(`id: ${u(o.id)}`);
      let a = s.length > 0 ? `, { ${s.join(", ")} }` : "";
      return o.expandedStates ? `conditionalGroup([${o.expandedStates.map((c) => n(c)).join(",")}]${a})` : `group(${n(o.contents)}${a})`;
    }
    if (o.type === S) return `fill([${o.parts.map((s) => n(s)).join(", ")}])`;
    if (o.type === M) return "lineSuffix(" + n(o.contents) + ")";
    if (o.type === Y) return "lineSuffixBoundary";
    if (o.type === b) return `label(${JSON.stringify(o.label)}, ${n(o.contents)})`;
    if (o.type === V) return "cursor";
    throw new Error("Unknown doc type " + o.type);
  }
  function u(o) {
    if (typeof o != "symbol") return JSON.stringify(String(o));
    if (o in e) return e[o];
    let i = o.description || "symbol";
    for (let D2 = 0; ; D2++) {
      let s = i + (D2 > 0 ? ` #${D2}` : "");
      if (!r.has(s)) return r.add(s), e[o] = `Symbol.for(${JSON.stringify(s)})`;
    }
  }
}
var Vr = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var Wr = 12288;
var $r = 65510;
var zr = [12288, 12288, 65281, 65376, 65504, 65510];
var Gr = 4352;
var Kr = 262141;
var Pt = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];
var St = (t, e) => {
  let r = 0, n = Math.floor(t.length / 2) - 1;
  for (; r <= n; ) {
    let u = Math.floor((r + n) / 2), o = u * 2;
    if (e < t[o]) n = u - 1;
    else if (e > t[o + 1]) r = u + 1;
    else return true;
  }
  return false;
};
var Hr = 19968;
var [to, ro] = no(Pt);
function no(t) {
  let e = t[0], r = t[1];
  for (let n = 0; n < t.length; n += 2) {
    let u = t[n], o = t[n + 1];
    if (Hr >= u && Hr <= o) return [u, o];
    o - u > r - e && (e = u, r = o);
  }
  return [e, r];
}
var bt = (t) => t < Wr || t > $r ? false : St(zr, t);
var kt = (t) => t >= to && t <= ro ? true : t < Gr || t > Kr ? false : St(Pt, t);
var uo = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/;
var Jr = (t) => uo.test(t);
var oo = /[^\x20-\x7F]/;
function io(t) {
  if (!t) return 0;
  if (!oo.test(t)) return t.length;
  let e = 0;
  t = t.replace(Vr(), (r) => (e += Jr(r) ? 1 : 2, ""));
  for (let r of t) {
    let n = r.codePointAt(0);
    n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || n >= 65024 && n <= 65039 || (e += bt(n) || kt(n) ? 2 : 1);
  }
  return e;
}
var Re = io;
var so = { type: 0 };
var Do = { type: 1 };
var It = { value: "", length: 0, queue: [], get root() {
  return It;
} };
function qr(t, e, r) {
  let n = e.type === 1 ? t.queue.slice(0, -1) : [...t.queue, e], u = "", o = 0, i = 0, D2 = 0;
  for (let f of n) switch (f.type) {
    case 0:
      c(), r.useTabs ? s(1) : a(r.tabWidth);
      break;
    case 3: {
      let { string: F2 } = f;
      c(), u += F2, o += F2.length;
      break;
    }
    case 2: {
      let { width: F2 } = f;
      i += 1, D2 += F2;
      break;
    }
    default:
      throw new Error(`Unexpected indent comment '${f.type}'.`);
  }
  return l(), { ...t, value: u, length: o, queue: n };
  function s(f) {
    u += "	".repeat(f), o += r.tabWidth * f;
  }
  function a(f) {
    u += " ".repeat(f), o += f;
  }
  function c() {
    r.useTabs ? p2() : l();
  }
  function p2() {
    i > 0 && s(i), m2();
  }
  function l() {
    D2 > 0 && a(D2), m2();
  }
  function m2() {
    i = 0, D2 = 0;
  }
}
function Xr(t, e, r) {
  if (!e) return t;
  if (e.type === "root") return { ...t, root: t };
  if (e === Number.NEGATIVE_INFINITY) return t.root;
  let n;
  return typeof e == "number" ? e < 0 ? n = Do : n = { type: 2, width: e } : n = { type: 3, string: e }, qr(t, n, r);
}
function Qr(t, e) {
  return qr(t, so, e);
}
function ao(t) {
  let e = 0;
  for (let r = t.length - 1; r >= 0; r--) {
    let n = t[r];
    if (n === " " || n === "	") e++;
    else break;
  }
  return e;
}
function et(t) {
  let e = ao(t);
  return { text: e === 0 ? t : t.slice(0, t.length - e), count: e };
}
var _t, _e, _n, _u, _r2, _Rt_instances, o_fn, _a;
var Rt = (_a = class {
  constructor() {
    __privateAdd(this, _Rt_instances);
    __privateAdd(this, _t, []);
    __privateAdd(this, _e, "");
    __privateAdd(this, _n, 0);
    __privateAdd(this, _u, []);
    __privateAdd(this, _r2, []);
  }
  markPosition() {
    if (__privateGet(this, _u).length + __privateGet(this, _r2).length >= 2) throw new Error("There are too many 'cursor' in doc.");
    __privateGet(this, _r2).push(__privateGet(this, _n) + __privateGet(this, _e).length);
  }
  write(e) {
    __privateSet(this, _e, __privateGet(this, _e) + e);
  }
  trim() {
    let { text: e, count: r } = et(__privateGet(this, _e));
    return __privateSet(this, _e, e), __privateMethod(this, _Rt_instances, o_fn).call(this), r;
  }
  finish() {
    return __privateMethod(this, _Rt_instances, o_fn).call(this), { text: __privateGet(this, _t).join(""), positions: __privateGet(this, _u) };
  }
}, _t = new WeakMap(), _e = new WeakMap(), _n = new WeakMap(), _u = new WeakMap(), _r2 = new WeakMap(), _Rt_instances = new WeakSet(), o_fn = function() {
  let e = __privateGet(this, _e);
  e !== "" && (__privateGet(this, _t).push(e), __privateSet(this, _n, __privateGet(this, _n) + e.length), __privateSet(this, _e, ""));
  for (let r of __privateGet(this, _r2)) __privateGet(this, _u).push(Math.min(r, __privateGet(this, _n)));
  __privateGet(this, _r2).length = 0;
}, _a);
var Zr = Rt;
var K = /* @__PURE__ */ Symbol("MODE_BREAK");
var Q = /* @__PURE__ */ Symbol("MODE_FLAT");
var vt = /* @__PURE__ */ Symbol("DOC_FILL_PRINTED_LENGTH");
function tt(t, e, r, n, u, o) {
  if (r === Number.POSITIVE_INFINITY) return true;
  let i = e.length, D2 = false, s = [t], a = "";
  for (; r >= 0; ) {
    if (s.length === 0) {
      if (i === 0) return true;
      s.push(e[--i]);
      continue;
    }
    let { mode: c, doc: p2 } = s.pop(), l = q(p2);
    switch (l) {
      case G:
        p2 && (D2 && (a += " ", r -= 1, D2 = false), a += p2, r -= Re(p2));
        break;
      case U:
      case S: {
        let m2 = l === U ? p2 : p2.parts, f = p2[vt] ?? 0;
        for (let F2 = m2.length - 1; F2 >= f; F2--) s.push({ mode: c, doc: m2[F2] });
        break;
      }
      case I:
      case R:
      case L:
      case b:
        s.push({ mode: c, doc: p2.contents });
        break;
      case v: {
        let { text: m2, count: f } = et(a);
        a = m2, r += f;
        break;
      }
      case x: {
        if (o && p2.break) return false;
        let m2 = p2.break ? K : c, f = p2.expandedStates && m2 === K ? y(0, p2.expandedStates, -1) : p2.contents;
        s.push({ mode: m2, doc: f });
        break;
      }
      case T: {
        let f = (p2.groupId ? u[p2.groupId] || Q : c) === K ? p2.breakContents : p2.flatContents;
        f && s.push({ mode: c, doc: f });
        break;
      }
      case g:
        if (c === K || p2.hard) return true;
        p2.soft || (D2 = true);
        break;
      case M:
        n = true;
        break;
      case Y:
        if (n) return false;
        break;
    }
  }
  return false;
}
function Ce(t, e) {
  let r = /* @__PURE__ */ Object.create(null), n = e.printWidth, u = we(e.endOfLine), o = 0, i = [{ indent: It, mode: K, doc: t }], D2 = false, s = [], a = new Zr();
  for (Br(t); i.length > 0; ) {
    let { indent: f, mode: F2, doc: d } = i.pop();
    switch (q(d)) {
      case G: {
        let E2 = u !== `
` ? ne(0, d, `
`, u) : d;
        E2 && (a.write(E2), i.length > 0 && (o += Re(E2)));
        break;
      }
      case U:
        for (let E2 = d.length - 1; E2 >= 0; E2--) i.push({ indent: f, mode: F2, doc: d[E2] });
        break;
      case V:
        a.markPosition();
        break;
      case I:
        i.push({ indent: Qr(f, e), mode: F2, doc: d.contents });
        break;
      case R:
        i.push({ indent: Xr(f, d.n, e), mode: F2, doc: d.contents });
        break;
      case v:
        o -= a.trim();
        break;
      case x: {
        let E2 = (function() {
          if (F2 === Q && !D2) return { indent: f, mode: d.break ? K : Q, doc: d.contents };
          D2 = false;
          let h = n - o, _ = s.length > 0, P2 = { indent: f, mode: Q, doc: d.contents };
          if (!d.break && tt(P2, i, h, _, r)) return P2;
          if (!d.expandedStates) return { indent: f, mode: K, doc: d.contents };
          if (!d.break) for (let A2 = 1; A2 < d.expandedStates.length - 1; A2++) {
            let B2 = { indent: f, mode: Q, doc: d.expandedStates[A2] };
            if (tt(B2, i, h, _, r)) return B2;
          }
          return { indent: f, mode: K, doc: y(0, d.expandedStates, -1) };
        })();
        i.push(E2), d.id && (r[d.id] = E2.mode);
        break;
      }
      case S: {
        let E2 = n - o, C2 = d[vt] ?? 0, { parts: h } = d, _ = h.length - C2;
        if (_ === 0) break;
        let P2 = h[C2 + 0], A2 = h[C2 + 1], B2 = { indent: f, mode: Q, doc: P2 }, J2 = { indent: f, mode: K, doc: P2 }, $e2 = tt(B2, [], E2, s.length > 0, r, true);
        if (_ === 1) {
          $e2 ? i.push(B2) : i.push(J2);
          break;
        }
        let lr2 = { indent: f, mode: Q, doc: A2 }, _t3 = { indent: f, mode: K, doc: A2 };
        if (_ === 2) {
          $e2 ? i.push(lr2, B2) : i.push(_t3, J2);
          break;
        }
        let bu = h[C2 + 2], ku = { indent: f, mode: F2, doc: { ...d, [vt]: C2 + 2 } }, Iu = tt({ indent: f, mode: Q, doc: [P2, A2, bu] }, [], E2, s.length > 0, r, true);
        i.push(ku), Iu ? i.push(lr2, B2) : $e2 ? i.push(_t3, B2) : i.push(_t3, J2);
        break;
      }
      case T:
      case L: {
        let E2 = d.groupId ? r[d.groupId] : F2;
        if (E2 === K) {
          let C2 = d.type === T ? d.breakContents : d.negate ? d.contents : oe(d.contents);
          C2 && i.push({ indent: f, mode: F2, doc: C2 });
        }
        if (E2 === Q) {
          let C2 = d.type === T ? d.flatContents : d.negate ? oe(d.contents) : d.contents;
          C2 && i.push({ indent: f, mode: F2, doc: C2 });
        }
        break;
      }
      case M:
        s.push({ indent: f, mode: F2, doc: d.contents });
        break;
      case Y:
        s.length > 0 && i.push({ indent: f, mode: F2, doc: ke });
        break;
      case g:
        switch (F2) {
          case Q:
            if (!d.hard) {
              d.soft || (a.write(" "), o += 1);
              break;
            }
            D2 = true;
          case K:
            if (s.length > 0) {
              i.push({ indent: f, mode: F2, doc: d }, ...s.reverse()), s.length = 0;
              break;
            }
            d.literal ? (a.write(u), o = 0, f.root && (f.root.value && a.write(f.root.value), o = f.root.length)) : (a.trim(), a.write(u + f.value), o = f.length);
            break;
        }
        break;
      case b:
        i.push({ indent: f, mode: F2, doc: d.contents });
        break;
      case N:
        break;
      default:
        throw new Z(d);
    }
    i.length === 0 && s.length > 0 && (i.push(...s.reverse()), s.length = 0);
  }
  let { text: c, positions: p2 } = a.finish();
  if (p2.length !== 2) return { formatted: c };
  let [l, m2] = p2;
  return { formatted: c, cursorNodeStart: l, cursorNodeText: c.slice(l, m2) };
}
function co(t, e, r = 0) {
  let n = 0;
  for (let u = r; u < t.length; ++u) t[u] === "	" ? n = n + e - n % e : n++;
  return n;
}
var he = co;
var _Lt_instances, t_fn, e_fn, _a2;
var Lt = (_a2 = class {
  constructor(e) {
    __privateAdd(this, _Lt_instances);
    this.stack = [e];
  }
  get key() {
    let { stack: e, siblings: r } = this;
    return y(0, e, r === null ? -2 : -4) ?? null;
  }
  get index() {
    return this.siblings === null ? null : y(0, this.stack, -2);
  }
  get node() {
    return y(0, this.stack, -1);
  }
  get parent() {
    return this.getNode(1);
  }
  get grandparent() {
    return this.getNode(2);
  }
  get isInArray() {
    return this.siblings !== null;
  }
  get siblings() {
    let { stack: e } = this, r = y(0, e, -3);
    return Array.isArray(r) ? r : null;
  }
  get next() {
    let { siblings: e } = this;
    return e === null ? null : e[this.index + 1];
  }
  get previous() {
    let { siblings: e } = this;
    return e === null ? null : e[this.index - 1];
  }
  get isFirst() {
    return this.index === 0;
  }
  get isLast() {
    let { siblings: e, index: r } = this;
    return e !== null && r === e.length - 1;
  }
  get isRoot() {
    return this.stack.length === 1;
  }
  get root() {
    return this.stack[0];
  }
  get ancestors() {
    return [...__privateMethod(this, _Lt_instances, e_fn).call(this)];
  }
  getName() {
    let { stack: e } = this, { length: r } = e;
    return r > 1 ? y(0, e, -2) : null;
  }
  getValue() {
    return y(0, this.stack, -1);
  }
  getNode(e = 0) {
    let r = __privateMethod(this, _Lt_instances, t_fn).call(this, e);
    return r === -1 ? null : this.stack[r];
  }
  getParentNode(e = 0) {
    return this.getNode(e + 1);
  }
  call(e, ...r) {
    let { stack: n } = this, { length: u } = n, o = y(0, n, -1);
    for (let i of r) o = o?.[i], n.push(i, o);
    try {
      return e(this);
    } finally {
      n.length = u;
    }
  }
  callParent(e, r = 0) {
    let n = __privateMethod(this, _Lt_instances, t_fn).call(this, r + 1), u = this.stack.splice(n + 1);
    try {
      return e(this);
    } finally {
      this.stack.push(...u);
    }
  }
  each(e, ...r) {
    let { stack: n } = this, { length: u } = n, o = y(0, n, -1);
    for (let i of r) o = o[i], n.push(i, o);
    try {
      for (let i = 0; i < o.length; ++i) n.push(i, o[i]), e(this, i, o), n.length -= 2;
    } finally {
      n.length = u;
    }
  }
  map(e, ...r) {
    let n = [];
    return this.each((u, o, i) => {
      n[o] = e(u, o, i);
    }, ...r), n;
  }
  match(...e) {
    let r = this.stack.length - 1, n = null, u = this.stack[r--];
    for (let o of e) {
      if (u === void 0) return false;
      let i = null;
      if (typeof n == "number" && (i = n, n = this.stack[r--], u = this.stack[r--]), o && !o(u, n, i)) return false;
      n = this.stack[r--], u = this.stack[r--];
    }
    return true;
  }
  findAncestor(e) {
    for (let r of __privateMethod(this, _Lt_instances, e_fn).call(this)) if (e(r)) return r;
  }
  hasAncestor(e) {
    for (let r of __privateMethod(this, _Lt_instances, e_fn).call(this)) if (e(r)) return true;
    return false;
  }
}, _Lt_instances = new WeakSet(), t_fn = function(e) {
  let { stack: r } = this;
  for (let n = r.length - 1; n >= 0; n -= 2) if (!Array.isArray(r[n]) && --e < 0) return n;
  return -1;
}, e_fn = function* () {
  let { stack: e } = this;
  for (let r = e.length - 3; r >= 0; r -= 2) {
    let n = e[r];
    Array.isArray(n) || (yield n);
  }
}, _a2);
var en = Lt;
function fo(t) {
  return Array.isArray(t) && t.length > 0;
}
var rt = fo;
function lo(t) {
  return t !== null && typeof t == "object";
}
var ge = lo;
function _e2(t) {
  return (e, r, n) => {
    if (r === false) return false;
    let u = !!n?.backwards, { length: o } = e, i = r;
    for (; i >= 0 && i < o; ) {
      let D2 = e.charAt(i);
      if (t instanceof RegExp) {
        if (!t.test(D2)) return i;
      } else if (!t.includes(D2)) return i;
      u ? i-- : i++;
    }
    return i === -1 || i === o ? i : false;
  };
}
var tn = _e2(/\s/);
var j = _e2(" 	");
var nt = _e2(",; 	");
var ut = _e2(/[^\n\r]/);
var rn = (t) => t === `
` || t === "\r" || t === "\u2028" || t === "\u2029";
function po(t, e, r) {
  if (e === false) return false;
  let n = !!r?.backwards, u = t.charAt(e);
  if (n) {
    if (t.charAt(e - 1) === "\r" && u === `
`) return e - 2;
    if (rn(u)) return e - 1;
  } else {
    if (u === "\r" && t.charAt(e + 1) === `
`) return e + 2;
    if (rn(u)) return e + 1;
  }
  return e;
}
var $ = po;
function mo(t, e, r = {}) {
  let n = j(t, r.backwards ? e - 1 : e, r), u = $(t, n, r);
  return n !== u;
}
var H = mo;
function* ye(t, e) {
  let { getVisitorKeys: r, filter: n = () => true } = e, u = (o) => ge(o) && n(o);
  for (let o of r(t)) {
    let i = t[o];
    if (Array.isArray(i)) for (let D2 of i) u(D2) && (yield D2);
    else u(i) && (yield i);
  }
}
function* nn(t, e) {
  let r = [t];
  for (let n = 0; n < r.length; n++) {
    let u = r[n];
    for (let o of ye(u, e)) yield o, r.push(o);
  }
}
function un(t, e) {
  return ye(t, e).next().done;
}
function Fo(t, e, r) {
  let { filter: n } = r;
  if (!n) return [];
  let u, o = (r.getChildren?.(t, r) ?? [...ye(t, { getVisitorKeys: r.getVisitorKeys })]).flatMap((s) => (u ?? (u = [t, ...e]), n(s, u) ? [s] : on(s, u, r))), { locStart: i, locEnd: D2 } = r;
  return o.sort((s, a) => i(s) - i(a) || D2(s) - D2(a)), o;
}
function on(t, e, r) {
  return Fe(r.cache, t, (n) => Fo(n, e, r));
}
var ot = on;
function Eo(t) {
  let e = t.type || t.kind || "(unknown type)", r = String(t.name || t.id && (typeof t.id == "object" ? t.id.name : t.id) || t.key && (typeof t.key == "object" ? t.key.name : t.key) || t.value && (typeof t.value == "object" ? "" : String(t.value)) || t.operator || "");
  return r.length > 20 && (r = r.slice(0, 19) + "\u2026"), e + (r ? " " + r : "");
}
function Mt(t, e) {
  (t.comments ?? (t.comments = [])).push(e), e.printed = false, e.nodeDescription = Eo(t);
}
function ce(t, e) {
  e.leading = true, e.trailing = false, Mt(t, e);
}
function re(t, e, r) {
  e.leading = false, e.trailing = false, r && (e.marker = r), Mt(t, e);
}
function fe(t, e) {
  e.leading = false, e.trailing = true, Mt(t, e);
}
var Ut = /* @__PURE__ */ new WeakMap();
function Dn(t, e, r, n, u = []) {
  let { locStart: o, locEnd: i } = r, D2 = o(e), s = i(e), a = ot(t, u, { cache: Ut, locStart: o, locEnd: i, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes }), c, p2, l = 0, m2 = a.length;
  for (; l < m2; ) {
    let f = l + m2 >> 1, F2 = a[f], d = o(F2), E2 = i(F2);
    if (d <= D2 && s <= E2) return Dn(F2, e, r, F2, [F2, ...u]);
    if (E2 <= D2) {
      c = F2, l = f + 1;
      continue;
    }
    if (s <= d) {
      p2 = F2, m2 = f;
      continue;
    }
    throw new Error("Comment location overlaps with node location");
  }
  if (n?.type === "TemplateLiteral") {
    let { quasis: f } = n, F2 = jt(f, e, r);
    c && jt(f, c, r) !== F2 && (c = null), p2 && jt(f, p2, r) !== F2 && (p2 = null);
  }
  return { enclosingNode: n, precedingNode: c, followingNode: p2 };
}
var Yt = () => false;
function an(t, e) {
  let { comments: r } = t;
  if (delete t.comments, !rt(r) || !e.printer.canAttachComment) return;
  let n = [], { printer: { features: { experimental_avoidAstMutation: u }, handleComments: o = {} }, originalText: i } = e, { ownLine: D2 = Yt, endOfLine: s = Yt, remaining: a = Yt } = o, c = r.map((l, m2) => ({ ...Dn(t, l, e), comment: l, text: i, options: e, ast: t, isLastComment: r.length - 1 === m2, placement: void 0 })), p2 = !u;
  for (let [l, m2] of c.entries()) {
    let { comment: f, precedingNode: F2, enclosingNode: d, followingNode: E2, text: C2, options: h, ast: _, isLastComment: P2 } = m2, A2 = Co(C2, h, c, l) ? "ownLine" : ho(C2, h, c, l) ? "endOfLine" : "remaining", B2;
    if (u ? (m2.placement = A2, B2 = [m2]) : B2 = [f, C2, h, _, P2], p2 && (f.enclosingNode = d, f.precedingNode = F2, f.followingNode = E2), f.placement = A2, A2 === "ownLine") D2(...B2) || (E2 ? ce(E2, f) : F2 ? fe(F2, f) : d ? re(d, f) : re(_, f));
    else if (A2 === "endOfLine") s(...B2) || (F2 ? fe(F2, f) : E2 ? ce(E2, f) : d ? re(d, f) : re(_, f));
    else if (!a(...B2)) if (F2 && E2) {
      let J2 = n.length;
      J2 > 0 && n[J2 - 1].followingNode !== E2 && sn(n, h), n.push(m2);
    } else F2 ? fe(F2, f) : E2 ? ce(E2, f) : d ? re(d, f) : re(_, f);
  }
  if (sn(n, e), p2) for (let l of r) delete l.precedingNode, delete l.enclosingNode, delete l.followingNode;
}
var cn = (t) => !/[\S\n\u2028\u2029]/.test(t);
function Co(t, e, r, n) {
  let { comment: u, precedingNode: o } = r[n], { locStart: i, locEnd: D2 } = e, s = i(u);
  if (o) for (let a = n - 1; a >= 0; a--) {
    let { comment: c, precedingNode: p2 } = r[a];
    if (p2 !== o || !cn(t.slice(D2(c), s))) break;
    s = i(c);
  }
  return H(t, s, { backwards: true });
}
function ho(t, e, r, n) {
  let { comment: u, followingNode: o } = r[n], { locStart: i, locEnd: D2 } = e, s = D2(u);
  if (o) for (let a = n + 1; a < r.length; a++) {
    let { comment: c, followingNode: p2 } = r[a];
    if (p2 !== o || !cn(t.slice(s, i(c)))) break;
    s = D2(c);
  }
  return H(t, s);
}
function sn(t, e) {
  let r = t.length;
  if (r === 0) return;
  let { precedingNode: n, followingNode: u } = t[0], o = e.locStart(u), i;
  for (i = r; i > 0; --i) {
    let { comment: D2, precedingNode: s, followingNode: a } = t[i - 1];
    k(s, n), k(a, u);
    let c = e.originalText.slice(e.locEnd(D2), o);
    if (e.printer.isGap?.(c, e) ?? /^[\s(]*$/.test(c)) o = e.locStart(D2);
    else break;
  }
  for (let [D2, { comment: s }] of t.entries()) D2 < i ? fe(n, s) : ce(u, s);
  for (let D2 of [n, u]) D2.comments && D2.comments.length > 1 && D2.comments.sort((s, a) => e.locStart(s) - e.locStart(a));
  t.length = 0;
}
function jt(t, e, r) {
  let n = r.locStart(e) - 1;
  for (let u = 1; u < t.length; ++u) if (n < r.locStart(t[u])) return u - 1;
  return 0;
}
function go(t, e) {
  let r = e - 1;
  r = j(t, r, { backwards: true }), r = $(t, r, { backwards: true }), r = j(t, r, { backwards: true });
  let n = $(t, r, { backwards: true });
  return r !== n;
}
var ve = go;
var fn = () => true;
function ln(t, e) {
  let r = t.node;
  return r.printed = true, e.printer.printComment(t, e);
}
function _o(t, e) {
  let r = t.node, n = [ln(t, e)], { printer: u, originalText: o, locStart: i, locEnd: D2 } = e;
  if (u.isBlockComment?.(r)) {
    let c = " ";
    H(o, D2(r)) && (H(o, i(r), { backwards: true }) ? c = W : c = Ze), n.push(c);
  } else n.push(W);
  let a = $(o, j(o, D2(r)));
  return a !== false && H(o, a) && n.push(W), n;
}
function yo(t, e, r) {
  let n = t.node, u = ln(t, e), { printer: o, originalText: i, locStart: D2 } = e, s = o.isBlockComment?.(n);
  if (r?.hasLineSuffix && !r?.isBlock || H(i, D2(n), { backwards: true })) {
    let a = ve(i, D2(n));
    return { doc: Ie([W, a ? W : "", u]), isBlock: s, hasLineSuffix: true };
  }
  return !s || r?.hasLineSuffix ? { doc: [Ie([" ", u]), ae], isBlock: s, hasLineSuffix: true } : { doc: [" ", u], isBlock: s, hasLineSuffix: false };
}
function Ao(t, e, r) {
  let n = e[/* @__PURE__ */ Symbol.for("printedComments")], u = r?.filter ?? fn, o = new Set(t.node?.comments?.filter((i) => !n?.has(i) && i.leading && u(i)));
  return o.size === 0 ? "" : t.map(({ node: i }) => o.has(i) ? _o(t, e) : "", "comments").filter(Boolean);
}
function xo(t, e, r) {
  let n = t.node?.comments, u = new Set(n?.filter((c) => c.trailing)), o = e[/* @__PURE__ */ Symbol.for("printedComments")], i = r?.filter ?? fn, D2 = new Set(n?.filter((c) => u.has(c) && !o?.has(c) && i(c)));
  if (D2.size === 0) return "";
  let s = [], a;
  return t.each(({ node: c }) => {
    u.has(c) && (a = yo(t, e, a), D2.has(c) && s.push(a.doc));
  }, "comments"), s;
}
function pn(t, e, r, n) {
  let u = Ao(t, r, n), o = xo(t, r, n);
  return u || o ? Ee(e, (i) => [u, i, o]) : e;
}
function mn(t) {
  let { [ue]: e, [/* @__PURE__ */ Symbol.for("printedComments")]: r } = t;
  for (let n of e) {
    if (!n.printed && !r.has(n)) throw new Error('Comment "' + n.value.trim() + '" was not printed. Please report this error!');
    delete n.printed;
  }
}
var dn = () => k;
var Le = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "ConfigError");
  }
};
var Me = class extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "UndefinedParserError");
  }
};
var Bo = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty);
var le = Bo;
var Fn = { checkIgnorePragma: { category: "Special", type: "boolean", default: false, description: "Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.", cliCategory: "Other" }, cursorOffset: { category: "Special", type: "int", default: -1, range: { start: -1, end: 1 / 0, step: 1 }, description: "Print (to stderr) where a cursor at the given position would move to after formatting.", cliCategory: "Editor" }, endOfLine: { category: "Global", type: "choice", default: "lf", description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)` }] }, filepath: { category: "Special", type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: "Other", cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { category: "Special", type: "boolean", default: false, description: "Insert @format pragma into file's first docblock comment.", cliCategory: "Other" }, parser: { category: "Global", type: "choice", default: void 0, description: "Which parser to use.", exception: (t) => typeof t == "string" || typeof t == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", description: "JavaScript" }, { value: "babel-flow", description: "Flow" }, { value: "babel-ts", description: "TypeScript" }, { value: "typescript", description: "TypeScript" }, { value: "acorn", description: "JavaScript" }, { value: "espree", description: "JavaScript" }, { value: "meriyah", description: "JavaScript" }, { value: "css", description: "CSS" }, { value: "less", description: "Less" }, { value: "scss", description: "SCSS" }, { value: "json", description: "JSON" }, { value: "json5", description: "JSON5" }, { value: "jsonc", description: "JSON with Comments" }, { value: "json-stringify", description: "JSON.stringify" }, { value: "graphql", description: "GraphQL" }, { value: "markdown", description: "Markdown" }, { value: "mdx", description: "MDX" }, { value: "vue", description: "Vue" }, { value: "yaml", description: "YAML" }, { value: "glimmer", description: "Ember / Handlebars" }, { value: "html", description: "HTML" }, { value: "angular", description: "Angular" }, { value: "lwc", description: "Lightning Web Components" }, { value: "mjml", description: "MJML" }] }, plugins: { type: "path", array: true, default: [{ value: [] }], category: "Global", description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (t) => typeof t == "string" || typeof t == "object", cliName: "plugin", cliCategory: "Config" }, printWidth: { category: "Global", type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: 1 / 0, step: 1 } }, rangeEnd: { category: "Special", type: "int", default: 1 / 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`, cliCategory: "Editor" }, rangeStart: { category: "Special", type: "int", default: 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`, cliCategory: "Editor" }, requirePragma: { category: "Special", type: "boolean", default: false, description: "Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.", cliCategory: "Other" }, tabWidth: { type: "int", category: "Global", default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: 1 / 0, step: 1 } }, useTabs: { category: "Global", type: "boolean", default: false, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { category: "Global", type: "choice", default: "auto", description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
function it({ plugins: t = [], showDeprecated: e = false } = {}) {
  let r = t.flatMap((u) => u.languages ?? []), n = [];
  for (let u of No(Object.assign({}, ...t.map(({ options: o }) => o), Fn))) !e && u.deprecated || (Array.isArray(u.choices) && (e || (u.choices = u.choices.filter((o) => !o.deprecated)), u.name === "parser" && (u.choices = [...u.choices, ...To(u.choices, r, t)])), u.pluginDefaults = Object.fromEntries(t.filter((o) => o.defaultOptions?.[u.name] !== void 0).map((o) => [o.name, o.defaultOptions[u.name]])), n.push(u));
  return { languages: r, options: n };
}
function* To(t, e, r) {
  let n = new Set(t.map((u) => u.value));
  for (let u of e) if (u.parsers) {
    for (let o of u.parsers) if (!n.has(o)) {
      n.add(o);
      let i = r.find((s) => s.parsers && le(s.parsers, o)), D2 = u.name;
      i?.name && (D2 += ` (plugin: ${i.name})`), yield { value: o, description: D2 };
    }
  }
}
function No(t) {
  let e = [];
  for (let [r, n] of Object.entries(t)) {
    let u = { name: r, ...n };
    Array.isArray(u.default) && (u.default = y(0, u.default, -1).value), e.push(u);
  }
  return e;
}
var wo = Array.prototype.toReversed ?? function() {
  return [...this].reverse();
};
var Oo = X("toReversed", function() {
  if (Array.isArray(this)) return wo;
});
var En = Oo;
function Po() {
  let t = globalThis, e = t.process?.platform;
  if (typeof e == "string") return e.startsWith("win");
  let r = t.Deno?.build?.os;
  return typeof r == "string" ? r === "windows" : t.navigator?.platform?.startsWith("Win") ?? false;
}
var So = Po();
function Cn(t) {
  if (t = t instanceof URL ? t : new URL(t), t.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${t.protocol}"`);
  return t;
}
function bo(t) {
  return t = Cn(t), decodeURIComponent(t.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function ko(t) {
  t = Cn(t);
  let e = decodeURIComponent(t.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  return t.hostname !== "" && (e = `\\\\${t.hostname}${e}`), e;
}
function Vt(t) {
  return So ? ko(t) : bo(t);
}
var hn = (t) => String(t).split(/[/\\]/).pop();
var gn = (t) => String(t).startsWith("file:");
function _n2(t, e) {
  if (!e) return;
  let r = hn(e).toLowerCase();
  return t.find(({ filenames: n }) => n?.some((u) => u.toLowerCase() === r)) ?? t.find(({ extensions: n }) => n?.some((u) => r.endsWith(u)));
}
function Io(t, e) {
  if (e) return t.find(({ name: r }) => r.toLowerCase() === e) ?? t.find(({ aliases: r }) => r?.includes(e)) ?? t.find(({ extensions: r }) => r?.includes(`.${e}`));
}
var Ro = void 0;
function yn(t, e) {
  if (e) {
    if (gn(e)) try {
      e = Vt(e);
    } catch {
      return;
    }
    if (typeof e == "string") return t.find(({ isSupported: r }) => r?.({ filepath: e }));
  }
}
function vo(t, e) {
  let r = En(0, t.plugins).flatMap((u) => u.languages ?? []);
  return (Io(r, e.language) ?? _n2(r, e.physicalFile) ?? _n2(r, e.file) ?? yn(r, e.physicalFile) ?? yn(r, e.file) ?? Ro?.(r, e.physicalFile))?.parsers[0];
}
var st = vo;
var ie = { key: (t) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(t) ? t : JSON.stringify(t), value(t) {
  if (t === null || typeof t != "object") return JSON.stringify(t);
  if (Array.isArray(t)) return `[${t.map((r) => ie.value(r)).join(", ")}]`;
  let e = Object.keys(t);
  return e.length === 0 ? "{}" : `{ ${e.map((r) => `${ie.key(r)}: ${ie.value(t[r])}`).join(", ")} }`;
}, pair: ({ key: t, value: e }) => ie.value({ [t]: e }) };
var An = new Proxy(String, { get: () => An });
var z = An;
var xn = (t, e, { descriptor: r }) => {
  let n = [`${z.yellow(typeof t == "string" ? r.key(t) : r.pair(t))} is deprecated`];
  return e && n.push(`we now treat it as ${z.blue(typeof e == "string" ? r.key(e) : r.pair(e))}`), n.join("; ") + ".";
};
var Dt = /* @__PURE__ */ Symbol.for("vnopts.VALUE_NOT_EXIST");
var Ae = /* @__PURE__ */ Symbol.for("vnopts.VALUE_UNCHANGED");
var Bn = " ".repeat(2);
var Nn = (t, e, r) => {
  let { text: n, list: u } = r.normalizeExpectedResult(r.schemas[t].expected(r)), o = [];
  return n && o.push(Tn(t, e, n, r.descriptor)), u && o.push([Tn(t, e, u.title, r.descriptor)].concat(u.values.map((i) => wn(i, r.loggerPrintWidth))).join(`
`)), On(o, r.loggerPrintWidth);
};
function Tn(t, e, r, n) {
  return [`Invalid ${z.red(n.key(t))} value.`, `Expected ${z.blue(r)},`, `but received ${e === Dt ? z.gray("nothing") : z.red(n.value(e))}.`].join(" ");
}
function wn({ text: t, list: e }, r) {
  let n = [];
  return t && n.push(`- ${z.blue(t)}`), e && n.push([`- ${z.blue(e.title)}:`].concat(e.values.map((u) => wn(u, r - Bn.length).replace(/^|\n/g, `$&${Bn}`))).join(`
`)), On(n, r);
}
function On(t, e) {
  if (t.length === 1) return t[0];
  let [r, n] = t, [u, o] = t.map((i) => i.split(`
`, 1)[0].length);
  return u > e && u > o ? n : r;
}
var xe = [];
var Wt = [];
function at(t, e, r) {
  if (t === e) return 0;
  let n = r?.maxDistance, u = t;
  t.length > e.length && (t = e, e = u);
  let o = t.length, i = e.length;
  for (; o > 0 && t.charCodeAt(~-o) === e.charCodeAt(~-i); ) o--, i--;
  let D2 = 0;
  for (; D2 < o && t.charCodeAt(D2) === e.charCodeAt(D2); ) D2++;
  if (o -= D2, i -= D2, n !== void 0 && i - o > n) return n;
  if (o === 0) return n !== void 0 && i > n ? n : i;
  let s, a, c, p2, l = 0, m2 = 0;
  for (; l < o; ) Wt[l] = t.charCodeAt(D2 + l), xe[l] = ++l;
  for (; m2 < i; ) {
    for (s = e.charCodeAt(D2 + m2), c = m2++, a = m2, l = 0; l < o; l++) p2 = s === Wt[l] ? c : c + 1, c = xe[l], a = xe[l] = c > a ? p2 > a ? a + 1 : p2 : p2 > c ? c + 1 : p2;
    if (n !== void 0) {
      let f = a;
      for (l = 0; l < o; l++) xe[l] < f && (f = xe[l]);
      if (f > n) return n;
    }
  }
  return xe.length = o, Wt.length = o, n !== void 0 && a > n ? n : a;
}
function Pn(t, e, r) {
  if (!Array.isArray(e) || e.length === 0) return;
  let n = r?.maxDistance, u = t.length;
  for (let s of e) if (s === t) return s;
  if (n === 0) return;
  let o, i = Number.POSITIVE_INFINITY, D2 = /* @__PURE__ */ new Set();
  for (let s of e) {
    if (D2.has(s)) continue;
    D2.add(s);
    let a = Math.abs(s.length - u);
    if (a >= i || n !== void 0 && a > n) continue;
    let c = Number.isFinite(i) ? n === void 0 ? i : Math.min(i, n) : n, p2 = c === void 0 ? at(t, s) : at(t, s, { maxDistance: c });
    if (n !== void 0 && p2 > n) continue;
    let l = p2;
    if (c !== void 0 && p2 === c && c === n && (l = at(t, s)), l < i && (i = l, o = s, i === 0)) break;
  }
  if (!(n !== void 0 && i > n)) return o;
}
var ct = (t, e, { descriptor: r, logger: n, schemas: u }) => {
  let o = [`Ignored unknown option ${z.yellow(r.pair({ key: t, value: e }))}.`], i = Pn(t, Object.keys(u), { maxDistance: 3 });
  i && o.push(`Did you mean ${z.blue(r.key(i))}?`), n.warn(o.join(" "));
};
var Lo = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
function Mo(t, e) {
  let r = new t(e), n = Object.create(r);
  for (let u of Lo) u in e && (n[u] = Yo(e[u], r, O.prototype[u].length));
  return n;
}
var O = class {
  static create(e) {
    return Mo(this, e);
  }
  constructor(e) {
    this.name = e.name;
  }
  default(e) {
  }
  expected(e) {
    return "nothing";
  }
  validate(e, r) {
    return false;
  }
  deprecated(e, r) {
    return false;
  }
  forward(e, r) {
  }
  redirect(e, r) {
  }
  overlap(e, r, n) {
    return e;
  }
  preprocess(e, r) {
    return e;
  }
  postprocess(e, r) {
    return Ae;
  }
};
function Yo(t, e, r) {
  return typeof t == "function" ? (...n) => t(...n.slice(0, r - 1), e, ...n.slice(r - 1)) : () => t;
}
var ft = class extends O {
  constructor(e) {
    super(e), this._sourceName = e.sourceName;
  }
  expected(e) {
    return e.schemas[this._sourceName].expected(e);
  }
  validate(e, r) {
    return r.schemas[this._sourceName].validate(e, r);
  }
  redirect(e, r) {
    return this._sourceName;
  }
};
var lt = class extends O {
  expected() {
    return "anything";
  }
  validate() {
    return true;
  }
};
var pt = class extends O {
  constructor({ valueSchema: e, name: r = e.name, ...n }) {
    super({ ...n, name: r }), this._valueSchema = e;
  }
  expected(e) {
    let { text: r, list: n } = e.normalizeExpectedResult(this._valueSchema.expected(e));
    return { text: r && `an array of ${r}`, list: n && { title: "an array of the following values", values: [{ list: n }] } };
  }
  validate(e, r) {
    if (!Array.isArray(e)) return false;
    let n = [];
    for (let u of e) {
      let o = r.normalizeValidateResult(this._valueSchema.validate(u, r), u);
      o !== true && n.push(o.value);
    }
    return n.length === 0 ? true : { value: n };
  }
  deprecated(e, r) {
    let n = [];
    for (let u of e) {
      let o = r.normalizeDeprecatedResult(this._valueSchema.deprecated(u, r), u);
      o !== false && n.push(...o.map(({ value: i }) => ({ value: [i] })));
    }
    return n;
  }
  forward(e, r) {
    let n = [];
    for (let u of e) {
      let o = r.normalizeForwardResult(this._valueSchema.forward(u, r), u);
      n.push(...o.map(Sn));
    }
    return n;
  }
  redirect(e, r) {
    let n = [], u = [];
    for (let o of e) {
      let i = r.normalizeRedirectResult(this._valueSchema.redirect(o, r), o);
      "remain" in i && n.push(i.remain), u.push(...i.redirect.map(Sn));
    }
    return n.length === 0 ? { redirect: u } : { redirect: u, remain: n };
  }
  overlap(e, r) {
    return e.concat(r);
  }
};
function Sn({ from: t, to: e }) {
  return { from: [t], to: e };
}
var mt = class extends O {
  expected() {
    return "true or false";
  }
  validate(e) {
    return typeof e == "boolean";
  }
};
function kn(t, e) {
  let r = /* @__PURE__ */ Object.create(null);
  for (let n of t) {
    let u = n[e];
    if (r[u]) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
    r[u] = n;
  }
  return r;
}
function In(t, e) {
  let r = /* @__PURE__ */ new Map();
  for (let n of t) {
    let u = n[e];
    if (r.has(u)) throw new Error(`Duplicate ${e} ${JSON.stringify(u)}`);
    r.set(u, n);
  }
  return r;
}
function Rn() {
  let t = /* @__PURE__ */ Object.create(null);
  return (e) => {
    let r = JSON.stringify(e);
    return t[r] ? true : (t[r] = true, false);
  };
}
function vn(t, e) {
  let r = [], n = [];
  for (let u of t) e(u) ? r.push(u) : n.push(u);
  return [r, n];
}
function Ln(t) {
  return t === Math.floor(t);
}
function Mn(t, e) {
  if (t === e) return 0;
  let r = typeof t, n = typeof e, u = ["undefined", "object", "boolean", "number", "string"];
  return r !== n ? u.indexOf(r) - u.indexOf(n) : r !== "string" ? Number(t) - Number(e) : t.localeCompare(e);
}
function Yn(t) {
  return (...e) => {
    let r = t(...e);
    return typeof r == "string" ? new Error(r) : r;
  };
}
function $t(t) {
  return t === void 0 ? {} : t;
}
function zt(t) {
  if (typeof t == "string") return { text: t };
  let { text: e, list: r } = t;
  return jo((e || r) !== void 0, "Unexpected `expected` result, there should be at least one field."), r ? { text: e, list: { title: r.title, values: r.values.map(zt) } } : { text: e };
}
function Gt(t, e) {
  return t === true ? true : t === false ? { value: e } : t;
}
function Kt(t, e, r = false) {
  return t === false ? false : t === true ? r ? true : [{ value: e }] : "value" in t ? [t] : t.length === 0 ? false : t;
}
function bn(t, e) {
  return typeof t == "string" || "key" in t ? { from: e, to: t } : "from" in t ? { from: t.from, to: t.to } : { from: e, to: t.to };
}
function dt(t, e) {
  return t === void 0 ? [] : Array.isArray(t) ? t.map((r) => bn(r, e)) : [bn(t, e)];
}
function Ht(t, e) {
  let r = dt(typeof t == "object" && "redirect" in t ? t.redirect : t, e);
  return r.length === 0 ? { remain: e, redirect: r } : typeof t == "object" && "remain" in t ? { remain: t.remain, redirect: r } : { redirect: r };
}
function jo(t, e) {
  if (!t) throw new Error(e);
}
var Ft = class extends O {
  constructor(e) {
    super(e), this._choices = In(e.choices.map((r) => r && typeof r == "object" ? r : { value: r }), "value");
  }
  expected({ descriptor: e }) {
    let r = Array.from(this._choices.keys()).map((i) => this._choices.get(i)).filter(({ hidden: i }) => !i).map((i) => i.value).sort(Mn).map(e.value), n = r.slice(0, -2), u = r.slice(-2);
    return { text: n.concat(u.join(" or ")).join(", "), list: { title: "one of the following values", values: r } };
  }
  validate(e) {
    return this._choices.has(e);
  }
  deprecated(e) {
    let r = this._choices.get(e);
    return r && r.deprecated ? { value: e } : false;
  }
  forward(e) {
    let r = this._choices.get(e);
    return r ? r.forward : void 0;
  }
  redirect(e) {
    let r = this._choices.get(e);
    return r ? r.redirect : void 0;
  }
};
var Et = class extends O {
  expected() {
    return "a number";
  }
  validate(e, r) {
    return typeof e == "number";
  }
};
var Ct = class extends Et {
  expected() {
    return "an integer";
  }
  validate(e, r) {
    return r.normalizeValidateResult(super.validate(e, r), e) === true && Ln(e);
  }
};
var Ye = class extends O {
  expected() {
    return "a string";
  }
  validate(e) {
    return typeof e == "string";
  }
};
var jn = ie;
var Un = ct;
var Vn = Nn;
var Wn = xn;
var ht = class {
  constructor(e, r) {
    let { logger: n = console, loggerPrintWidth: u = 80, descriptor: o = jn, unknown: i = Un, invalid: D2 = Vn, deprecated: s = Wn, missing: a = () => false, required: c = () => false, preprocess: p2 = (m2) => m2, postprocess: l = () => Ae } = r || {};
    this._utils = { descriptor: o, logger: n || { warn: () => {
    } }, loggerPrintWidth: u, schemas: kn(e, "name"), normalizeDefaultResult: $t, normalizeExpectedResult: zt, normalizeDeprecatedResult: Kt, normalizeForwardResult: dt, normalizeRedirectResult: Ht, normalizeValidateResult: Gt }, this._unknownHandler = i, this._invalidHandler = Yn(D2), this._deprecatedHandler = s, this._identifyMissing = (m2, f) => !(m2 in f) || a(m2, f), this._identifyRequired = c, this._preprocess = p2, this._postprocess = l, this.cleanHistory();
  }
  cleanHistory() {
    this._hasDeprecationWarned = Rn();
  }
  normalize(e) {
    let r = {}, u = [this._preprocess(e, this._utils)], o = () => {
      for (; u.length !== 0; ) {
        let i = u.shift(), D2 = this._applyNormalization(i, r);
        u.push(...D2);
      }
    };
    o();
    for (let i of Object.keys(this._utils.schemas)) {
      let D2 = this._utils.schemas[i];
      if (!(i in r)) {
        let s = $t(D2.default(this._utils));
        "value" in s && u.push({ [i]: s.value });
      }
    }
    o();
    for (let i of Object.keys(this._utils.schemas)) {
      if (!(i in r)) continue;
      let D2 = this._utils.schemas[i], s = r[i], a = D2.postprocess(s, this._utils);
      a !== Ae && (this._applyValidation(a, i, D2), r[i] = a);
    }
    return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
  }
  _applyNormalization(e, r) {
    let n = [], { knownKeys: u, unknownKeys: o } = this._partitionOptionKeys(e);
    for (let i of u) {
      let D2 = this._utils.schemas[i], s = D2.preprocess(e[i], this._utils);
      this._applyValidation(s, i, D2);
      let a = ({ from: m2, to: f }) => {
        n.push(typeof f == "string" ? { [f]: m2 } : { [f.key]: f.value });
      }, c = ({ value: m2, redirectTo: f }) => {
        let F2 = Kt(D2.deprecated(m2, this._utils), s, true);
        if (F2 !== false) if (F2 === true) this._hasDeprecationWarned(i) || this._utils.logger.warn(this._deprecatedHandler(i, f, this._utils));
        else for (let { value: d } of F2) {
          let E2 = { key: i, value: d };
          if (!this._hasDeprecationWarned(E2)) {
            let C2 = typeof f == "string" ? { key: f, value: d } : f;
            this._utils.logger.warn(this._deprecatedHandler(E2, C2, this._utils));
          }
        }
      };
      dt(D2.forward(s, this._utils), s).forEach(a);
      let l = Ht(D2.redirect(s, this._utils), s);
      if (l.redirect.forEach(a), "remain" in l) {
        let m2 = l.remain;
        r[i] = i in r ? D2.overlap(r[i], m2, this._utils) : m2, c({ value: m2 });
      }
      for (let { from: m2, to: f } of l.redirect) c({ value: m2, redirectTo: f });
    }
    for (let i of o) {
      let D2 = e[i];
      this._applyUnknownHandler(i, D2, r, (s, a) => {
        n.push({ [s]: a });
      });
    }
    return n;
  }
  _applyRequiredCheck(e) {
    for (let r of Object.keys(this._utils.schemas)) if (this._identifyMissing(r, e) && this._identifyRequired(r)) throw this._invalidHandler(r, Dt, this._utils);
  }
  _partitionOptionKeys(e) {
    let [r, n] = vn(Object.keys(e).filter((u) => !this._identifyMissing(u, e)), (u) => u in this._utils.schemas);
    return { knownKeys: r, unknownKeys: n };
  }
  _applyValidation(e, r, n) {
    let u = Gt(n.validate(e, this._utils), e);
    if (u !== true) throw this._invalidHandler(r, u.value, this._utils);
  }
  _applyUnknownHandler(e, r, n, u) {
    let o = this._unknownHandler(e, r, this._utils);
    if (o) for (let i of Object.keys(o)) {
      if (this._identifyMissing(i, o)) continue;
      let D2 = o[i];
      i in this._utils.schemas ? u(i, D2) : n[i] = D2;
    }
  }
  _applyPostprocess(e) {
    let r = this._postprocess(e, this._utils);
    if (r !== Ae) {
      if (r.delete) for (let n of r.delete) delete e[n];
      if (r.override) {
        let { knownKeys: n, unknownKeys: u } = this._partitionOptionKeys(r.override);
        for (let o of n) {
          let i = r.override[o];
          this._applyValidation(i, o, this._utils.schemas[o]), e[o] = i;
        }
        for (let o of u) {
          let i = r.override[o];
          this._applyUnknownHandler(o, i, e, (D2, s) => {
            let a = this._utils.schemas[D2];
            this._applyValidation(s, D2, a), e[D2] = s;
          });
        }
      }
    }
  }
};
var Jt;
function Uo(t, e, { logger: r = false, isCLI: n = false, passThrough: u = false, FlagSchema: o, descriptor: i } = {}) {
  if (n) {
    if (!o) throw new Error("'FlagSchema' option is required.");
    if (!i) throw new Error("'descriptor' option is required.");
  } else i = ie;
  let D2 = u ? Array.isArray(u) ? (l, m2) => u.includes(l) ? { [l]: m2 } : void 0 : (l, m2) => ({ [l]: m2 }) : (l, m2, f) => {
    let { _: F2, ...d } = f.schemas;
    return ct(l, m2, { ...f, schemas: d });
  }, s = Vo(e, { isCLI: n, FlagSchema: o }), a = new ht(s, { logger: r, unknown: D2, descriptor: i }), c = r !== false;
  c && Jt && (a._hasDeprecationWarned = Jt);
  let p2 = a.normalize(t);
  return c && (Jt = a._hasDeprecationWarned), p2;
}
function Vo(t, { isCLI: e, FlagSchema: r }) {
  let n = [];
  e && n.push(lt.create({ name: "_" }));
  for (let u of t) n.push(Wo(u, { isCLI: e, optionInfos: t, FlagSchema: r })), u.alias && e && n.push(ft.create({ name: u.alias, sourceName: u.name }));
  return n;
}
function Wo(t, { isCLI: e, optionInfos: r, FlagSchema: n }) {
  let { name: u } = t, o = { name: u }, i, D2 = {};
  switch (t.type) {
    case "int":
      i = Ct, e && (o.preprocess = Number);
      break;
    case "string":
      i = Ye;
      break;
    case "choice":
      i = Ft, o.choices = t.choices.map((s) => s?.redirect ? { ...s, redirect: { to: { key: t.name, value: s.redirect } } } : s);
      break;
    case "boolean":
      i = mt;
      break;
    case "flag":
      i = n, o.flags = r.flatMap((s) => [s.alias, s.description && s.name, s.oppositeDescription && `no-${s.name}`].filter(Boolean));
      break;
    case "path":
      i = Ye;
      break;
    default:
      throw new Error(`Unexpected type ${t.type}`);
  }
  if (t.exception ? o.validate = (s, a, c) => t.exception(s) || a.validate(s, c) : o.validate = (s, a, c) => s === void 0 || a.validate(s, c), t.redirect && (D2.redirect = (s) => s ? { to: typeof t.redirect == "string" ? t.redirect : { key: t.redirect.option, value: t.redirect.value } } : void 0), t.deprecated && (D2.deprecated = true), e && !t.array) {
    let s = o.preprocess || ((a) => a);
    o.preprocess = (a, c, p2) => c.preprocess(s(Array.isArray(a) ? y(0, a, -1) : a), p2);
  }
  return t.array ? pt.create({ ...e ? { preprocess: (s) => Array.isArray(s) ? s : [s] } : {}, ...D2, valueSchema: i.create(o) }) : i.create({ ...o, ...D2 });
}
var $n = Uo;
var $o = Array.prototype.findLast ?? function(t) {
  for (let e = this.length - 1; e >= 0; e--) {
    let r = this[e];
    if (t(r, e, this)) return r;
  }
};
var zo = X("findLast", function() {
  if (Array.isArray(this)) return $o;
});
var qt = zo;
var zn = /* @__PURE__ */ Symbol.for("PRETTIER_IS_FRONT_MATTER");
var Xt = [];
function Go(t) {
  return !!t?.[zn];
}
var pe = Go;
var Gn = /* @__PURE__ */ new Set(["yaml", "toml"]);
var je = ({ node: t }) => pe(t) && Gn.has(t.language);
async function Qt(t, e, r, n) {
  let { node: u } = r, { language: o } = u;
  if (!Gn.has(o)) return;
  let i = u.value.trim(), D2;
  if (i) {
    let s = o === "yaml" ? o : st(n, { language: o });
    if (!s) return;
    D2 = i ? await t(i, { parser: s }) : "";
  } else D2 = i;
  return Xe([u.startDelimiter, u.explicitLanguage ?? "", W, D2, D2 ? W : "", u.endDelimiter]);
}
function Ko(t, e) {
  return je({ node: t }) && (delete e.end, delete e.raw, delete e.value), e;
}
var Zt = Ko;
function Ho({ node: t }) {
  return t.raw;
}
var er = Ho;
var Kn = /* @__PURE__ */ new Set(["tokens", "comments", "parent", "enclosingNode", "precedingNode", "followingNode"]);
var Jo = (t) => Object.keys(t).filter((e) => !Kn.has(e));
function qo(t, e) {
  let r = t ? (n) => t(n, Kn) : Jo;
  return e ? new Proxy(r, { apply: (n, u, o) => pe(o[0]) ? Xt : Reflect.apply(n, u, o) }) : r;
}
var tr = qo;
function rr(t, e) {
  if (!e) throw new Error("parserName is required.");
  let r = qt(0, t, (u) => u.parsers && le(u.parsers, e));
  if (r) return r;
  let n = `Couldn't resolve parser "${e}".`;
  throw n += " Plugins must be explicitly added to the standalone bundle.", new Le(n);
}
function Hn(t, e) {
  if (!e) throw new Error("astFormat is required.");
  let r = qt(0, t, (u) => u.printers && le(u.printers, e));
  if (r) return r;
  let n = `Couldn't find plugin for AST format "${e}".`;
  throw n += " Plugins must be explicitly added to the standalone bundle.", new Le(n);
}
function Ue({ plugins: t, parser: e }) {
  let r = rr(t, e);
  return nr(r, e);
}
function nr(t, e) {
  let r = t.parsers[e];
  return typeof r == "function" ? r() : r;
}
async function Jn(t, e) {
  let r = t.printers[e], n = typeof r == "function" ? await r() : r;
  return Zo(n);
}
function Xo(t) {
  let { features: e, getVisitorKeys: r, embed: n, massageAstNode: u, print: o, ...i } = t;
  e = ni(e);
  let D2 = e.experimental_frontMatterSupport;
  r = tr(r, D2.massageAstNode || D2.embed || D2.print);
  let s = u;
  u && D2.massageAstNode && (s = new Proxy(u, { apply(l, m2, f) {
    return Zt(...f), Reflect.apply(l, m2, f);
  } }));
  let a = n;
  if (n) {
    let l;
    a = new Proxy(n, { get(m2, f, F2) {
      return f === "getVisitorKeys" ? (l ?? (l = n.getVisitorKeys ? tr(n.getVisitorKeys, D2.massageAstNode || D2.embed) : r), l) : Reflect.get(m2, f, F2);
    }, apply: (m2, f, F2) => D2.embed && je(...F2) ? Qt : Reflect.apply(m2, f, F2) });
  }
  let c = o;
  return D2.print && (c = new Proxy(o, { apply(l, m2, f) {
    let [F2] = f;
    return pe(F2.node) ? er(F2) : Reflect.apply(l, m2, f);
  } })), { features: e, getVisitorKeys: r, embed: a, massageAstNode: s, print: c, ...i };
}
var Qo = /* @__PURE__ */ new WeakMap();
function Zo(t) {
  return Fe(Qo, t, Xo);
}
var ei = ["clean", "embed", "print"];
var ti = Object.fromEntries(ei.map((t) => [t, false]));
function ri(t) {
  return { ...ti, ...t };
}
function ni(t) {
  return { experimental_avoidAstMutation: false, ...t, experimental_frontMatterSupport: ri(t?.experimental_frontMatterSupport) };
}
var qn = { astFormat: "estree", printer: {}, originalText: void 0, locStart: null, locEnd: null, getVisitorKeys: null };
async function ui(t, e = {}) {
  let r = { ...t };
  if (!r.parser) {
    if (!r.filepath) throw new Me("No parser and no file path given, couldn't infer a parser.");
    if (r.parser = st(r, { physicalFile: r.filepath }), !r.parser) throw new Me(`No parser could be inferred for file "${r.filepath}".`);
  }
  let n = it({ plugins: t.plugins, showDeprecated: true }).options, u = { ...qn, ...Object.fromEntries(n.filter((p2) => p2.default !== void 0).map((p2) => [p2.name, p2.default])) }, o = rr(r.plugins, r.parser), i = await nr(o, r.parser);
  r.astFormat = i.astFormat, r.locEnd = i.locEnd, r.locStart = i.locStart;
  let D2 = o.printers?.[i.astFormat] ? o : Hn(r.plugins, i.astFormat), s = await Jn(D2, i.astFormat);
  r.printer = s, r.getVisitorKeys = s.getVisitorKeys;
  let a = D2.defaultOptions ? Object.fromEntries(Object.entries(D2.defaultOptions).filter(([, p2]) => p2 !== void 0)) : {}, c = { ...u, ...a };
  for (let [p2, l] of Object.entries(c)) r[p2] ?? (r[p2] = l);
  return r.parser === "json" && (r.trailingComma = "none"), $n(r, n, { passThrough: Object.keys(qn), ...e });
}
var se = ui;
var Xn = /\r\n|[\n\r\u2028\u2029]/;
function oi(t, e, r, n) {
  let u = { column: null, line: -1, ...t.start }, o = { ...u, ...t.end }, { linesAbove: i = 2, linesBelow: D2 = 3 } = r || {}, s = u.line - n, a = u.column, c = o.line - n, p2 = o.column, l = Math.max(s - (i + 1), 0), m2 = Math.min(e.length, c + D2);
  s === -1 && (l = 0), c === -1 && (m2 = e.length);
  let f = c - s, F2 = {};
  if (f) for (let d = 0; d <= f; d++) {
    let E2 = d + s;
    if (a == null) F2[E2] = true;
    else if (d === 0) {
      let C2 = e[E2 - 1].length;
      F2[E2] = [a, C2 - a];
    } else if (d === f) F2[E2] = [0, p2];
    else {
      let C2 = e[E2 - 1].length;
      F2[E2] = [0, C2];
    }
  }
  else if (a === p2) a != null ? F2[s] = [a, 0] : F2[s] = true;
  else {
    let d = a ?? 0, E2 = p2 ?? d;
    F2[s] = [d, E2 - d];
  }
  return { start: l, end: m2, markerLines: F2 };
}
function Qn(t, e, r = {}, n) {
  let { defs: u, highlight: o } = n || { defs: { gutter: String, marker: String, message: String, reset: String }, highlight: String }, i = (r.startLine || 1) - 1, D2 = t.split(Xn), { start: s, end: a, markerLines: c } = oi(e, D2, r, i), p2 = e.start && typeof e.start.column == "number", l = String(a + i).length, f = o(t).split(Xn, a).slice(s, a).map((F2, d) => {
    let E2 = s + 1 + d, h = ` ${` ${E2 + i}`.slice(-l)} |`, _ = c[E2], P2 = !c[E2 + 1];
    if (_) {
      let A2 = "";
      if (Array.isArray(_)) {
        let B2 = F2.slice(0, _[0]).replace(/[^\t]/g, " "), J2 = _[1] || 1;
        A2 = [`
 `, u.gutter(h.replace(/\d/g, " ")), " ", B2, u.marker("^").repeat(J2)].join(""), P2 && r.message && (A2 += " " + u.message(r.message));
      }
      return [u.marker(">"), u.gutter(h), F2.length > 0 ? ` ${F2}` : "", A2].join("");
    } else return ` ${u.gutter(h)}${F2.length > 0 ? ` ${F2}` : ""}`;
  }).join(`
`);
  return r.message && !p2 && (f = `${" ".repeat(l + 1)}${r.message}
${f}`), u.reset(f);
}
function Zn(t, e, r = {}) {
  return Qn(t, e, r);
}
async function ii(t, e) {
  let r = await Ue(e), n = r.preprocess ? await r.preprocess(t, e) : t;
  e.originalText = n;
  let u;
  try {
    u = await r.parse(n, e, e);
  } catch (o) {
    si(o, t);
  }
  return { text: n, ast: u };
}
function si(t, e) {
  let { loc: r } = t;
  if (r) {
    let { start: n, end: u } = r;
    n && (n = { line: n.line, column: n.column - 1 }), u && (u = { line: u.line, column: u.column - 1 });
    let o = Zn(e, { start: n, end: u }, { highlightCode: true });
    t.message += `
` + o, t.codeFrame = o;
  }
  throw t;
}
var me = ii;
async function eu(t, e, r, n, u) {
  if (r.embeddedLanguageFormatting !== "auto") return;
  let { printer: o } = r, { embed: i } = o;
  if (!i) return;
  if (i.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed");
  let { hasPrettierIgnore: D2 } = o, { getVisitorKeys: s } = i, a = [];
  l();
  let c = t.stack;
  for (let { print: m2, node: f, pathStack: F2 } of a) try {
    t.stack = F2;
    let d = await m2(p2, e, t, r);
    d && u.set(f, d);
  } catch (d) {
    if (globalThis.PRETTIER_DEBUG) throw d;
  }
  t.stack = c;
  function p2(m2, f) {
    return Di(m2, f, r, n);
  }
  function l() {
    let { node: m2 } = t;
    if (m2 === null || typeof m2 != "object" || D2?.(t)) return;
    for (let F2 of s(m2)) Array.isArray(m2[F2]) ? t.each(l, F2) : t.call(l, F2);
    let f = i(t, r);
    if (f) {
      if (typeof f == "function") {
        a.push({ print: f, node: m2, pathStack: [...t.stack] });
        return;
      }
      u.set(m2, f);
    }
  }
}
async function Di(t, e, r, n) {
  let u = await se({ ...r, ...e, parentParser: r.parser, originalText: t, cursorOffset: void 0, rangeStart: void 0, rangeEnd: void 0 }, { passThrough: true }), { ast: o } = await me(t, u), i = await n(o, u);
  return He(i);
}
function ai(t, e, r, n) {
  let { originalText: u, [ue]: o, locStart: i, locEnd: D2, [/* @__PURE__ */ Symbol.for("printedComments")]: s } = e, { node: a } = t, c = i(a), p2 = D2(a);
  for (let m2 of o) i(m2) >= c && D2(m2) <= p2 && s.add(m2);
  let { printPrettierIgnored: l } = e.printer;
  return l ? l(t, e, r, n) : u.slice(c, p2);
}
var tu = ai;
async function Ve(t, e) {
  ({ ast: t } = await ur(t, e));
  let r = /* @__PURE__ */ new Map(), n = new en(t), u = dn(e), o = /* @__PURE__ */ new Map();
  await eu(n, D2, e, Ve, o);
  let i = await ru(n, e, D2, void 0, o);
  if (mn(e), e.cursorOffset >= 0) {
    if (e.nodeAfterCursor && !e.nodeBeforeCursor) return [ee, i];
    if (e.nodeBeforeCursor && !e.nodeAfterCursor) return [i, ee];
  }
  return i;
  function D2(a, c) {
    return a === void 0 || a === n ? s(c) : Array.isArray(a) ? n.call(() => s(c), ...a) : n.call(() => s(c), a);
  }
  function s(a) {
    u(n);
    let c = n.node;
    if (c == null) return "";
    let p2 = ge(c) && a === void 0;
    if (p2 && r.has(c)) return r.get(c);
    let l = ru(n, e, D2, a, o);
    return p2 && r.set(c, l), l;
  }
}
function ru(t, e, r, n, u) {
  let { node: o } = t, { printer: i } = e, D2;
  switch (i.hasPrettierIgnore?.(t) ? D2 = tu(t, e, r, n) : u.has(o) ? D2 = u.get(o) : D2 = i.print(t, e, r, n), o) {
    case e.cursorNode:
      D2 = Ee(D2, (s) => [ee, s, ee]);
      break;
    case e.nodeBeforeCursor:
      D2 = Ee(D2, (s) => [s, ee]);
      break;
    case e.nodeAfterCursor:
      D2 = Ee(D2, (s) => [ee, s]);
      break;
  }
  return i.printComment && rt(o.comments) && !i.willPrintOwnComments?.(t, e) && (D2 = pn(t, D2, e)), D2;
}
async function ur(t, e) {
  let r = t.comments ?? [];
  e[ue] = r, e[/* @__PURE__ */ Symbol.for("printedComments")] = /* @__PURE__ */ new Set(), an(t, e);
  let { printer: { preprocess: n } } = e;
  return t = n ? await n(t, e) : t, { ast: t, comments: r };
}
function ci(t, e) {
  let { cursorOffset: r, locStart: n, locEnd: u, getVisitorKeys: o } = e, i = (m2) => n(m2) <= r && u(m2) >= r, D2 = t, s = [t];
  for (let m2 of nn(t, { getVisitorKeys: o, filter: i })) s.push(m2), D2 = m2;
  if (un(D2, { getVisitorKeys: o })) return { cursorNode: D2 };
  let a, c, p2 = -1, l = Number.POSITIVE_INFINITY;
  for (; s.length > 0 && (a === void 0 || c === void 0); ) {
    D2 = s.pop();
    let m2 = a !== void 0, f = c !== void 0;
    for (let F2 of ye(D2, { getVisitorKeys: o })) {
      if (!m2) {
        let d = u(F2);
        d <= r && d > p2 && (a = F2, p2 = d);
      }
      if (!f) {
        let d = n(F2);
        d >= r && d < l && (c = F2, l = d);
      }
    }
  }
  return { nodeBeforeCursor: a, nodeAfterCursor: c };
}
var or = ci;
function fi(t, e) {
  let { printer: r } = e, n = r.massageAstNode;
  if (!n) return t;
  let { getVisitorKeys: u } = r, { ignoredProperties: o } = n;
  return i(t);
  function i(D2, s) {
    if (!ge(D2)) return D2;
    if (Array.isArray(D2)) return D2.map((l) => i(l, s)).filter(Boolean);
    let a = {}, c = new Set(u(D2));
    for (let l in D2) !le(D2, l) || o?.has(l) || (c.has(l) ? a[l] = i(D2[l], D2) : a[l] = D2[l]);
    let p2 = n(D2, a, s);
    if (p2 !== null) return p2 ?? a;
  }
}
var nu = fi;
var li = Array.prototype.findLastIndex ?? function(t) {
  for (let e = this.length - 1; e >= 0; e--) {
    let r = this[e];
    if (t(r, e, this)) return e;
  }
  return -1;
};
var pi = X("findLastIndex", function() {
  if (Array.isArray(this)) return li;
});
var uu = pi;
function mi(t, e) {
  return e = new Set(e), t.find((r) => su.has(r.type) && e.has(r));
}
function ou(t) {
  let e = uu(0, t, (r) => r.type !== "Program" && r.type !== "File");
  return e === -1 ? t : t.slice(0, e + 1);
}
function di(t, e, { locStart: r, locEnd: n }) {
  let [u, ...o] = t, [i, ...D2] = e;
  if (u === i) return [u, i];
  let s = r(u);
  for (let c of ou(D2)) if (r(c) >= s) i = c;
  else break;
  let a = n(i);
  for (let c of ou(o)) {
    if (n(c) <= a) u = c;
    else break;
    if (u === i) break;
  }
  return [u, i];
}
function ir(t, e, r, n, u = [], o, i) {
  let { locStart: D2, locEnd: s } = i, a = D2(t), c = s(t);
  if (e > c || e < a || o === "rangeEnd" && e === a || o === "rangeStart" && e === c) return;
  let p2 = [t, ...u], l = ot(t, p2, { cache: Ut, locStart: D2, locEnd: s, getVisitorKeys: r.getVisitorKeys, filter: r.printer.canAttachComment, getChildren: r.printer.getCommentChildNodes });
  for (let m2 of l) {
    let f = ir(m2, e, r, n, p2, o, i);
    if (f) return f;
  }
  if (n(t, u[0])) return p2;
}
function Fi(t, e) {
  return e !== "DeclareExportDeclaration" && t !== "TypeParameterDeclaration" && (t === "Directive" || t === "TypeAlias" || t === "TSExportAssignment" || t.startsWith("Declare") || t.startsWith("TSDeclare") || t.endsWith("Statement") || t.endsWith("Declaration"));
}
var su = /* @__PURE__ */ new Set(["JsonRoot", "ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]);
var Ei = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
function iu(t, e, r) {
  if (!e) return false;
  switch (t.parser) {
    case "flow":
    case "hermes":
    case "babel":
    case "babel-flow":
    case "babel-ts":
    case "typescript":
    case "acorn":
    case "espree":
    case "meriyah":
    case "oxc":
    case "oxc-ts":
    case "yuku":
    case "yuku-ts":
    case "__babel_estree":
      return Fi(e.type, r?.type);
    case "json":
    case "json5":
    case "jsonc":
    case "json-stringify":
      return su.has(e.type);
    case "graphql":
      return Ei.has(e.kind);
    case "vue":
      return e.tag !== "root";
  }
  return false;
}
function Du(t, e, r) {
  let { rangeStart: n, rangeEnd: u } = e;
  k(u > n);
  let o = t.slice(n, u).search(/\S/), i = o === -1;
  if (!i) for (n += o; u > n && !/\S/.test(t[u - 1]); --u) ;
  let D2 = e.printer.features?.experimental_locForRangeFormat ?? e, s = ir(r, n, e, (f, F2) => iu(e, f, F2), [], "rangeStart", D2);
  if (!s) return;
  let a = i ? s : ir(r, u, e, (f) => iu(e, f), [], "rangeEnd", D2);
  if (!a) return;
  let c, p2;
  if (r.type === "JsonRoot") {
    let f = mi(s, a);
    c = f, p2 = f;
  } else [c, p2] = di(s, a, e);
  let { locStart: l, locEnd: m2 } = D2;
  return [Math.min(l(c), l(p2)), Math.max(m2(c), m2(p2))];
}
var lu = "\uFEFF";
var au = /* @__PURE__ */ Symbol("cursor");
async function pu(t, e, r = 0) {
  if (!t || t.trim().length === 0) return { formatted: "", cursorOffset: -1, comments: [] };
  let { ast: n, text: u } = await me(t, e);
  e.cursorOffset >= 0 && (e = { ...e, ...or(n, e) });
  let o = await Ve(n, e, r);
  r > 0 && (o = Qe([W, o], r, e.tabWidth));
  let i = Ce(o, e);
  if (r > 0) {
    let s = i.formatted.trim();
    i.cursorNodeStart !== void 0 && (i.cursorNodeStart -= i.formatted.indexOf(s), i.cursorNodeStart < 0 && (i.cursorNodeStart = 0, i.cursorNodeText = i.cursorNodeText.trimStart()), i.cursorNodeStart + i.cursorNodeText.length > s.length && (i.cursorNodeText = i.cursorNodeText.trimEnd())), i.formatted = s + we(e.endOfLine);
  }
  let D2 = e[ue];
  if (e.cursorOffset >= 0) {
    let s, a, c, p2;
    if ((e.cursorNode || e.nodeBeforeCursor || e.nodeAfterCursor) && i.cursorNodeText) if (c = i.cursorNodeStart, p2 = i.cursorNodeText, e.cursorNode) s = e.locStart(e.cursorNode), a = u.slice(s, e.locEnd(e.cursorNode));
    else {
      if (!e.nodeBeforeCursor && !e.nodeAfterCursor) throw new Error("Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor");
      s = e.nodeBeforeCursor ? e.locEnd(e.nodeBeforeCursor) : 0;
      let E2 = e.nodeAfterCursor ? e.locStart(e.nodeAfterCursor) : u.length;
      a = u.slice(s, E2);
    }
    else s = 0, a = u, c = 0, p2 = i.formatted;
    let l = e.cursorOffset - s;
    if (a === p2) return { formatted: i.formatted, cursorOffset: c + l, comments: D2 };
    let m2 = a.split("");
    m2.splice(l, 0, au);
    let f = p2.split(""), F2 = xt(m2, f), d = c;
    for (let E2 of F2) if (E2.removed) {
      if (E2.value.includes(au)) break;
    } else d += E2.count;
    return { formatted: i.formatted, cursorOffset: d, comments: D2 };
  }
  return { formatted: i.formatted, cursorOffset: -1, comments: D2 };
}
async function Ci(t, e) {
  let { ast: r, text: n } = await me(t, e), [u, o] = Du(n, e, r) ?? [0, 0], i = n.slice(u, o), D2 = Math.min(u, n.lastIndexOf(`
`, u) + 1), s = n.slice(D2, u).match(/^\s*/)[0], a = he(s, e.tabWidth), c = await pu(i, { ...e, rangeStart: 0, rangeEnd: Number.POSITIVE_INFINITY, cursorOffset: e.cursorOffset > u && e.cursorOffset <= o ? e.cursorOffset - u : -1, endOfLine: "lf" }, a), p2 = c.formatted.trimEnd(), { cursorOffset: l } = e;
  l > o ? l += p2.length - i.length : c.cursorOffset >= 0 && (l = c.cursorOffset + u);
  let m2 = n.slice(0, u) + p2 + n.slice(o);
  if (e.endOfLine !== "lf") {
    let f = we(e.endOfLine);
    l >= 0 && f === `\r
` && (l += Tt(m2.slice(0, l), `
`)), m2 = ne(0, m2, `
`, f);
  }
  return { formatted: m2, cursorOffset: l, comments: c.comments };
}
function sr(t, e, r) {
  return typeof e != "number" || Number.isNaN(e) || e < 0 || e > t.length ? r : e;
}
function cu(t, e) {
  let { cursorOffset: r, rangeStart: n, rangeEnd: u } = e;
  return r = sr(t, r, -1), n = sr(t, n, 0), u = sr(t, u, t.length), { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u };
}
function mu(t, e) {
  let { cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o } = cu(t, e), i = t.charAt(0) === lu;
  if (i && (t = t.slice(1), r--, n--, u--), o === "auto" && (o = Cr(t)), t.includes("\r")) {
    let D2 = (s) => Tt(t.slice(0, Math.max(s, 0)), `\r
`);
    r -= D2(r), n -= D2(n), u -= D2(u), t = hr(t);
  }
  return { hasBOM: i, text: t, options: cu(t, { ...e, cursorOffset: r, rangeStart: n, rangeEnd: u, endOfLine: o }) };
}
async function fu(t, e) {
  let r = await Ue(e);
  return !r.hasPragma || r.hasPragma(t);
}
async function hi(t, e) {
  return (await Ue(e)).hasIgnorePragma?.(t);
}
async function Dr(t, e) {
  let { hasBOM: r, text: n, options: u } = mu(t, await se(e));
  if (u.rangeStart >= u.rangeEnd && n !== "" || u.requirePragma && !await fu(n, u) || u.checkIgnorePragma && await hi(n, u)) return { formatted: t, cursorOffset: e.cursorOffset, comments: [] };
  let o;
  return u.rangeStart > 0 || u.rangeEnd < n.length ? o = await Ci(n, u) : (!u.requirePragma && u.insertPragma && u.printer.insertPragma && !await fu(n, u) && (n = u.printer.insertPragma(n)), o = await pu(n, u)), r && (o.formatted = lu + o.formatted, o.cursorOffset >= 0 && o.cursorOffset++), o;
}
async function du(t, e, r) {
  let { text: n, options: u } = mu(t, await se(e)), o = await me(n, u);
  return r && (r.preprocessForPrint && (o.ast = await ur(o.ast, u)), r.massage && (o.ast = nu(o.ast, u))), o;
}
async function Fu(t, e) {
  e = await se(e);
  let r = await Ve(t, e);
  return Ce(r, e);
}
async function Eu(t, e) {
  let r = Ur(t), { formatted: n } = await Dr(r, { ...e, parser: "__js_expression" });
  return n;
}
async function Cu(t, e) {
  e = await se(e);
  let { ast: r } = await me(t, e);
  return e.cursorOffset >= 0 && (e = { ...e, ...or(r, e) }), Ve(r, e);
}
async function hu(t, e) {
  return Ce(t, await se(e));
}
var ar = {};
yt(ar, { builders: () => _i, printer: () => yi, utils: () => Ai });
var _i = { join: be, line: Ze, softline: Mr, hardline: W, literalline: Je, group: wt, conditionalGroup: Ir, fill: kr, lineSuffix: Ie, lineSuffixBoundary: Yr, cursor: ee, breakParent: ae, ifBreak: Rr, trim: jr, indent: oe, indentIfBreak: vr, align: De, addAlignmentToDoc: Qe, markAsRoot: Xe, dedentToRoot: Sr, dedent: br, hardlineWithoutBreakParent: ke, literallineWithoutBreakParent: Ot, label: Lr, concat: (t) => t };
var yi = { printDocToString: Ce };
var Ai = { willBreak: xr, traverseDoc: Oe, findInDoc: Ke, mapDoc: Se, removeLines: Tr, stripTrailingHardline: He, replaceEndOfLine: Nr, canBreak: wr };
var gu = "3.9.10";
var fr = {};
yt(fr, { addDanglingComment: () => re, addLeadingComment: () => ce, addTrailingComment: () => fe, getAlignmentSize: () => he, getIndentSize: () => _u2, getMaxContinuousCount: () => yu, getNextNonSpaceNonCommentCharacter: () => Au, getNextNonSpaceNonCommentCharacterIndex: () => vi, getPreferredQuote: () => Tu, getStringWidth: () => Re, hasNewline: () => H, hasNewlineInRange: () => Nu, hasSpaces: () => wu, isNextLineEmpty: () => Ui, isNextLineEmptyAfterIndex: () => gt, isPreviousLineEmpty: () => Mi, makeString: () => ji, skip: () => _e2, skipEverythingButNewLine: () => ut, skipInlineComment: () => Be, skipNewline: () => $, skipSpaces: () => j, skipToLineEnd: () => nt, skipTrailingComment: () => Te, skipWhitespace: () => tn });
function xi(t, e) {
  if (e === false) return false;
  if (t.charAt(e) === "/" && t.charAt(e + 1) === "*") {
    for (let r = e + 2; r < t.length; ++r) if (t.charAt(r) === "*" && t.charAt(r + 1) === "/") return r + 2;
  }
  return e;
}
var Be = xi;
function Bi(t, e) {
  return e === false ? false : t.charAt(e) === "/" && t.charAt(e + 1) === "/" ? ut(t, e) : e;
}
var Te = Bi;
function Ti(t, e) {
  let r = null, n = e;
  for (; n !== r; ) r = n, n = j(t, n), n = Be(t, n), n = Te(t, n), n = $(t, n);
  return n;
}
var We = Ti;
function Ni(t, e) {
  let r = null, n = e;
  for (; n !== r; ) r = n, n = nt(t, n), n = Be(t, n), n = j(t, n);
  return n = Te(t, n), n = $(t, n), n !== false && H(t, n);
}
var gt = Ni;
function wi(t, e) {
  let r = t.lastIndexOf(`
`);
  return r === -1 ? 0 : he(t.slice(r + 1).match(/^[\t ]*/)[0], e);
}
var _u2 = wi;
function cr(t) {
  if (typeof t != "string") throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Oi(t, e) {
  let r = t.matchAll(new RegExp(`(?:${cr(e)})+`, "g"));
  return r.reduce || (r = [...r]), r.reduce((n, [u]) => Math.max(n, u.length), 0) / e.length;
}
var yu = Oi;
function Pi(t, e) {
  let r = We(t, e);
  return r === false ? "" : t.charAt(r);
}
var Au = Pi;
var xu = Object.freeze({ character: "'", codePoint: 39 });
var Bu = Object.freeze({ character: '"', codePoint: 34 });
var Si = Object.freeze({ preferred: xu, alternate: Bu });
var bi = Object.freeze({ preferred: Bu, alternate: xu });
function Tu(t, e) {
  let { preferred: r, alternate: n } = e === true || e === "'" ? Si : bi, { length: u } = t, o = 0, i = 0;
  for (let D2 = 0; D2 < u; D2++) {
    let s = t.charCodeAt(D2);
    s === r.codePoint ? o++ : s === n.codePoint && i++;
  }
  return (o > i ? n : r).character;
}
function ki(t, e, r) {
  for (let n = e; n < r; ++n) if (t.charAt(n) === `
`) return true;
  return false;
}
var Nu = ki;
function Ii(t, e, r = {}) {
  return j(t, r.backwards ? e - 1 : e, r) !== e;
}
var wu = Ii;
function Ri(t, e, r) {
  return We(t, r(e));
}
function vi(t, e) {
  return arguments.length === 2 || typeof e == "number" ? We(t, e) : Ri(...arguments);
}
function Li(t, e, r) {
  return ve(t, r(e));
}
function Mi(t, e) {
  return arguments.length === 2 || typeof e == "number" ? ve(t, e) : Li(...arguments);
}
function Yi(t, e, r) {
  return gt(t, r(e));
}
function ji(t, e, r) {
  let n = e === '"' ? "'" : '"', o = ne(0, t, /\\(.)|(["'])/gs, (i, D2, s) => D2 === n ? D2 : s === e ? "\\" + s : s || (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(D2) ? D2 : "\\" + D2));
  return e + o + e;
}
function Ui(t, e) {
  return arguments.length === 2 || typeof e == "number" ? gt(t, e) : Yi(...arguments);
}
function de(t, e = 1) {
  return async (...r) => {
    let n = r[e] ?? {}, u = n.plugins ?? [];
    return r[e] = { ...n, plugins: Array.isArray(u) ? u : Object.values(u) }, await t(...r);
  };
}
var Ou = de(Dr);
async function Pu(t, e) {
  let { formatted: r } = await Ou(t, { ...e, cursorOffset: -1 });
  return r;
}
async function Vi(t, e) {
  return await Pu(t, e) === t;
}
var Wi = de(it, 0);
var $i = { parse: de(du), formatAST: de(Fu), formatDoc: de(Eu), printToDoc: de(Cu), printDocToString: de(hu) };

// node_modules/prettier/plugins/html.mjs
var html_exports = {};
__export(html_exports, {
  default: () => Zi,
  languages: () => Ui2,
  options: () => zi,
  parsers: () => Pr2,
  printers: () => $o2
});
var Nr2 = Object.defineProperty;
var Dr2 = (e) => {
  throw TypeError(e);
};
var es = (e, t, r) => t in e ? Nr2(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var Ir2 = (e, t) => {
  for (var r in t) Nr2(e, r, { get: t[r], enumerable: true });
};
var Wt2 = (e, t, r) => es(e, typeof t != "symbol" ? t + "" : t, r);
var ts = (e, t, r) => t.has(e) || Dr2("Cannot " + r);
var qe2 = (e, t, r) => (ts(e, t, "read from private field"), r ? r.call(e) : t.get(e));
var Rr2 = (e, t, r) => t.has(e) ? Dr2("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r);
var Zi = {};
Ir2(Zi, { languages: () => Ui2, options: () => zi, parsers: () => Pr2, printers: () => $o2 });
var ke2 = (e, t) => (r, n, ...i) => r | 1 && n == null ? void 0 : (t.call(n) ?? n[e]).apply(n, i);
var rs = String.prototype.replaceAll ?? function(e, t) {
  return e.global ? this.replace(e, t) : this.split(e).join(t);
};
var ns = ke2("replaceAll", function() {
  if (typeof this == "string") return rs;
});
var T2 = ns;
function is(e) {
  return this[e < 0 ? this.length + e : e];
}
var ss = ke2("at", function() {
  if (Array.isArray(this) || typeof this == "string") return is;
});
var I2 = ss;
var as = () => {
};
var He2 = as;
var Fe2 = "string";
var Ve2 = "array";
var ot2 = "cursor";
var be2 = "indent";
var we2 = "align";
var lt2 = "trim";
var Te2 = "group";
var ye2 = "fill";
var Ee2 = "if-break";
var xe2 = "indent-if-break";
var ct2 = "line-suffix";
var ut2 = "line-suffix-boundary";
var z2 = "line";
var pt2 = "label";
var Le2 = "break-parent";
var ht2 = /* @__PURE__ */ new Set([ot2, be2, we2, lt2, Te2, ye2, Ee2, xe2, ct2, ut2, z2, pt2, Le2]);
function mt2(e, t, r) {
  if (!e.has(t)) {
    let n = r(t);
    e.set(t, n);
  }
  return e.get(t);
}
function os(e) {
  if (typeof e == "string") return Fe2;
  if (Array.isArray(e)) return Ve2;
  if (!e) return;
  let { type: t } = e;
  if (ht2.has(t)) return t;
}
var ft2 = os;
var ls = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e);
function cs(e) {
  let t = e === null ? "null" : typeof e;
  if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
  if (ft2(e)) throw new Error("doc is valid.");
  let r = Object.prototype.toString.call(e);
  if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
  let n = ls([...ht2].map((i) => `'${i}'`));
  return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
var zt2 = class extends Error {
  constructor(t) {
    super(cs(t));
    __publicField(this, "name", "InvalidDocError");
    this.doc = t;
  }
};
var Or2 = zt2;
function Gt2(e, t) {
  if (typeof e == "string") return t(e);
  let r = /* @__PURE__ */ new Map();
  return n(e);
  function n(s) {
    return mt2(r, s, i);
  }
  function i(s) {
    switch (ft2(s)) {
      case Ve2:
        return t(s.map(n));
      case ye2:
        return t({ ...s, parts: s.parts.map(n) });
      case Ee2:
        return t({ ...s, breakContents: n(s.breakContents), flatContents: n(s.flatContents) });
      case Te2: {
        let { expandedStates: a, contents: o } = s;
        return a ? (a = a.map(n), o = a[0]) : o = n(o), t({ ...s, contents: o, expandedStates: a });
      }
      case we2:
      case be2:
      case xe2:
      case pt2:
      case ct2:
        return t({ ...s, contents: n(s.contents) });
      case Fe2:
      case ot2:
      case lt2:
      case ut2:
      case z2:
      case Le2:
        return t(s);
      default:
        throw new Or2(s);
    }
  }
}
function L2(e, t = Mr2) {
  return Gt2(e, (r) => typeof r == "string" ? R2(t, r.split(`
`)) : r);
}
var D = He2;
var dt2 = He2;
var Br2 = He2;
var qr2 = He2;
function A(e) {
  return D(e), { type: be2, contents: e };
}
function us(e, t) {
  return qr2(e), D(t), { type: we2, contents: t, n: e };
}
function Hr2(e) {
  return us(Number.NEGATIVE_INFINITY, e);
}
var G2 = { type: Le2 };
function gt2(e) {
  return Br2(e), { type: ye2, parts: e };
}
function C(e, t = {}) {
  return D(e), dt2(t.expandedStates, true), { type: Te2, id: t.id, contents: e, break: !!t.shouldBreak, expandedStates: t.expandedStates };
}
function $2(e, t = "", r = {}) {
  return D(e), t !== "" && D(t), { type: Ee2, breakContents: e, flatContents: t, groupId: r.groupId };
}
function Fr2(e, t) {
  return D(e), { type: xe2, contents: e, groupId: t.groupId, negate: t.negate };
}
function R2(e, t) {
  D(e), dt2(t);
  let r = [];
  for (let n = 0; n < t.length; n++) n !== 0 && r.push(e), r.push(t[n]);
  return r;
}
var S2 = { type: z2 };
var y2 = { type: z2, soft: true };
var ps = { type: z2, hard: true };
var k2 = [ps, G2];
var hs = { type: z2, hard: true, literal: true };
var Mr2 = [hs, G2];
var Vr2 = Object.freeze({ character: "'", codePoint: 39 });
var Ur2 = Object.freeze({ character: '"', codePoint: 34 });
var ms = Object.freeze({ preferred: Vr2, alternate: Ur2 });
var fs = Object.freeze({ preferred: Ur2, alternate: Vr2 });
function Wr2(e, t) {
  let { preferred: r, alternate: n } = t === true || t === "'" ? ms : fs, { length: i } = e, s = 0, a = 0;
  for (let o = 0; o < i; o++) {
    let l = e.charCodeAt(o);
    l === r.codePoint ? s++ : l === n.codePoint && a++;
  }
  return (s > a ? n : r).character;
}
function $t2(e) {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var _e3, _jt_instances, t_fn2, _a3;
var jt2 = (_a3 = class {
  constructor(t) {
    __privateAdd(this, _jt_instances);
    __privateAdd(this, _e3);
    __privateSet(this, _e3, new Set(t));
  }
  getLeadingWhitespaceCount(t) {
    let r = __privateGet(this, _e3), n = 0;
    for (let i = 0; i < t.length && r.has(t.charAt(i)); i++) n++;
    return n;
  }
  getTrailingWhitespaceCount(t) {
    let r = __privateGet(this, _e3), n = 0;
    for (let i = t.length - 1; i >= 0 && r.has(t.charAt(i)); i--) n++;
    return n;
  }
  getLeadingWhitespace(t) {
    let r = this.getLeadingWhitespaceCount(t);
    return t.slice(0, r);
  }
  getTrailingWhitespace(t) {
    let r = this.getTrailingWhitespaceCount(t);
    return t.slice(t.length - r);
  }
  hasLeadingWhitespace(t) {
    return __privateGet(this, _e3).has(t.charAt(0));
  }
  hasTrailingWhitespace(t) {
    return __privateGet(this, _e3).has(I2(0, t, -1));
  }
  trimStart(t) {
    let r = this.getLeadingWhitespaceCount(t);
    return t.slice(r);
  }
  trimEnd(t) {
    let r = this.getTrailingWhitespaceCount(t);
    return t.slice(0, t.length - r);
  }
  trim(t) {
    return this.trimEnd(this.trimStart(t));
  }
  split(t, r = false) {
    let n = `[${$t2([...__privateGet(this, _e3)].join(""))}]+`, i = new RegExp(r ? `(${n})` : n);
    return t.split(i);
  }
  hasWhitespaceCharacter(t) {
    let r = __privateGet(this, _e3);
    return Array.prototype.some.call(t, (n) => r.has(n));
  }
  hasNonWhitespaceCharacter(t) {
    let r = __privateGet(this, _e3);
    return Array.prototype.some.call(t, (n) => !r.has(n));
  }
  isWhitespaceOnly(t) {
    let r = __privateGet(this, _e3);
    return Array.prototype.every.call(t, (n) => r.has(n));
  }
  dedentString(t) {
    let r = __privateMethod(this, _jt_instances, t_fn2).call(this, t);
    return r === 0 ? t : t.split(`
`).map((n) => n.slice(r)).join(`
`);
  }
}, _e3 = new WeakMap(), _jt_instances = new WeakSet(), t_fn2 = function(t) {
  let r = Number.POSITIVE_INFINITY;
  for (let n of t.split(`
`)) {
    if (n.length === 0) continue;
    let i = this.getLeadingWhitespaceCount(n);
    if (i === 0) return 0;
    n.length !== i && i < r && (r = i);
  }
  return r === Number.POSITIVE_INFINITY ? 0 : r;
}, _a3);
var zr2 = jt2;
var ds = ["	", `
`, "\f", "\r", " "];
var gs = new zr2(ds);
var P = gs;
var Yt2 = class extends Error {
  constructor(t, r, n = "type") {
    super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`);
    __publicField(this, "name", "UnexpectedNodeError");
    this.node = t;
  }
};
var Gr2 = Yt2;
function j2(e, t = true) {
  return [A([y2, e]), t ? y2 : ""];
}
function q2(e, t) {
  let r = e.type === "NGRoot" ? e.node.type === "NGMicrosyntax" && e.node.body.length === 1 && e.node.body[0].type === "NGMicrosyntaxExpression" ? e.node.body[0].expression : e.node : e.type === "JsExpressionRoot" ? e.node : e;
  return r && (r.type === "ObjectExpression" || r.type === "ArrayExpression" || (t.parser === "__vue_expression" || t.parser === "__vue_ts_expression" || t.parser === "__ng_binding" || t.parser === "__ng_directive") && (r.type === "TemplateLiteral" || r.type === "StringLiteral"));
}
async function E(e, t, r, n) {
  r = { __isInHtmlAttribute: true, __embeddedInHtml: true, ...r };
  let i = true;
  n && (r.__onHtmlBindingRoot = (a, o) => {
    i = n(a, o);
  });
  let s = await t(e, r, t);
  return i ? C(s) : j2(s);
}
function _s(e, t, r, n) {
  let { node: i } = r, s = n.originalText.slice(i.sourceSpan.start.offset, i.sourceSpan.end.offset);
  return /^\s*$/.test(s) ? "" : E(s, e, { parser: "__ng_directive", __isInHtmlAttribute: false }, q2);
}
var $r2 = _s;
var Ss = Object.hasOwn ?? Function.prototype.call.bind(Object.prototype.hasOwnProperty);
var Y2 = Ss;
var vs = Array.prototype.toReversed ?? function() {
  return [...this].reverse();
};
var Cs = ke2("toReversed", function() {
  if (Array.isArray(this)) return vs;
});
var jr2 = Cs;
function ks() {
  let e = globalThis, t = e.process?.platform;
  if (typeof t == "string") return t.startsWith("win");
  let r = e.Deno?.build?.os;
  return typeof r == "string" ? r === "windows" : e.navigator?.platform?.startsWith("Win") ?? false;
}
var bs = ks();
function Yr2(e) {
  if (e = e instanceof URL ? e : new URL(e), e.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);
  return e;
}
function ws(e) {
  return e = Yr2(e), decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
}
function Ts(e) {
  e = Yr2(e);
  let t = decodeURIComponent(e.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  return e.hostname !== "" && (t = `\\\\${e.hostname}${t}`), t;
}
function Kt2(e) {
  return bs ? Ts(e) : ws(e);
}
var Kr2 = (e) => String(e).split(/[/\\]/).pop();
var Qr2 = (e) => String(e).startsWith("file:");
function ys(e) {
  return Array.isArray(e) && e.length > 0;
}
var J = ys;
function Xr2(e, t) {
  if (!t) return;
  let r = Kr2(t).toLowerCase();
  return e.find(({ filenames: n }) => n?.some((i) => i.toLowerCase() === r)) ?? e.find(({ extensions: n }) => n?.some((i) => r.endsWith(i)));
}
function Es(e, t) {
  if (t) return e.find(({ name: r }) => r.toLowerCase() === t) ?? e.find(({ aliases: r }) => r?.includes(t)) ?? e.find(({ extensions: r }) => r?.includes(`.${t}`));
}
var xs = void 0;
function Jr2(e, t) {
  if (t) {
    if (Qr2(t)) try {
      t = Kt2(t);
    } catch {
      return;
    }
    if (typeof t == "string") return e.find(({ isSupported: r }) => r?.({ filepath: t }));
  }
}
function Ls(e, t) {
  let r = jr2(0, e.plugins).flatMap((i) => i.languages ?? []);
  return (Es(r, t.language) ?? Xr2(r, t.physicalFile) ?? Xr2(r, t.file) ?? Jr2(r, t.physicalFile) ?? Jr2(r, t.file) ?? xs?.(r, t.physicalFile))?.parsers[0];
}
var _t2 = Ls;
var St2 = /* @__PURE__ */ Symbol.for("PRETTIER_IS_FRONT_MATTER");
function As(e) {
  return !!e?.[St2];
}
var ae2 = As;
function Ps(e) {
  return T2(0, e, /[^\n]/g, " ");
}
var vt2 = Ps;
var Ue2 = 3;
function Ns(e) {
  let t = e.slice(0, Ue2);
  if (t !== "---" && t !== "+++") return;
  let r = e.indexOf(`
`, Ue2);
  if (r === -1) return;
  let n = e.slice(Ue2, r).trim(), i = e.indexOf(`
${t}`, r), s = n;
  if (s || (s = t === "+++" ? "toml" : "yaml"), i === -1 && t === "---" && s === "yaml" && (i = e.indexOf(`
...`, r)), i === -1) return;
  let a = i + 1 + Ue2, o = e.charAt(a + 1);
  if (!/\s?/.test(o)) return;
  let l = e.slice(0, a), c;
  return { language: s, explicitLanguage: n || null, value: e.slice(r + 1, i), startDelimiter: t, endDelimiter: l.slice(-Ue2), raw: l, start: { line: 1, column: 0, index: 0 }, end: { index: l.length, get line() {
    return c ?? (c = l.split(`
`)), c.length;
  }, get column() {
    return c ?? (c = l.split(`
`)), I2(0, c, -1).length;
  } }, [St2]: true };
}
function Ds(e) {
  let t = Ns(e);
  return t ? { frontMatter: t, get content() {
    let { raw: r } = t;
    return vt2(r) + e.slice(r.length);
  } } : { content: e };
}
var Qt2 = Ds;
var Zr2 = "inline";
var Xt2 = { area: "none", base: "none", basefont: "none", datalist: "none", head: "none", link: "none", meta: "none", noembed: "none", noframes: "none", param: "block", rp: "none", script: "block", style: "none", template: "inline", title: "none", html: "block", body: "block", address: "block", blockquote: "block", center: "block", dialog: "block", div: "block", figure: "block", figcaption: "block", footer: "block", form: "block", header: "block", hr: "block", legend: "block", listing: "block", main: "block", p: "block", plaintext: "block", pre: "block", search: "block", xmp: "block", slot: "contents", ruby: "ruby", rt: "ruby-text", article: "block", aside: "block", h1: "block", h2: "block", h3: "block", h4: "block", h5: "block", h6: "block", hgroup: "block", nav: "block", section: "block", dir: "block", dd: "block", dl: "block", dt: "block", menu: "block", ol: "block", ul: "block", li: "list-item", table: "table", caption: "table-caption", colgroup: "table-column-group", col: "table-column", thead: "table-header-group", tbody: "table-row-group", tfoot: "table-footer-group", tr: "table-row", td: "table-cell", th: "table-cell", input: "inline-block", button: "inline-block", fieldset: "block", details: "block", summary: "block", marquee: "inline-block", option: "block", optgroup: "block", select: "inline-block", source: "block", track: "block", meter: "inline-block", progress: "inline-block", object: "inline-block", video: "inline-block", audio: "inline-block" };
var en2 = "normal";
var Jt2 = { listing: "pre", plaintext: "pre", pre: "pre", xmp: "pre", nobr: "nowrap", table: "initial", textarea: "pre-wrap" };
function Is(e) {
  return e.kind === "element" && !e.hasExplicitNamespace && !["html", "svg"].includes(e.namespace);
}
var oe2 = Is;
var Rs = (e) => T2(0, e, /^[\t\f\r ]*\n/g, "");
var Zt2 = (e) => Rs(P.trimEnd(e));
var tn2 = (e) => {
  let t = e, r = P.getLeadingWhitespace(t);
  r && (t = t.slice(r.length));
  let n = P.getTrailingWhitespace(t);
  return n && (t = t.slice(0, -n.length)), { leadingWhitespace: r, trailingWhitespace: n, text: t };
};
function Ct2(e, t) {
  return !!(e.kind === "ieConditionalComment" && e.lastChild && !e.lastChild.isSelfClosing && !e.lastChild.endSourceSpan || e.kind === "ieConditionalComment" && !e.complete || K2(e) && e.children.some((r) => r.kind !== "text" && r.kind !== "interpolation") || wt2(e, t) && !O2(e, t) && e.kind !== "interpolation");
}
function le2(e) {
  return e.kind === "attribute" || !e.parent || !e.prev ? false : Os(e.prev);
}
function Os(e) {
  return e.kind === "comment" && e.value.trim() === "prettier-ignore";
}
function N2(e) {
  return e.kind === "text" || e.kind === "comment";
}
function O2(e, t) {
  return e.kind === "element" && (e.fullName === "script" || e.fullName === "style" || e.fullName === "svg:style" || e.fullName === "svg:script" || e.fullName === "mj-style" && t.parser === "mjml" || oe2(e) && (e.name === "script" || e.name === "style"));
}
function rn2(e, t) {
  return e.children && !O2(e, t);
}
function nn2(e, t) {
  return O2(e, t) || e.kind === "interpolation" || er2(e);
}
function er2(e) {
  return dn2(e).startsWith("pre");
}
function sn2(e, t) {
  let r = n();
  if (r && !e.prev && e.parent?.tagDefinition?.ignoreFirstLf) return e.kind === "interpolation";
  return r;
  function n() {
    return ae2(e) || e.kind === "angularControlFlowBlock" ? false : (e.kind === "text" || e.kind === "interpolation") && e.prev && (e.prev.kind === "text" || e.prev.kind === "interpolation") ? true : !e.parent || e.parent.cssDisplay === "none" ? false : K2(e.parent) ? true : !(!e.prev && (e.parent.kind === "root" || K2(e) && e.parent || O2(e.parent, t) || Ge2(e.parent, t) || !Vs(e.parent.cssDisplay)) || e.prev && !zs(e.prev.cssDisplay));
  }
}
function an2(e, t) {
  return ae2(e) || e.kind === "angularControlFlowBlock" ? false : (e.kind === "text" || e.kind === "interpolation") && e.next && (e.next.kind === "text" || e.next.kind === "interpolation") ? true : !e.parent || e.parent.cssDisplay === "none" ? false : K2(e.parent) ? true : !(!e.next && (e.parent.kind === "root" || K2(e) && e.parent || O2(e.parent, t) || Ge2(e.parent, t) || !Us(e.parent.cssDisplay)) || e.next && !Ws(e.next.cssDisplay));
}
function on2(e, t) {
  return Gs(e.cssDisplay) && !O2(e, t);
}
function We2(e) {
  return ae2(e) || e.next && e.sourceSpan.end && e.sourceSpan.end.line + 1 < e.next.sourceSpan.start.line;
}
function ln2(e) {
  return tr2(e) || e.kind === "element" && e.children.length > 0 && (["body", "script", "style"].includes(e.name) || e.children.some((t) => Bs(t))) || e.firstChild && e.firstChild === e.lastChild && e.firstChild.kind !== "text" && un2(e.firstChild) && (!e.lastChild.isTrailingSpaceSensitive || pn2(e.lastChild));
}
function tr2(e) {
  return e.kind === "element" && e.children.length > 0 && (["html", "head", "ul", "ol", "select"].includes(e.name) || e.cssDisplay.startsWith("table") && e.cssDisplay !== "table-cell");
}
function kt2(e) {
  return hn2(e) || e.prev && Ms(e.prev) || cn2(e);
}
function Ms(e) {
  return hn2(e) || e.kind === "element" && e.fullName === "br" || cn2(e);
}
function cn2(e) {
  return un2(e) && pn2(e);
}
function un2(e) {
  return e.hasLeadingSpaces && (e.prev ? e.prev.sourceSpan.end.line < e.sourceSpan.start.line : e.parent.kind === "root" || e.parent.startSourceSpan.end.line < e.sourceSpan.start.line);
}
function pn2(e) {
  return e.hasTrailingSpaces && (e.next ? e.next.sourceSpan.start.line > e.sourceSpan.end.line : e.parent.kind === "root" || e.parent.endSourceSpan && e.parent.endSourceSpan.start.line > e.sourceSpan.end.line);
}
function hn2(e) {
  switch (e.kind) {
    case "ieConditionalComment":
    case "comment":
    case "directive":
      return true;
    case "element":
      return ["script", "select"].includes(e.name);
  }
  return false;
}
function bt2(e) {
  return e.lastChild ? bt2(e.lastChild) : e;
}
function Bs(e) {
  return e.children?.some((t) => t.kind !== "text");
}
function mn2(e) {
  if (e) switch (e) {
    case "module":
    case "text/javascript":
    case "text/babel":
    case "text/jsx":
    case "application/javascript":
      return "babel";
    case "application/x-typescript":
      return "typescript";
    case "text/markdown":
      return "markdown";
    case "text/html":
      return "html";
    case "text/x-handlebars-template":
      return "glimmer";
    default:
      if (e.endsWith("json") || e.endsWith("importmap") || e === "speculationrules") return "json";
  }
}
function qs(e, t) {
  let { name: r, attrMap: n } = e;
  if (r !== "script" || Y2(n, "src")) return;
  let { type: i, lang: s } = e.attrMap;
  return !s && !i ? "babel" : _t2(t, { language: s }) ?? mn2(i);
}
function Hs(e, t) {
  if (!wt2(e, t)) return;
  let { attrMap: r } = e;
  if (Y2(r, "src")) return;
  let { type: n, lang: i } = r;
  return _t2(t, { language: i }) ?? mn2(n);
}
function Fs(e, t) {
  if (e.name === "style") {
    let { lang: r } = e.attrMap;
    return r ? _t2(t, { language: r }) : "css";
  }
  if (e.name === "mj-style" && t.parser === "mjml") return "css";
}
function rr2(e, t) {
  return qs(e, t) ?? Fs(e, t) ?? Hs(e, t);
}
function ze2(e) {
  return e === "block" || e === "list-item" || e.startsWith("table");
}
function Vs(e) {
  return !ze2(e) && e !== "inline-block";
}
function Us(e) {
  return !ze2(e) && e !== "inline-block";
}
function Ws(e) {
  return !ze2(e);
}
function zs(e) {
  return !ze2(e);
}
function Gs(e) {
  return !ze2(e) && e !== "inline-block";
}
function K2(e) {
  return dn2(e).startsWith("pre");
}
function $s(e, t) {
  let r = e;
  for (; r; ) {
    if (t(r)) return true;
    r = r.parent;
  }
  return false;
}
function fn2(e, t) {
  if (ce2(e, t)) return "block";
  if (e.prev?.kind === "comment") {
    let n = e.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/);
    if (n) return n[1];
  }
  let r = false;
  if (e.kind === "element" && e.namespace === "svg") if ($s(e, (n) => n.fullName === "svg:foreignObject")) r = true;
  else return e.name === "svg" ? "inline-block" : "block";
  switch (t.htmlWhitespaceSensitivity) {
    case "strict":
      return "inline";
    case "ignore":
      return "block";
    default:
      if (e.kind === "element" && (!e.namespace || r || oe2(e)) && Y2(Xt2, e.name)) return Xt2[e.name];
  }
  return Zr2;
}
function dn2(e) {
  return e.kind === "element" && (!e.namespace || oe2(e)) && Y2(Jt2, e.name) ? Jt2[e.name] : en2;
}
function nr2(e) {
  return T2(0, T2(0, e, "&apos;", "'"), "&quot;", '"');
}
function w2(e) {
  return nr2(e.value);
}
var js = /* @__PURE__ */ new Set(["template", "style", "script"]);
function Ge2(e, t) {
  return ce2(e, t) && !js.has(e.fullName);
}
function ce2(e, t) {
  return t.parser === "vue" && e.kind === "element" && e.parent.kind === "root" && e.fullName.toLowerCase() !== "html";
}
function wt2(e, t) {
  return ce2(e, t) && (Ge2(e, t) || e.attrMap.lang && e.attrMap.lang !== "html");
}
function gn2(e) {
  let t = e.fullName;
  return t.charAt(0) === "#" || t === "slot-scope" || t === "v-slot" || t.startsWith("v-slot:");
}
function _n3(e, t) {
  let r = e.parent;
  if (!ce2(r, t)) return false;
  let n = r.fullName, i = e.fullName;
  return n === "script" && i === "setup" || n === "style" && i === "vars";
}
function Tt2(e, t = e.value) {
  return e.parent.isWhitespaceSensitive ? e.parent.isIndentationSensitive ? L2(t) : L2(P.dedentString(Zt2(t)), k2) : R2(S2, P.split(t));
}
function yt2(e, t) {
  return ce2(e, t) && e.name === "script";
}
function Ys(e) {
  let { valueSpan: t, value: r } = e;
  return t.end.offset - t.start.offset === r.length + 2;
}
function Et2(e, t) {
  if (Ys(e)) return false;
  let { value: r } = e;
  return /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(r) || t.parser === "lwc" && r.startsWith("{") && r.endsWith("}");
}
var Sn2 = /\{\{(.+?)\}\}/s;
var vn2 = ({ node: { value: e } }) => Sn2.test(e);
async function Cn2(e, t, r) {
  let n = w2(r.node), i = [];
  for (let [s, a] of n.split(Sn2).entries()) if (s % 2 === 0) i.push(L2(a));
  else try {
    i.push(C(["{{", A([S2, await E(a, e, { parser: "__ng_interpolation", __isInHtmlInterpolation: true })]), S2, "}}"]));
  } catch {
    i.push("{{", L2(a), "}}");
  }
  return i;
}
var ir2 = (e) => (t, r, n) => E(w2(n.node), t, { parser: e }, q2);
var Ks = [{ test(e) {
  let t = e.node.fullName;
  return t.startsWith("(") && t.endsWith(")") || t.startsWith("on-");
}, print: ir2("__ng_action") }, { test(e) {
  let t = e.node.fullName;
  return t.startsWith("[") && t.endsWith("]") || /^bind(?:on)?-/.test(t) || /^ng-(?:if|show|hide|class|style)$/.test(t);
}, print: ir2("__ng_binding") }, { test: (e) => e.node.fullName.startsWith("*"), print: ir2("__ng_directive") }, { test: (e) => /^i18n(?:-.+)?$/.test(e.node.fullName), print: Qs }, { test: vn2, print: Cn2 }].map(({ test: e, print: t }) => ({ test: (r, n) => n.parser === "angular" && e(r), print: t }));
function Qs(e, t, { node: r }) {
  let n = w2(r);
  return j2(gt2(Tt2(r, n.trim())), !n.includes("@@"));
}
var kn2 = Ks;
var bn2 = ({ node: e }, t) => !t.parentParser && e.fullName === "class" && !e.value.includes("{{");
var wn2 = (e, t, r) => T2(0, w2(r.node).trim(), /\s+/g, " ");
var sr2 = ["onabort", "onafterprint", "onauxclick", "onbeforeinput", "onbeforematch", "onbeforeprint", "onbeforetoggle", "onbeforeunload", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncommand", "oncontextlost", "oncontextmenu", "oncontextrestored", "oncopy", "oncuechange", "oncut", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onlanguagechange", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmessage", "onmessageerror", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onoffline", "ononline", "onpagehide", "onpagereveal", "onpageshow", "onpageswap", "onpaste", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onrejectionhandled", "onreset", "onresize", "onscroll", "onscrollend", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onunhandledrejection", "onunload", "onvolumechange", "onwaiting", "onwheel"];
var Js = new Set(sr2);
var Tn2 = ({ node: e }, t) => Js.has(e.fullName) && !t.parentParser && !e.value.includes("{{");
var yn2 = (e, t, r) => E(w2(r.node), e, { parser: "babel", __isHtmlInlineEventHandler: true }, () => false);
function Zs(e) {
  let t = [];
  for (let r of e.split(";")) {
    if (r = P.trim(r), !r) continue;
    let [n, ...i] = P.split(r);
    t.push({ name: n, value: i });
  }
  return t;
}
var En2 = Zs;
var xn2 = ({ node: e }, t) => e.fullName === "allow" && !t.parentParser && e.parent.fullName === "iframe" && !e.value.includes("{{");
function Ln2(e, t, r) {
  let { node: n } = r, i = En2(w2(n));
  return i.length === 0 ? [""] : j2(i.map(({ name: s, value: a }, o) => [[s, ...a].join(" "), o === i.length - 1 ? $2(";") : [";", S2]]));
}
function An2(e) {
  return e === "	" || e === `
` || e === "\f" || e === "\r" || e === " ";
}
var ea = /^[ \t\n\r\u000c]+/;
var ta = /^[, \t\n\r\u000c]+/;
var ra = /^[^ \t\n\r\u000c]+/;
var na = /[,]+$/;
var Pn2 = /^\d+$/;
var ia = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
function sa(e) {
  let t = e.length, r, n, i, s, a, o = 0, l;
  function c(h) {
    let f, g2 = h.exec(e.substring(o));
    if (g2) return [f] = g2, o += f.length, f;
  }
  let u = [];
  for (; ; ) {
    if (c(ta), o >= t) {
      if (u.length === 0) throw new Error("Must contain one or more image candidate strings.");
      return u;
    }
    l = o, r = c(ra), n = [], r.slice(-1) === "," ? (r = r.replace(na, ""), _()) : d();
  }
  function d() {
    for (c(ea), i = "", s = "in descriptor"; ; ) {
      if (a = e.charAt(o), s === "in descriptor") if (An2(a)) i && (n.push(i), i = "", s = "after descriptor");
      else if (a === ",") {
        o += 1, i && n.push(i), _();
        return;
      } else if (a === "(") i += a, s = "in parens";
      else if (a === "") {
        i && n.push(i), _();
        return;
      } else i += a;
      else if (s === "in parens") if (a === ")") i += a, s = "in descriptor";
      else if (a === "") {
        n.push(i), _();
        return;
      } else i += a;
      else if (s === "after descriptor" && !An2(a)) if (a === "") {
        _();
        return;
      } else s = "in descriptor", o -= 1;
      o += 1;
    }
  }
  function _() {
    let h = false, f, g2, v2, W2, se2 = {}, X2, at2, Ce2, Be2, Ut2;
    for (W2 = 0; W2 < n.length; W2++) X2 = n[W2], at2 = X2[X2.length - 1], Ce2 = X2.substring(0, X2.length - 1), Be2 = parseInt(Ce2, 10), Ut2 = parseFloat(Ce2), Pn2.test(Ce2) && at2 === "w" ? ((f || g2) && (h = true), Be2 === 0 ? h = true : f = Be2) : ia.test(Ce2) && at2 === "x" ? ((f || g2 || v2) && (h = true), Ut2 < 0 ? h = true : g2 = Ut2) : Pn2.test(Ce2) && at2 === "h" ? ((v2 || g2) && (h = true), Be2 === 0 ? h = true : v2 = Be2) : h = true;
    if (!h) se2.source = { value: r, startOffset: l }, f && (se2.width = { value: f }), g2 && (se2.density = { value: g2 }), v2 && (se2.height = { value: v2 }), u.push(se2);
    else throw new Error(`Invalid srcset descriptor found in "${e}" at "${X2}".`);
  }
}
var Nn2 = sa;
var Dn2 = (e) => e.node.fullName === "srcset" && (e.parent.fullName === "img" || e.parent.fullName === "source");
var In2 = { width: "w", height: "h", density: "x" };
var aa = Object.keys(In2);
function Rn2(e, t, r) {
  let n = w2(r.node), i = Nn2(n), s = aa.filter((h) => i.some((f) => Y2(f, h)));
  if (s.length > 1) throw new Error("Mixed descriptor in srcset is not supported");
  let [a] = s, o = In2[a], l = i.map((h) => h.source.value), c = Math.max(...l.map((h) => h.length)), u = i.map((h) => h[a] ? String(h[a].value) : ""), d = u.map((h) => {
    let f = h.indexOf(".");
    return f === -1 ? h.length : f;
  }), _ = Math.max(...d);
  return j2(R2([",", S2], l.map((h, f) => {
    let g2 = [h], v2 = u[f];
    if (v2) {
      let W2 = c - h.length + 1, se2 = _ - d[f], X2 = " ".repeat(W2 + se2);
      g2.push($2(X2, " "), v2 + o);
    }
    return g2;
  })));
}
var On2 = ({ node: e }, t) => e.fullName === "style" && !t.parentParser && !e.value.includes("{{");
var Mn2 = async (e, t, r) => j2(await e(w2(r.node), { parser: "css", __isHTMLStyleAttribute: true }));
var oa = /* @__PURE__ */ new WeakMap();
function la(e, t) {
  return mt2(oa, e.root, (r) => r.children.some((n) => yt2(n, t) && ["ts", "typescript"].includes(n.attrMap.lang)));
}
var H2 = la;
function Bn2(e, t, r) {
  let n = w2(r.node);
  return E(`type T<${n}> = any`, e, { parser: "babel-ts", __isEmbeddedTypescriptGenericParameters: true }, q2);
}
function qn2(e, t, r, n) {
  let i = w2(r.node), s = H2(r, n) ? "babel-ts" : "babel";
  return E(`function _(${i}) {}`, e, { parser: s, __isVueBindings: true });
}
async function Hn2(e, t, r, n) {
  let i = w2(r.node), { left: s, operator: a, right: o } = ca(i), l = H2(r, n);
  return [C(await E(`function _(${s}) {}`, e, { parser: l ? "babel-ts" : "babel", __isVueForBindingLeft: true })), " ", a, " ", await E(o, e, { parser: l ? "__ts_expression" : "__js_expression" })];
}
function ca(e) {
  let t = /(.*?)\s+(in|of)\s+(.*)/s, r = e.match(t);
  if (!r) return;
  let n = { for: r[3].trim() };
  if (!n.for) return;
  let i = /,([^,\]}]*)(?:,([^,\]}]*))?$/, s = /^\(|\)$/g, a = T2(0, r[1].trim(), s, ""), o = a.match(i);
  o ? (n.alias = a.replace(i, ""), n.iterator1 = o[1].trim(), o[2] && (n.iterator2 = o[2].trim())) : n.alias = a;
  let l = [n.alias, n.iterator1, n.iterator2];
  if (!l.some((c, u) => !c && (u === 0 || l.slice(u + 1).some(Boolean)))) return { left: l.filter(Boolean).join(","), operator: r[2], right: n.for };
}
var ua = [{ test: (e) => e.node.fullName === "v-for", print: Hn2 }, { test: (e, t) => e.node.fullName === "generic" && yt2(e.parent, t), print: Bn2 }, { test: ({ node: e }, t) => gn2(e) || _n3(e, t), print: qn2 }, { test(e) {
  let t = e.node.fullName;
  return t.startsWith("@") || t.startsWith("v-on:");
}, print: pa }, { test(e) {
  let t = e.node.fullName;
  return t.startsWith(":") || t.startsWith(".") || t.startsWith("v-bind:");
}, print: ha }, { test: (e) => e.node.fullName.startsWith("v-"), print: Fn2 }].map(({ test: e, print: t }) => ({ test: (r, n) => n.parser === "vue" && e(r, n), print: t }));
async function pa(e, t, r, n) {
  try {
    return await Fn2(e, t, r, n);
  } catch (a) {
    if (a.cause?.code !== "BABEL_PARSER_SYNTAX_ERROR") throw a;
  }
  let i = w2(r.node), s = H2(r, n) ? "__vue_ts_event_binding" : "__vue_event_binding";
  return E(i, e, { parser: s }, q2);
}
function ha(e, t, r, n) {
  let i = w2(r.node), s = H2(r, n) ? "__vue_ts_expression" : "__vue_expression";
  return E(i, e, { parser: s }, q2);
}
function Fn2(e, t, r, n) {
  let i = w2(r.node), s = H2(r, n) ? "__ts_expression" : "__js_expression";
  return E(i, e, { parser: s }, q2);
}
var Vn2 = ua;
var ma = [{ test: Dn2, print: Rn2 }, { test: On2, print: Mn2 }, { test: Tn2, print: yn2 }, { test: bn2, print: wn2 }, { test: xn2, print: Ln2 }, ...Vn2, ...kn2].map(({ test: e, print: t }) => ({ test: e, print: da(t) }));
function fa(e, t) {
  let { node: r } = e, { value: n } = r;
  if (n) return Et2(r, t) ? [r.rawName, "=", n] : ma.find(({ test: i }) => i(e, t))?.print;
}
function da(e) {
  return async (t, r, n, i) => {
    let s = await e(t, r, n, i);
    if (s) return s = Gt2(s, (a) => typeof a == "string" ? T2(0, a, '"', "&quot;") : a), [n.node.rawName, '="', C(s), '"'];
  };
}
var Un2 = fa;
var F = (e) => e.sourceSpan.start.offset;
var Z2 = (e) => e.sourceSpan.end.offset;
function $e(e, t) {
  return [e.isSelfClosing ? "" : ga(e, t), ue2(e, t)];
}
function ga(e, t) {
  return e.lastChild && Q2(e.lastChild) ? "" : [_a4(e, t), xt2(e, t)];
}
function ue2(e, t) {
  return (e.next ? V2(e.next) : he2(e.parent)) ? "" : [pe2(e, t), M2(e, t)];
}
function _a4(e, t) {
  return he2(e) ? pe2(e.lastChild, t) : "";
}
function M2(e, t) {
  return Q2(e) ? xt2(e.parent, t) : je2(e) ? Lt2(e.next, t) : "";
}
function xt2(e, t) {
  if (zn2(e, t)) return "";
  switch (e.kind) {
    case "ieConditionalComment":
      return "<!";
    case "element":
      if (e.hasHtmComponentClosingTag) return "<//";
    default:
      return `</${e.rawName}`;
  }
}
function pe2(e, t) {
  if (zn2(e, t)) return "";
  switch (e.kind) {
    case "ieConditionalComment":
    case "ieConditionalEndComment":
      return "[endif]-->";
    case "ieConditionalStartComment":
      return "]><!-->";
    case "interpolation":
      return "}}";
    case "angularIcuExpression":
      return "}";
    case "element":
      if (e.isSelfClosing) return "/>";
    default:
      return ">";
  }
}
function zn2(e, t) {
  return !e.isSelfClosing && !e.endSourceSpan && (le2(e) || Ct2(e.parent, t));
}
function V2(e) {
  return e.prev && e.prev.kind !== "docType" && e.kind !== "angularControlFlowBlock" && !N2(e.prev) && e.isLeadingSpaceSensitive && !e.hasLeadingSpaces;
}
function he2(e) {
  return e.lastChild?.isTrailingSpaceSensitive && !e.lastChild.hasTrailingSpaces && !N2(bt2(e.lastChild)) && !K2(e);
}
function Q2(e) {
  return !e.next && !e.hasTrailingSpaces && e.isTrailingSpaceSensitive && N2(bt2(e));
}
function je2(e) {
  return e.next && !N2(e.next) && N2(e) && e.isTrailingSpaceSensitive && !e.hasTrailingSpaces;
}
function Sa(e) {
  let t = e.trim().match(/^prettier-ignore-attribute(?:\s+(.+))?$/s);
  return t ? t[1] ? t[1].split(/\s+/) : true : false;
}
function Ye2(e) {
  return !e.prev && e.isLeadingSpaceSensitive && !e.hasLeadingSpaces;
}
function va(e, t, r) {
  let { node: n } = e, { attrs: i = [], startTagComments: s = [] } = n;
  if (i.length === 0 && s.length === 0) return n.isSelfClosing ? " " : "";
  let a = n.prev?.kind === "comment" && Sa(n.prev.value), o = typeof a == "boolean" ? () => a : Array.isArray(a) ? (g2) => a.includes(g2.rawName) : () => false, l = ["attrs", "startTagComments"].filter((g2) => J(n[g2])), c = l.flatMap((g2) => e.map(({ node: v2 }) => ({ loc: F(v2), printed: v2.kind === "attribute" && o(v2) ? L2(t.originalText.slice(F(v2), Z2(v2))) : r() }), g2));
  l.length > 1 && c.sort((g2, v2) => g2.loc - v2.loc);
  let u = n.kind === "element" && n.fullName === "script" && i.length === 1 && i[0].fullName === "src" && n.children.length === 0 && s.length === 0, d = s.some((g2) => g2.type === "single"), h = d || t.singleAttributePerLine && i.length > 1 && !ce2(n, t) ? k2 : S2, f = [A([u ? " " : d ? k2 : S2, R2(h, c.map(({ printed: g2 }) => g2))])];
  return n.firstChild && Ye2(n.firstChild) || n.isSelfClosing && he2(n.parent) || u ? f.push(n.isSelfClosing ? " " : "") : f.push(t.bracketSameLine ? n.isSelfClosing ? " " : "" : n.isSelfClosing ? S2 : y2), f;
}
function Ca(e) {
  return e.firstChild && Ye2(e.firstChild) ? "" : At2(e);
}
function Ke2(e, t, r) {
  let { node: n } = e;
  return [me2(n, t), va(e, t, r), n.isSelfClosing ? "" : Ca(n)];
}
function me2(e, t) {
  return e.prev && je2(e.prev) ? "" : [B(e, t), Lt2(e, t)];
}
function B(e, t) {
  return Ye2(e) ? At2(e.parent) : V2(e) ? pe2(e.prev, t) : "";
}
var Wn2 = "<!doctype";
function Lt2(e, t) {
  switch (e.kind) {
    case "ieConditionalComment":
    case "ieConditionalStartComment":
      return `<!--[if ${e.condition}`;
    case "ieConditionalEndComment":
      return "<!--<!";
    case "interpolation":
      return "{{";
    case "docType": {
      if (e.value === "html") {
        let { filepath: n } = t;
        if (n && /\.html?$/.test(n)) return Wn2;
      }
      let r = F(e);
      return t.originalText.slice(r, r + Wn2.length);
    }
    case "angularIcuExpression":
      return "{";
    case "element":
      if (e.condition) return `<!--[if ${e.condition}]><!--><${e.rawName}`;
    default:
      return `<${e.rawName}`;
  }
}
function At2(e) {
  switch (e.kind) {
    case "ieConditionalComment":
      return "]>";
    case "element":
      if (e.condition) return "><!--<![endif]-->";
    default:
      return ">";
  }
}
function ka(e, t) {
  if (!e.endSourceSpan) return "";
  let r = e.startSourceSpan.end.offset;
  e.firstChild && Ye2(e.firstChild) && (r -= At2(e).length);
  let n = e.endSourceSpan.start.offset;
  return e.lastChild && Q2(e.lastChild) ? n += xt2(e, t).length : he2(e) && (n -= pe2(e.lastChild, t).length), t.originalText.slice(r, n);
}
var Pt2 = ka;
var ba = /* @__PURE__ */ new Set(["if", "else if", "for", "switch", "case"]);
function wa(e, t) {
  let { node: r } = e;
  switch (r.kind) {
    case "element":
      if (O2(r, t) || r.kind === "interpolation") return;
      if (!r.isSelfClosing && wt2(r, t)) {
        let n = rr2(r, t);
        return n ? async (i, s) => {
          let a = Pt2(r, t), o = /^\s*$/.test(a), l = "";
          return o || (l = await i(Zt2(a), { parser: n, __embeddedInHtml: true }), o = l === ""), [B(r, t), C(Ke2(e, t, s)), o ? "" : k2, l, o ? "" : k2, $e(r, t), M2(r, t)];
        } : void 0;
      }
      break;
    case "text":
      if (O2(r.parent, t)) {
        let n = rr2(r.parent, t);
        if (n) return async (i) => {
          let s = n === "markdown" ? P.dedentString(r.value.replace(/^[^\S\n]*\n/, "")) : r.value, a = { parser: n, __embeddedInHtml: true };
          if (t.parser === "html" && n === "babel") {
            let o = "script", { attrMap: l } = r.parent;
            l && (l.type === "module" || (l.type === "text/babel" || l.type === "text/jsx") && l["data-type"] === "module") && (o = "module"), a.__babelSourceType = o;
          }
          return [G2, B(r, t), await i(s, a), M2(r, t)];
        };
      } else if (r.parent.kind === "interpolation") return async (n) => {
        let i = { __isInHtmlInterpolation: true, __embeddedInHtml: true };
        return t.parser === "angular" ? i.parser = "__ng_interpolation" : t.parser === "vue" ? i.parser = H2(e, t) ? "__vue_ts_expression" : "__vue_expression" : i.parser = "__js_expression", [A([S2, await n(r.value, i)]), r.parent.next && V2(r.parent.next) ? " " : S2];
      };
      break;
    case "attribute":
      return Un2(e, t);
    case "angularControlFlowBlockParameters":
      return ba.has(e.parent.name) ? $r2 : void 0;
    case "angularLetDeclarationInitializer":
      return (n) => E(r.value, n, { parser: "__ng_binding", __isInHtmlAttribute: false });
  }
}
var Gn2 = wa;
var Qe2 = null;
function Xe2(e) {
  if (Qe2 !== null && typeof Qe2.property) {
    let t = Qe2;
    return Qe2 = Xe2.prototype = null, t;
  }
  return Qe2 = Xe2.prototype = e ?? /* @__PURE__ */ Object.create(null), new Xe2();
}
var Ta = 10;
for (let e = 0; e <= Ta; e++) Xe2();
function ar2(e) {
  return Xe2(e);
}
function ya(e, t = "type") {
  ar2(e);
  function r(n) {
    let i = n[t], s = e[i];
    if (!Array.isArray(s)) throw Object.assign(new Error(`Missing visitor keys for '${i}'.`), { node: n });
    return s;
  }
  return r;
}
var $n2 = ya;
var Je2 = [["children"]];
var jn2 = { root: Je2[0], element: ["attrs", "startTagComments", "children"], ieConditionalComment: Je2[0], ieConditionalStartComment: [], ieConditionalEndComment: [], interpolation: Je2[0], text: Je2[0], docType: [], comment: [], attribute: [], startTagComment: [], cdata: [], angularControlFlowBlock: ["children", "parameters"], angularControlFlowBlockParameters: Je2[0], angularControlFlowBlockParameter: [], angularLetDeclaration: ["init"], angularLetDeclarationInitializer: [], angularIcuExpression: ["cases"], angularIcuCase: ["expression"] };
var Ea = $n2(jn2, "kind");
var Yn2 = Ea;
var xa = /* @__PURE__ */ new Set(["sourceSpan", "startSourceSpan", "endSourceSpan", "nameSpan", "valueSpan", "keySpan", "tagDefinition", "tokens", "valueTokens", "switchValueSourceSpan", "expSourceSpan", "valueSourceSpan"]);
var La = /* @__PURE__ */ new Set(["if", "else if", "for", "switch", "case"]);
function or2(e, t, r) {
  if (e.kind === "text" || e.kind === "comment") return null;
  if (e.kind === "yaml" && delete t.value, e.kind === "attribute") {
    let { fullName: n, value: i } = e;
    n === "style" || n === "class" || n === "srcset" && (r.fullName === "img" || r.fullName === "source") || n === "allow" && r.fullName === "iframe" || n.startsWith("on") || n.startsWith("@") || n.startsWith(":") || n.startsWith(".") || n.startsWith("#") || n.startsWith("v-") || n === "vars" && r.fullName === "style" || (n === "setup" || n === "generic") && r.fullName === "script" || n === "slot-scope" || n.startsWith("(") || n.startsWith("[") || n.startsWith("*") || n.startsWith("bind") || n.startsWith("i18n") || n.startsWith("on-") || n.startsWith("ng-") || i?.includes("{{") ? delete t.value : i && (t.value = T2(0, i, /'|&quot;|&apos;/g, '"'));
  }
  if (e.kind === "docType" && (t.value = T2(0, e.value.toLowerCase(), /\s+/g, " ")), e.kind === "angularControlFlowBlock" && e.parameters?.children) for (let n of t.parameters.children) La.has(e.name) ? delete n.expression : n.expression = n.expression.trim();
  e.kind === "angularIcuExpression" && (t.switchValue = e.switchValue.trim()), e.kind === "angularLetDeclarationInitializer" && delete t.value, e.kind === "element" && e.isVoid && !e.isSelfClosing && (t.isSelfClosing = true);
}
or2.ignoredProperties = xa;
var Kn2 = "format";
var Qn2 = /^\s*<!--\s*@(?:noformat|noprettier)\s*-->/;
var Xn2 = /^\s*<!--\s*@(?:format|prettier)\s*-->/;
var Jn2 = (e) => Xn2.test(e);
var Zn2 = (e) => Qn2.test(e);
var ei2 = (e) => `<!-- @${Kn2} -->

${e}`;
var ti2 = /* @__PURE__ */ new Map([["if", /* @__PURE__ */ new Set(["else if", "else"])], ["else if", /* @__PURE__ */ new Set(["else if", "else"])], ["for", /* @__PURE__ */ new Set(["empty"])], ["defer", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["placeholder", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["error", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["loading", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["boundary", /* @__PURE__ */ new Set(["error"])]]);
function ri2(e) {
  let t = Z2(e);
  return e.kind === "element" && !e.endSourceSpan && J(e.children) ? Math.max(t, ri2(I2(0, e.children, -1))) : t;
}
function Ze2(e, t, r) {
  let n = e.node;
  if (le2(n)) {
    let i = ri2(n);
    return [B(n, t), L2(P.trimEnd(t.originalText.slice(F(n) + (n.prev && je2(n.prev) ? Lt2(n).length : 0), i - (n.next && V2(n.next) ? pe2(n, t).length : 0)))), M2(n, t)];
  }
  return r();
}
function Nt2(e, t) {
  return N2(e) && N2(t) ? e.isTrailingSpaceSensitive ? e.hasTrailingSpaces ? kt2(t) ? k2 : S2 : "" : kt2(t) ? k2 : y2 : je2(e) && (le2(t) || t.firstChild || t.isSelfClosing || t.kind === "element" && t.attrs.length > 0) || e.kind === "element" && e.isSelfClosing && V2(t) ? "" : t.kind === "comment" && t.isLeadingSpaceSensitive && !t.hasLeadingSpaces ? y2 : !t.isLeadingSpaceSensitive || kt2(t) || V2(t) && e.lastChild && Q2(e.lastChild) && e.lastChild.lastChild && Q2(e.lastChild.lastChild) ? k2 : t.hasLeadingSpaces ? S2 : y2;
}
function Ae2(e, t, r) {
  let { node: n } = e;
  if (tr2(n)) return [G2, ...e.map(() => {
    let s = e.node, a = s.prev ? Nt2(s.prev, s) : "";
    return [a ? [a, We2(s.prev) ? k2 : ""] : "", Ze2(e, t, r)];
  }, "children")];
  let i = n.children.map(() => /* @__PURE__ */ Symbol(""));
  return e.map(({ node: s, index: a }) => {
    if (N2(s)) {
      if (s.prev && N2(s.prev)) {
        let h = Nt2(s.prev, s);
        if (h) return We2(s.prev) ? [k2, k2, Ze2(e, t, r)] : [h, Ze2(e, t, r)];
      }
      return Ze2(e, t, r);
    }
    let o = [], l = [], c = [], u = [], d = s.prev ? Nt2(s.prev, s) : "", _ = s.next ? Nt2(s, s.next) : "";
    return d && (We2(s.prev) ? o.push(k2, k2) : d === k2 ? o.push(k2) : N2(s.prev) ? l.push(d) : l.push($2("", y2, { groupId: i[a - 1] }))), _ && (We2(s) ? N2(s.next) && u.push(k2, k2) : _ === k2 ? N2(s.next) && u.push(k2) : c.push(_)), [...o, C([...l, C([Ze2(e, t, r), ...c], { id: i[a] })]), ...u];
  }, "children");
}
function ni2(e, t, r) {
  let { node: n } = e, i = [];
  Da(e) && i.push("} "), i.push("@", n.name);
  let s = Pa(n);
  if (n.parameters && (s || i.push(" "), i.push("(", C(r("parameters")), ")")), s) return i.push(";"), i;
  if (!Na(n)) {
    i.push(" {");
    let a = ii2(n);
    n.children.length > 0 ? (n.firstChild.hasLeadingSpaces = true, n.lastChild.hasTrailingSpaces = true, i.push(A([k2, Ae2(e, t, r)])), a && i.push(k2, "}")) : a && i.push("}");
  }
  return C(i, { shouldBreak: true });
}
function ii2(e) {
  return !(e.next?.kind === "angularControlFlowBlock" && ti2.get(e.name)?.has(e.next.name));
}
var Aa = (e) => e?.kind === "angularControlFlowBlock" && (e.name === "case" || e.name === "default");
var Pa = (e) => e?.kind === "angularControlFlowBlock" && e.name === "default never";
function Na(e) {
  return Aa(e) && e.endSourceSpan && e.endSourceSpan.start.offset === e.endSourceSpan.end.offset;
}
function Da(e) {
  let { previous: t } = e;
  return t?.kind === "angularControlFlowBlock" && !le2(t) && !ii2(t);
}
function si2(e, t, r) {
  return [A([y2, R2([";", S2], e.map(r, "children"))]), y2];
}
function ai2(e, t, r) {
  let { node: n } = e;
  return [me2(n, t), C([n.switchValue.trim(), ", ", n.type, n.cases.length > 0 ? [",", A([S2, R2(S2, e.map(r, "cases"))])] : "", y2]), ue2(n, t)];
}
function oi2(e, t, r) {
  let { node: n } = e;
  return [n.value, " {", C([A([y2, e.map(({ node: i, isLast: s }) => {
    let a = [r()];
    return i.kind === "text" && (i.hasLeadingSpaces && a.unshift(S2), i.hasTrailingSpaces && !s && a.push(S2)), a;
  }, "expression")]), y2]), "}"];
}
function li2(e, t, r) {
  let { node: n } = e;
  if (Ct2(n, t)) return [B(n, t), C(Ke2(e, t, r)), L2(Pt2(n, t)), ...$e(n, t), M2(n, t)];
  let i = n.children.length === 1 && (n.firstChild.kind === "interpolation" || n.firstChild.kind === "angularIcuExpression") && n.firstChild.isLeadingSpaceSensitive && !n.firstChild.hasLeadingSpaces && n.lastChild.isTrailingSpaceSensitive && !n.lastChild.hasTrailingSpaces, s = /* @__PURE__ */ Symbol("element-attr-group-id"), a = (u) => C([C(Ke2(e, t, r), { id: s }), u, $e(n, t)]);
  if (n.children.length === 0) return a(n.hasDanglingSpaces && n.isDanglingSpaceSensitive ? S2 : "");
  let o = (u) => i ? Fr2(u, { groupId: s }) : (O2(n, t) || Ge2(n, t)) && n.parent.kind === "root" && t.parser === "vue" && !t.vueIndentScriptAndStyle ? u : A(u), l = () => i ? $2(y2, "", { groupId: s }) : n.firstChild.hasLeadingSpaces && n.firstChild.isLeadingSpaceSensitive ? S2 : n.firstChild.kind === "text" && n.isWhitespaceSensitive && n.isIndentationSensitive ? Hr2(y2) : y2, c = () => (n.next ? V2(n.next) : he2(n.parent)) ? n.lastChild.hasTrailingSpaces && n.lastChild.isTrailingSpaceSensitive ? " " : "" : K2(n) && Q2(n.lastChild) ? "" : i ? $2(y2, "", { groupId: s }) : n.lastChild.hasTrailingSpaces && n.lastChild.isTrailingSpaceSensitive ? S2 : (n.lastChild.kind === "comment" || n.lastChild.kind === "text" && n.isWhitespaceSensitive && n.isIndentationSensitive) && new RegExp(`\\n[\\t ]{${t.tabWidth * (e.ancestors.length - 1)}}$`).test(n.lastChild.value) ? "" : y2;
  return a([ln2(n) ? G2 : "", o([l(), Ae2(e, t, r)]), c()]);
}
function ci2(e) {
  let { node: { value: t, type: r } } = e;
  return r === "single" ? `//${t.trimEnd()}` : ["/*", L2(t), "*/"];
}
var lr = (function(e) {
  return e[e.RAW_TEXT = 0] = "RAW_TEXT", e[e.ESCAPABLE_RAW_TEXT = 1] = "ESCAPABLE_RAW_TEXT", e[e.PARSABLE_DATA = 2] = "PARSABLE_DATA", e;
})({});
function ee2(e, t = true) {
  if (e[0] != ":") return [null, e];
  let r = e.indexOf(":", 1);
  if (r === -1) {
    if (t) throw new Error(`Unsupported format "${e}" expecting ":namespace:name"`);
    return [null, e];
  }
  return [e.slice(1, r), e.slice(r + 1)];
}
function cr2(e) {
  return ee2(e)[1] === "ng-container";
}
function ur2(e) {
  return ee2(e)[1] === "ng-content";
}
function Pe2(e) {
  return e === null ? null : ee2(e)[0];
}
function fe2(e, t) {
  return e ? `:${e}:${t}` : t;
}
var et2;
var Ia = "math";
var pr2 = () => /* @__PURE__ */ Object.create(null);
function Ra() {
  return et2 || (et2 = pr2(), te2(1, void 0, [["iframe", ["srcdoc"]], ["*", ["innerHTML", "outerHTML"]]]), te2(2, void 0, [["*", ["style"]]]), te2(4, void 0, [["*", ["formAction"]], ["area", ["href"]], ["a", ["href", "xlink:href"]], ["form", ["action"]], ["img", ["src"]], ["video", ["src"]]]), te2(4, Ia, [["*", ["href", "xlink:href"]]]), te2(5, void 0, [["base", ["href"]], ["embed", ["src"]], ["frame", ["src"]], ["iframe", ["src"]], ["link", ["href"]], ["object", ["codebase", "data"]]]), te2(4, "svg", [["a", ["href", "xlink:href"]]]), te2(6, "svg", [["animate", ["attributeName", "values", "to", "from"]], ["set", ["to", "attributeName"]], ["animateMotion", ["attributeName"]], ["animateTransform", ["attributeName"]]]), te2(6, void 0, [["unknown", ["attributeName", "values", "to", "from", "sandbox", "allow", "allowFullscreen", "referrerPolicy", "csp", "fetchPriority", "credentialless"]], ["iframe", ["sandbox", "allow", "allowFullscreen", "referrerPolicy", "csp", "fetchPriority", "credentialless"]]]), et2);
}
function te2(e, t, r) {
  let n = t ?? "";
  for (let [s, a] of r) {
    let o = s.toLowerCase();
    for (let l of a) {
      var i;
      let c = l.toLowerCase(), u = (i = et2)[c] ?? (i[c] = pr2()), d = u[n] ?? (u[n] = pr2());
      d[o] = e;
    }
  }
}
function ui2(e, t, r) {
  let n = Ra()[t.toLowerCase()];
  if (!n) return 0;
  let i = e.toLowerCase(), s;
  if (r) {
    let a = n[r];
    a && (s = a[i] ?? a["*"]);
  }
  if (s === void 0) {
    let a = n[""];
    a && (s = a[i] ?? a["*"]);
  }
  if (s === void 0 && (!r || r === "")) {
    let a = n.svg;
    a && (s = a[i]);
  }
  return s ?? 0;
}
var hr2 = { name: "custom-elements" };
var mr = { name: "no-errors-schema" };
var Oa = /-+([a-z0-9])/g;
function pi2(e) {
  return e.replace(Oa, (...t) => t[1].toUpperCase());
}
var hi2 = class {
};
var Ma = "boolean";
var Ba = "number";
var qa = "string";
var Ha = "object";
function Dt2(e) {
  let t = e.toLowerCase(), [r, n] = ee2(t, false);
  return r === "svg" || r === "math" ? `:${r}:${n}` : n;
}
var Fa = ["[Element]|textContent,%ariaActiveDescendantElement,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColIndexText,%ariaColSpan,%ariaControlsElements,%ariaCurrent,%ariaDescribedByElements,%ariaDescription,%ariaDetailsElements,%ariaDisabled,%ariaErrorMessageElements,%ariaExpanded,%ariaFlowToElements,%ariaHasPopup,%ariaHidden,%ariaInvalid,%ariaKeyShortcuts,%ariaLabel,%ariaLabelledByElements,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaOwnsElements,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowIndexText,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored", "[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,!inert,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,search,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume", ":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex", ":svg:graphics^:svg:|", ":svg:animation^:svg:|*begin,*end,*repeat", ":svg:geometry^:svg:|", ":svg:componentTransferFunction^:svg:|", ":svg:gradient^:svg:|", ":svg:textContent^:svg:graphics|", ":svg:textPositioning^:svg:textContent|", "a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username", "area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username", "audio^media|", "br^[HTMLElement]|clear", "base^[HTMLElement]|href,target", "body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink", "button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value", "canvas^[HTMLElement]|#height,#width", "content^[HTMLElement]|select", "dl^[HTMLElement]|!compact", "data^[HTMLElement]|value", "datalist^[HTMLElement]|", "details^[HTMLElement]|!open", "dialog^[HTMLElement]|!open,returnValue", "dir^[HTMLElement]|!compact", "div^[HTMLElement]|align", "embed^[HTMLElement]|align,height,name,src,type,width", "fieldset^[HTMLElement]|!disabled,name", "font^[HTMLElement]|color,face,size", "form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target", "frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src", "frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows", "geolocation^[HTMLElement]|accuracymode,!autolocate,*location,*promptaction,*promptdismiss,*validationstatuschange,!watch", "hr^[HTMLElement]|align,color,!noShade,size,width", "head^[HTMLElement]|", "h1,h2,h3,h4,h5,h6^[HTMLElement]|align", "html^[HTMLElement]|version", "iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,!credentialless,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width", "img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width", "input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width", "li^[HTMLElement]|type,#value", "label^[HTMLElement]|htmlFor", "legend^[HTMLElement]|align", "link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type", "map^[HTMLElement]|name", "marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width", "menu^[HTMLElement]|!compact", "meta^[HTMLElement]|content,httpEquiv,media,name,scheme", "meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value", "ins,del^[HTMLElement]|cite,dateTime", "ol^[HTMLElement]|!compact,!reversed,#start,type", "object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width", "optgroup^[HTMLElement]|!disabled,label", "option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value", "output^[HTMLElement]|defaultValue,%htmlFor,name,value", "p^[HTMLElement]|align", "param^[HTMLElement]|name,type,value,valueType", "picture^[HTMLElement]|", "pre^[HTMLElement]|#width", "progress^[HTMLElement]|#max,#value", "q,blockquote,cite^[HTMLElement]|", "script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type", "select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value", "selectedcontent^[HTMLElement]|", "slot^[HTMLElement]|name", "source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width", "span^[HTMLElement]|", "style^[HTMLElement]|!disabled,media,type", "search^[HTMLELement]|", "caption^[HTMLElement]|align", "th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width", "col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width", "table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width", "tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign", "tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign", "template^[HTMLElement]|", "textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap", "time^[HTMLElement]|dateTime", "title^[HTMLElement]|text", "track^[HTMLElement]|!default,kind,label,src,srclang", "ul^[HTMLElement]|!compact,type", "unknown^[HTMLElement]|", "video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width", ":svg:a^:svg:graphics|", ":svg:animate^:svg:animation|", ":svg:animateMotion^:svg:animation|", ":svg:animateTransform^:svg:animation|", ":svg:circle^:svg:geometry|", ":svg:clipPath^:svg:graphics|", ":svg:defs^:svg:graphics|", ":svg:desc^:svg:|", ":svg:discard^:svg:|", ":svg:ellipse^:svg:geometry|", ":svg:feBlend^:svg:|", ":svg:feColorMatrix^:svg:|", ":svg:feComponentTransfer^:svg:|", ":svg:feComposite^:svg:|", ":svg:feConvolveMatrix^:svg:|", ":svg:feDiffuseLighting^:svg:|", ":svg:feDisplacementMap^:svg:|", ":svg:feDistantLight^:svg:|", ":svg:feDropShadow^:svg:|", ":svg:feFlood^:svg:|", ":svg:feFuncA^:svg:componentTransferFunction|", ":svg:feFuncB^:svg:componentTransferFunction|", ":svg:feFuncG^:svg:componentTransferFunction|", ":svg:feFuncR^:svg:componentTransferFunction|", ":svg:feGaussianBlur^:svg:|", ":svg:feImage^:svg:|", ":svg:feMerge^:svg:|", ":svg:feMergeNode^:svg:|", ":svg:feMorphology^:svg:|", ":svg:feOffset^:svg:|", ":svg:fePointLight^:svg:|", ":svg:feSpecularLighting^:svg:|", ":svg:feSpotLight^:svg:|", ":svg:feTile^:svg:|", ":svg:feTurbulence^:svg:|", ":svg:filter^:svg:|", ":svg:foreignObject^:svg:graphics|", ":svg:g^:svg:graphics|", ":svg:image^:svg:graphics|decoding", ":svg:line^:svg:geometry|", ":svg:linearGradient^:svg:gradient|", ":svg:mpath^:svg:|", ":svg:marker^:svg:|", ":svg:mask^:svg:|", ":svg:metadata^:svg:|", ":svg:path^:svg:geometry|", ":svg:pattern^:svg:|", ":svg:polygon^:svg:geometry|", ":svg:polyline^:svg:geometry|", ":svg:radialGradient^:svg:gradient|", ":svg:rect^:svg:geometry|", ":svg:svg^:svg:graphics|#currentScale,#zoomAndPan", ":svg:script^:svg:|type", ":svg:set^:svg:animation|", ":svg:stop^:svg:|", ":svg:style^:svg:|!disabled,media,title,type", ":svg:switch^:svg:graphics|", ":svg:symbol^:svg:|", ":svg:tspan^:svg:textPositioning|", ":svg:text^:svg:textPositioning|", ":svg:textPath^:svg:textContent|", ":svg:title^:svg:|", ":svg:use^:svg:graphics|", ":svg:view^:svg:|#zoomAndPan", "data^[HTMLElement]|value", "keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name", "menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default", "summary^[HTMLElement]|", "time^[HTMLElement]|dateTime", ":svg:cursor^:svg:|", ":math:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforeinput,*beforematch,*beforetoggle,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contentvisibilityautostatechange,*contextlost,*contextmenu,*contextrestored,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*scrollend,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex", ":math:math^:math:|", ":math:maction^:math:|", ":math:menclose^:math:|", ":math:merror^:math:|", ":math:mfenced^:math:|", ":math:mfrac^:math:|", ":math:mi^:math:|", ":math:mmultiscripts^:math:|", ":math:mn^:math:|", ":math:mo^:math:|", ":math:mover^:math:|", ":math:mpadded^:math:|", ":math:mphantom^:math:|", ":math:mroot^:math:|", ":math:mrow^:math:|", ":math:ms^:math:|", ":math:mspace^:math:|", ":math:msqrt^:math:|", ":math:mstyle^:math:|", ":math:msub^:math:|", ":math:msubsup^:math:|", ":math:msup^:math:|", ":math:mtable^:math:|", ":math:mtd^:math:|", ":math:mtext^:math:|", ":math:mtr^:math:|", ":math:munder^:math:|", ":math:munderover^:math:|", ":math:semantics^:math:|"];
var mi2 = new Map(Object.entries({ class: "className", for: "htmlFor", formaction: "formAction", innerHtml: "innerHTML", readonly: "readOnly", tabindex: "tabIndex", "aria-activedescendant": "ariaActiveDescendantElement", "aria-atomic": "ariaAtomic", "aria-autocomplete": "ariaAutoComplete", "aria-busy": "ariaBusy", "aria-checked": "ariaChecked", "aria-colcount": "ariaColCount", "aria-colindex": "ariaColIndex", "aria-colindextext": "ariaColIndexText", "aria-colspan": "ariaColSpan", "aria-controls": "ariaControlsElements", "aria-current": "ariaCurrent", "aria-describedby": "ariaDescribedByElements", "aria-description": "ariaDescription", "aria-details": "ariaDetailsElements", "aria-disabled": "ariaDisabled", "aria-errormessage": "ariaErrorMessageElements", "aria-expanded": "ariaExpanded", "aria-flowto": "ariaFlowToElements", "aria-haspopup": "ariaHasPopup", "aria-hidden": "ariaHidden", "aria-invalid": "ariaInvalid", "aria-keyshortcuts": "ariaKeyShortcuts", "aria-label": "ariaLabel", "aria-labelledby": "ariaLabelledByElements", "aria-level": "ariaLevel", "aria-live": "ariaLive", "aria-modal": "ariaModal", "aria-multiline": "ariaMultiLine", "aria-multiselectable": "ariaMultiSelectable", "aria-orientation": "ariaOrientation", "aria-owns": "ariaOwnsElements", "aria-placeholder": "ariaPlaceholder", "aria-posinset": "ariaPosInSet", "aria-pressed": "ariaPressed", "aria-readonly": "ariaReadOnly", "aria-required": "ariaRequired", "aria-roledescription": "ariaRoleDescription", "aria-rowcount": "ariaRowCount", "aria-rowindex": "ariaRowIndex", "aria-rowindextext": "ariaRowIndexText", "aria-rowspan": "ariaRowSpan", "aria-selected": "ariaSelected", "aria-setsize": "ariaSetSize", "aria-sort": "ariaSort", "aria-valuemax": "ariaValueMax", "aria-valuemin": "ariaValueMin", "aria-valuenow": "ariaValueNow", "aria-valuetext": "ariaValueText" }));
var Va = Array.from(mi2).reduce((e, [t, r]) => (e.set(t, r), e), /* @__PURE__ */ new Map());
var fi2 = class extends hi2 {
  constructor() {
    super();
    __publicField(this, "_schema", /* @__PURE__ */ new Map());
    __publicField(this, "_eventSchema", /* @__PURE__ */ new Map());
    Fa.forEach((e) => {
      let t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), [n, i] = e.split("|"), s = i.split(","), [a, o] = n.split("^");
      a.split(",").forEach((c) => {
        this._schema.set(c.toLowerCase(), t), this._eventSchema.set(c.toLowerCase(), r);
      });
      let l = o && this._schema.get(o.toLowerCase());
      if (l) {
        for (let [c, u] of l) t.set(c, u);
        for (let c of this._eventSchema.get(o.toLowerCase())) r.add(c);
      }
      s.forEach((c) => {
        if (c.length > 0) switch (c[0]) {
          case "*":
            r.add(c.substring(1));
            break;
          case "!":
            t.set(c.substring(1), Ma);
            break;
          case "#":
            t.set(c.substring(1), Ba);
            break;
          case "%":
            t.set(c.substring(1), Ha);
            break;
          default:
            t.set(c, qa);
        }
      });
    });
  }
  hasProperty(e, t, r) {
    if (r.some((i) => i.name === mr.name)) return true;
    let n = Dt2(e);
    if (n.includes("-")) {
      if (cr2(n) || ur2(n)) return false;
      if (r.some((i) => i.name === hr2.name)) return true;
    }
    return (this._schema.get(n) || this._schema.get("unknown")).has(t);
  }
  hasElement(e, t) {
    if (t.some((n) => n.name === mr.name)) return true;
    let r = Dt2(e);
    return r.includes("-") && (cr2(r) || ur2(r) || t.some((n) => n.name === hr2.name)) ? true : this._schema.has(r);
  }
  securityContext(e, t, r) {
    r && (t = this.getMappedPropName(t));
    let [n, i] = ee2(e, false);
    return ui2(i, t, n);
  }
  getMappedPropName(e) {
    return mi2.get(e) ?? e;
  }
  getDefaultComponentElementName() {
    return "ng-component";
  }
  validateProperty(e) {
    return e.toLowerCase().startsWith("on") ? { error: true, msg: `Binding to event property '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...
If '${e}' is a directive input, make sure the directive is imported by the current module.` } : { error: false };
  }
  validateAttribute(e) {
    return e.toLowerCase().startsWith("on") ? { error: true, msg: `Binding to event attribute '${e}' is disallowed for security reasons, please use (${e.slice(2)})=...` } : { error: false };
  }
  allKnownElementNames() {
    return Array.from(this._schema.keys());
  }
  allKnownAttributesOfElement(e) {
    let t = Dt2(e), r = this._schema.get(t) || this._schema.get("unknown");
    return Array.from(r.keys()).map((n) => Va.get(n) ?? n);
  }
  allKnownEventsOfElement(e) {
    let t = Dt2(e);
    return Array.from(this._eventSchema.get(t) ?? []);
  }
  normalizeAnimationStyleProperty(e) {
    return pi2(e);
  }
  normalizeAnimationStyleValue(e, t, r) {
    let n = "", i = r.toString().trim(), s = null;
    if (Ua(e) && r !== 0 && r !== "0") if (typeof r == "number") n = "px";
    else {
      let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
      a && a[1].length == 0 && (s = `Please provide a CSS unit value for ${t}:${r}`);
    }
    return { error: s, value: i + n };
  }
};
function Ua(e) {
  switch (e) {
    case "width":
    case "height":
    case "minWidth":
    case "minHeight":
    case "maxWidth":
    case "maxHeight":
    case "left":
    case "top":
    case "bottom":
    case "right":
    case "fontSize":
    case "outlineWidth":
    case "outlineOffset":
    case "paddingTop":
    case "paddingLeft":
    case "paddingBottom":
    case "paddingRight":
    case "marginTop":
    case "marginLeft":
    case "marginBottom":
    case "marginRight":
    case "borderRadius":
    case "borderWidth":
    case "borderTopWidth":
    case "borderLeftWidth":
    case "borderRightWidth":
    case "borderBottomWidth":
    case "textIndent":
      return true;
    default:
      return false;
  }
}
var m = class {
  constructor({ closedByChildren: e, implicitNamespacePrefix: t, contentType: r = 2, closedByParent: n = false, isVoid: i = false, ignoreFirstLf: s = false, preventNamespaceInheritance: a = false, canSelfClose: o = false } = {}) {
    __publicField(this, "closedByChildren", {});
    __publicField(this, "contentType");
    __publicField(this, "closedByParent", false);
    __publicField(this, "implicitNamespacePrefix");
    __publicField(this, "isVoid");
    __publicField(this, "ignoreFirstLf");
    __publicField(this, "canSelfClose");
    __publicField(this, "preventNamespaceInheritance");
    e && e.length > 0 && e.forEach((l) => this.closedByChildren[l] = true), this.isVoid = i, this.closedByParent = n || i, this.implicitNamespacePrefix = t || null, this.contentType = r, this.ignoreFirstLf = s, this.preventNamespaceInheritance = a, this.canSelfClose = o ?? i;
  }
  isClosedByChild(e) {
    return this.isVoid || e.toLowerCase() in this.closedByChildren;
  }
  getContentType(e) {
    return typeof this.contentType == "object" ? (e === void 0 ? void 0 : this.contentType[e]) ?? this.contentType.default : this.contentType;
  }
};
var di2;
var tt2;
function Ne2(e) {
  return tt2 || (di2 = new m({ canSelfClose: true }), tt2 = Object.assign(/* @__PURE__ */ Object.create(null), { base: new m({ isVoid: true }), meta: new m({ isVoid: true }), area: new m({ isVoid: true }), embed: new m({ isVoid: true }), link: new m({ isVoid: true }), img: new m({ isVoid: true }), input: new m({ isVoid: true }), param: new m({ isVoid: true }), hr: new m({ isVoid: true }), br: new m({ isVoid: true }), source: new m({ isVoid: true }), track: new m({ isVoid: true }), wbr: new m({ isVoid: true }), p: new m({ closedByChildren: ["address", "article", "aside", "blockquote", "div", "dl", "fieldset", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"], closedByParent: true }), thead: new m({ closedByChildren: ["tbody", "tfoot"] }), tbody: new m({ closedByChildren: ["tbody", "tfoot"], closedByParent: true }), tfoot: new m({ closedByChildren: ["tbody"], closedByParent: true }), tr: new m({ closedByChildren: ["tr"], closedByParent: true }), td: new m({ closedByChildren: ["td", "th"], closedByParent: true }), th: new m({ closedByChildren: ["td", "th"], closedByParent: true }), col: new m({ isVoid: true }), svg: new m({ implicitNamespacePrefix: "svg" }), foreignObject: new m({ implicitNamespacePrefix: "svg", preventNamespaceInheritance: true }), math: new m({ implicitNamespacePrefix: "math" }), li: new m({ closedByChildren: ["li"], closedByParent: true }), dt: new m({ closedByChildren: ["dt", "dd"] }), dd: new m({ closedByChildren: ["dt", "dd"], closedByParent: true }), rb: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), rt: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), rtc: new m({ closedByChildren: ["rb", "rtc", "rp"], closedByParent: true }), rp: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), optgroup: new m({ closedByChildren: ["optgroup"], closedByParent: true }), option: new m({ closedByChildren: ["option", "optgroup"], closedByParent: true }), pre: new m({ ignoreFirstLf: true }), listing: new m({ ignoreFirstLf: true }), style: new m({ contentType: 0 }), script: new m({ contentType: 0 }), title: new m({ contentType: { default: 1, svg: 2 } }), textarea: new m({ contentType: 1, ignoreFirstLf: true }) }), new fi2().allKnownElementNames().forEach((t) => {
    !tt2[t] && Pe2(t) === null && (tt2[t] = new m({ canSelfClose: false }));
  })), tt2[e] ?? di2;
}
var De2 = class gi {
  constructor(t, r, n, i) {
    __publicField(this, "file");
    __publicField(this, "offset");
    __publicField(this, "line");
    __publicField(this, "col");
    this.file = t, this.offset = r, this.line = n, this.col = i;
  }
  toString() {
    return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
  }
  moveBy(t) {
    let r = this.file.content, n = r.length, i = this.offset, s = this.line, a = this.col;
    for (; i > 0 && t < 0; ) if (i--, t++, r.charCodeAt(i) == 10) {
      s--;
      let o = r.substring(0, i - 1).lastIndexOf(`
`);
      a = o > 0 ? i - o : i;
    } else a--;
    for (; i < n && t > 0; ) {
      let o = r.charCodeAt(i);
      i++, t--, o == 10 ? (s++, a = 0) : a++;
    }
    return new gi(this.file, i, s, a);
  }
  getContext(t, r) {
    let n = this.file.content, i = this.offset;
    if (i != null) {
      i > n.length - 1 && (i = n.length - 1);
      let s = i, a = 0, o = 0;
      for (; a < t && i > 0 && (i--, a++, !(n[i] == `
` && ++o == r)); ) ;
      for (a = 0, o = 0; a < t && s < n.length - 1 && (s++, a++, !(n[s] == `
` && ++o == r)); ) ;
      return { before: n.substring(i, this.offset), after: n.substring(this.offset, s + 1) };
    }
    return null;
  }
};
var rt2 = class {
  constructor(e, t) {
    __publicField(this, "content");
    __publicField(this, "url");
    this.content = e, this.url = t;
  }
};
var p = class {
  constructor(e, t, r = e, n = null) {
    __publicField(this, "start");
    __publicField(this, "end");
    __publicField(this, "fullStart");
    __publicField(this, "details");
    this.start = e, this.end = t, this.fullStart = r, this.details = n;
  }
  toString() {
    return this.start.file.content.substring(this.start.offset, this.end.offset);
  }
};
var Wa = (function(e) {
  return e[e.WARNING = 0] = "WARNING", e[e.ERROR = 1] = "ERROR", e;
})({});
var re2 = class extends Error {
  constructor(e, t, r = 1, n) {
    super(t);
    __publicField(this, "span");
    __publicField(this, "msg");
    __publicField(this, "level");
    __publicField(this, "relatedError");
    this.span = e, this.msg = t, this.level = r, this.relatedError = n, Object.setPrototypeOf(this, new.target.prototype);
  }
  contextualMessage() {
    let e = this.span.start.getContext(100, 3);
    return e ? `${this.msg} ("${e.before}[${Wa[this.level]} ->]${e.after}")` : this.msg;
  }
  toString() {
    let e = this.span.details ? `, ${this.span.details}` : "";
    return `${this.contextualMessage()}: ${this.span.start}${e}`;
  }
};
var de2 = class {
  constructor(e, t) {
    __publicField(this, "sourceSpan");
    __publicField(this, "i18n");
    this.sourceSpan = e, this.i18n = t;
  }
};
var _i2 = class extends de2 {
  constructor(e, t, r, n) {
    super(t, n);
    __publicField(this, "value");
    __publicField(this, "tokens");
    __publicField(this, "kind", "text");
    this.value = e, this.tokens = r;
  }
  visit(e, t) {
    return e.visitText(this, t);
  }
};
var Si2 = class extends de2 {
  constructor(e, t, r, n) {
    super(t, n);
    __publicField(this, "value");
    __publicField(this, "tokens");
    __publicField(this, "kind", "cdata");
    this.value = e, this.tokens = r;
  }
  visit(e, t) {
    return e.visitCdata(this, t);
  }
};
var vi2 = class extends de2 {
  constructor(e, t, r, n, i, s) {
    super(n, s);
    __publicField(this, "switchValue");
    __publicField(this, "type");
    __publicField(this, "cases");
    __publicField(this, "switchValueSourceSpan");
    __publicField(this, "kind", "expansion");
    this.switchValue = e, this.type = t, this.cases = r, this.switchValueSourceSpan = i;
  }
  visit(e, t) {
    return e.visitExpansion(this, t);
  }
};
var Ci2 = class {
  constructor(e, t, r, n, i) {
    __publicField(this, "value");
    __publicField(this, "expression");
    __publicField(this, "sourceSpan");
    __publicField(this, "valueSourceSpan");
    __publicField(this, "expSourceSpan");
    __publicField(this, "kind", "expansionCase");
    this.value = e, this.expression = t, this.sourceSpan = r, this.valueSourceSpan = n, this.expSourceSpan = i;
  }
  visit(e, t) {
    return e.visitExpansionCase(this, t);
  }
};
var ki2 = class extends de2 {
  constructor(e, t, r, n, i, s, a) {
    super(r, a);
    __publicField(this, "name");
    __publicField(this, "value");
    __publicField(this, "keySpan");
    __publicField(this, "valueSpan");
    __publicField(this, "valueTokens");
    __publicField(this, "kind", "attribute");
    this.name = e, this.value = t, this.keySpan = n, this.valueSpan = i, this.valueTokens = s;
  }
  visit(e, t) {
    return e.visitAttribute(this, t);
  }
  get nameSpan() {
    return this.keySpan;
  }
};
var bi2 = class {
  constructor(e, t, r) {
    __publicField(this, "value");
    __publicField(this, "type");
    __publicField(this, "sourceSpan");
    __publicField(this, "kind", "startTagComment");
    this.value = e, this.type = t, this.sourceSpan = r;
  }
  visit(e, t) {
    return e.visitStartTagComment ? e.visitStartTagComment(this, t) : void 0;
  }
};
var ne2 = class extends de2 {
  constructor(e, t, r, n, i, s, a, o = null, l = null, c, u, d = []) {
    super(s, u);
    __publicField(this, "name");
    __publicField(this, "attrs");
    __publicField(this, "directives");
    __publicField(this, "children");
    __publicField(this, "isSelfClosing");
    __publicField(this, "startSourceSpan");
    __publicField(this, "endSourceSpan");
    __publicField(this, "nameSpan");
    __publicField(this, "isVoid");
    __publicField(this, "comments");
    __publicField(this, "kind", "element");
    this.name = e, this.attrs = t, this.directives = r, this.children = n, this.isSelfClosing = i, this.startSourceSpan = a, this.endSourceSpan = o, this.nameSpan = l, this.isVoid = c, this.comments = d;
  }
  visit(e, t) {
    return e.visitElement(this, t);
  }
};
var wi2 = class {
  constructor(e, t) {
    __publicField(this, "value");
    __publicField(this, "sourceSpan");
    __publicField(this, "kind", "comment");
    this.value = e, this.sourceSpan = t;
  }
  visit(e, t) {
    return e.visitComment(this, t);
  }
};
var Ti2 = class {
  constructor(e, t) {
    __publicField(this, "value");
    __publicField(this, "sourceSpan");
    __publicField(this, "kind", "docType");
    this.value = e, this.sourceSpan = t;
  }
  visit(e, t) {
    return e.visitDocType(this, t);
  }
};
var ge2 = class extends de2 {
  constructor(e, t, r, n, i, s, a = null, o) {
    super(n, o);
    __publicField(this, "name");
    __publicField(this, "parameters");
    __publicField(this, "children");
    __publicField(this, "nameSpan");
    __publicField(this, "startSourceSpan");
    __publicField(this, "endSourceSpan");
    __publicField(this, "kind", "block");
    this.name = e, this.parameters = t, this.children = r, this.nameSpan = i, this.startSourceSpan = s, this.endSourceSpan = a;
  }
  visit(e, t) {
    return e.visitBlock(this, t);
  }
};
var U2 = class extends de2 {
  constructor(e, t, r, n, i, s, a, o, l, c = null, u, d = []) {
    super(o, u);
    __publicField(this, "componentName");
    __publicField(this, "tagName");
    __publicField(this, "fullName");
    __publicField(this, "attrs");
    __publicField(this, "directives");
    __publicField(this, "children");
    __publicField(this, "isSelfClosing");
    __publicField(this, "startSourceSpan");
    __publicField(this, "endSourceSpan");
    __publicField(this, "comments");
    __publicField(this, "kind", "component");
    this.componentName = e, this.tagName = t, this.fullName = r, this.attrs = n, this.directives = i, this.children = s, this.isSelfClosing = a, this.startSourceSpan = l, this.endSourceSpan = c, this.comments = d;
  }
  visit(e, t) {
    return e.visitComponent(this, t);
  }
};
var yi2 = class {
  constructor(e, t, r, n, i = null) {
    __publicField(this, "name");
    __publicField(this, "attrs");
    __publicField(this, "sourceSpan");
    __publicField(this, "startSourceSpan");
    __publicField(this, "endSourceSpan");
    __publicField(this, "kind", "directive");
    this.name = e, this.attrs = t, this.sourceSpan = r, this.startSourceSpan = n, this.endSourceSpan = i;
  }
  visit(e, t) {
    return e.visitDirective(this, t);
  }
};
var fr2 = class {
  constructor(e, t) {
    __publicField(this, "expression");
    __publicField(this, "sourceSpan");
    __publicField(this, "kind", "blockParameter");
    __publicField(this, "startSourceSpan", null);
    __publicField(this, "endSourceSpan", null);
    this.expression = e, this.sourceSpan = t;
  }
  visit(e, t) {
    return e.visitBlockParameter(this, t);
  }
};
var dr2 = class {
  constructor(e, t, r, n, i) {
    __publicField(this, "name");
    __publicField(this, "value");
    __publicField(this, "sourceSpan");
    __publicField(this, "nameSpan");
    __publicField(this, "valueSpan");
    __publicField(this, "kind", "letDeclaration");
    __publicField(this, "startSourceSpan", null);
    __publicField(this, "endSourceSpan", null);
    this.name = e, this.value = t, this.sourceSpan = r, this.nameSpan = n, this.valueSpan = i;
  }
  visit(e, t) {
    return e.visitLetDeclaration(this, t);
  }
};
function It2(e, t, r = null) {
  let n = [], i = e.visit ? (s) => e.visit(s, r) || s.visit(e, r) : (s) => s.visit(e, r);
  return t.forEach((s) => {
    let a = i(s);
    a && n.push(a);
  }), n;
}
var gr2 = class {
  constructor() {
  }
  visitElement(e, t) {
    this.visitChildren(t, (r) => {
      r(e.attrs), r(e.directives), r(e.comments), r(e.children);
    });
  }
  visitAttribute(e, t) {
  }
  visitStartTagComment(e, t) {
  }
  visitText(e, t) {
  }
  visitCdata(e, t) {
  }
  visitComment(e, t) {
  }
  visitDocType(e, t) {
  }
  visitExpansion(e, t) {
    return this.visitChildren(t, (r) => {
      r(e.cases);
    });
  }
  visitExpansionCase(e, t) {
  }
  visitBlock(e, t) {
    this.visitChildren(t, (r) => {
      r(e.parameters), r(e.children);
    });
  }
  visitBlockParameter(e, t) {
  }
  visitLetDeclaration(e, t) {
  }
  visitComponent(e, t) {
    this.visitChildren(t, (r) => {
      r(e.attrs), r(e.comments), r(e.children);
    });
  }
  visitDirective(e, t) {
    this.visitChildren(t, (r) => {
      r(e.attrs);
    });
  }
  visitChildren(e, t) {
    let r = [], n = this;
    function i(s) {
      s && r.push(It2(n, s, e));
    }
    return t(i), Array.prototype.concat.apply([], r);
  }
};
function nt2(e) {
  return e >= 9 && e <= 32 || e == 160;
}
function Ie2(e) {
  return 48 <= e && e <= 57;
}
function Re2(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function Ei2(e) {
  return e >= 97 && e <= 102 || e >= 65 && e <= 70 || Ie2(e);
}
function Oe2(e) {
  return e === 10 || e === 13;
}
function _r3(e) {
  return 48 <= e && e <= 55;
}
function Rt2(e) {
  return e === 39 || e === 34 || e === 96;
}
var _e4 = { AElig: "\xC6", AMP: "&", amp: "&", Aacute: "\xC1", Abreve: "\u0102", Acirc: "\xC2", Acy: "\u0410", Afr: "\u{1D504}", Agrave: "\xC0", Alpha: "\u0391", Amacr: "\u0100", And: "\u2A53", Aogon: "\u0104", Aopf: "\u{1D538}", ApplyFunction: "\u2061", af: "\u2061", Aring: "\xC5", angst: "\xC5", Ascr: "\u{1D49C}", Assign: "\u2254", colone: "\u2254", coloneq: "\u2254", Atilde: "\xC3", Auml: "\xC4", Backslash: "\u2216", setminus: "\u2216", setmn: "\u2216", smallsetminus: "\u2216", ssetmn: "\u2216", Barv: "\u2AE7", Barwed: "\u2306", doublebarwedge: "\u2306", Bcy: "\u0411", Because: "\u2235", becaus: "\u2235", because: "\u2235", Bernoullis: "\u212C", Bscr: "\u212C", bernou: "\u212C", Beta: "\u0392", Bfr: "\u{1D505}", Bopf: "\u{1D539}", Breve: "\u02D8", breve: "\u02D8", Bumpeq: "\u224E", HumpDownHump: "\u224E", bump: "\u224E", CHcy: "\u0427", COPY: "\xA9", copy: "\xA9", Cacute: "\u0106", Cap: "\u22D2", CapitalDifferentialD: "\u2145", DD: "\u2145", Cayleys: "\u212D", Cfr: "\u212D", Ccaron: "\u010C", Ccedil: "\xC7", Ccirc: "\u0108", Cconint: "\u2230", Cdot: "\u010A", Cedilla: "\xB8", cedil: "\xB8", CenterDot: "\xB7", centerdot: "\xB7", middot: "\xB7", Chi: "\u03A7", CircleDot: "\u2299", odot: "\u2299", CircleMinus: "\u2296", ominus: "\u2296", CirclePlus: "\u2295", oplus: "\u2295", CircleTimes: "\u2297", otimes: "\u2297", ClockwiseContourIntegral: "\u2232", cwconint: "\u2232", CloseCurlyDoubleQuote: "\u201D", rdquo: "\u201D", rdquor: "\u201D", CloseCurlyQuote: "\u2019", rsquo: "\u2019", rsquor: "\u2019", Colon: "\u2237", Proportion: "\u2237", Colone: "\u2A74", Congruent: "\u2261", equiv: "\u2261", Conint: "\u222F", DoubleContourIntegral: "\u222F", ContourIntegral: "\u222E", conint: "\u222E", oint: "\u222E", Copf: "\u2102", complexes: "\u2102", Coproduct: "\u2210", coprod: "\u2210", CounterClockwiseContourIntegral: "\u2233", awconint: "\u2233", Cross: "\u2A2F", Cscr: "\u{1D49E}", Cup: "\u22D3", CupCap: "\u224D", asympeq: "\u224D", DDotrahd: "\u2911", DJcy: "\u0402", DScy: "\u0405", DZcy: "\u040F", Dagger: "\u2021", ddagger: "\u2021", Darr: "\u21A1", Dashv: "\u2AE4", DoubleLeftTee: "\u2AE4", Dcaron: "\u010E", Dcy: "\u0414", Del: "\u2207", nabla: "\u2207", Delta: "\u0394", Dfr: "\u{1D507}", DiacriticalAcute: "\xB4", acute: "\xB4", DiacriticalDot: "\u02D9", dot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", dblac: "\u02DD", DiacriticalGrave: "`", grave: "`", DiacriticalTilde: "\u02DC", tilde: "\u02DC", Diamond: "\u22C4", diam: "\u22C4", diamond: "\u22C4", DifferentialD: "\u2146", dd: "\u2146", Dopf: "\u{1D53B}", Dot: "\xA8", DoubleDot: "\xA8", die: "\xA8", uml: "\xA8", DotDot: "\u20DC", DotEqual: "\u2250", doteq: "\u2250", esdot: "\u2250", DoubleDownArrow: "\u21D3", Downarrow: "\u21D3", dArr: "\u21D3", DoubleLeftArrow: "\u21D0", Leftarrow: "\u21D0", lArr: "\u21D0", DoubleLeftRightArrow: "\u21D4", Leftrightarrow: "\u21D4", hArr: "\u21D4", iff: "\u21D4", DoubleLongLeftArrow: "\u27F8", Longleftarrow: "\u27F8", xlArr: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", Longleftrightarrow: "\u27FA", xhArr: "\u27FA", DoubleLongRightArrow: "\u27F9", Longrightarrow: "\u27F9", xrArr: "\u27F9", DoubleRightArrow: "\u21D2", Implies: "\u21D2", Rightarrow: "\u21D2", rArr: "\u21D2", DoubleRightTee: "\u22A8", vDash: "\u22A8", DoubleUpArrow: "\u21D1", Uparrow: "\u21D1", uArr: "\u21D1", DoubleUpDownArrow: "\u21D5", Updownarrow: "\u21D5", vArr: "\u21D5", DoubleVerticalBar: "\u2225", par: "\u2225", parallel: "\u2225", shortparallel: "\u2225", spar: "\u2225", DownArrow: "\u2193", ShortDownArrow: "\u2193", darr: "\u2193", downarrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", duarr: "\u21F5", DownBreve: "\u0311", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", leftharpoondown: "\u21BD", lhard: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", rhard: "\u21C1", rightharpoondown: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", top: "\u22A4", DownTeeArrow: "\u21A7", mapstodown: "\u21A7", Dscr: "\u{1D49F}", Dstrok: "\u0110", ENG: "\u014A", ETH: "\xD0", Eacute: "\xC9", Ecaron: "\u011A", Ecirc: "\xCA", Ecy: "\u042D", Edot: "\u0116", Efr: "\u{1D508}", Egrave: "\xC8", Element: "\u2208", in: "\u2208", isin: "\u2208", isinv: "\u2208", Emacr: "\u0112", EmptySmallSquare: "\u25FB", EmptyVerySmallSquare: "\u25AB", Eogon: "\u0118", Eopf: "\u{1D53C}", Epsilon: "\u0395", Equal: "\u2A75", EqualTilde: "\u2242", eqsim: "\u2242", esim: "\u2242", Equilibrium: "\u21CC", rightleftharpoons: "\u21CC", rlhar: "\u21CC", Escr: "\u2130", expectation: "\u2130", Esim: "\u2A73", Eta: "\u0397", Euml: "\xCB", Exists: "\u2203", exist: "\u2203", ExponentialE: "\u2147", ee: "\u2147", exponentiale: "\u2147", Fcy: "\u0424", Ffr: "\u{1D509}", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", blacksquare: "\u25AA", squarf: "\u25AA", squf: "\u25AA", Fopf: "\u{1D53D}", ForAll: "\u2200", forall: "\u2200", Fouriertrf: "\u2131", Fscr: "\u2131", GJcy: "\u0403", GT: ">", gt: ">", Gamma: "\u0393", Gammad: "\u03DC", Gbreve: "\u011E", Gcedil: "\u0122", Gcirc: "\u011C", Gcy: "\u0413", Gdot: "\u0120", Gfr: "\u{1D50A}", Gg: "\u22D9", ggg: "\u22D9", Gopf: "\u{1D53E}", GreaterEqual: "\u2265", ge: "\u2265", geq: "\u2265", GreaterEqualLess: "\u22DB", gel: "\u22DB", gtreqless: "\u22DB", GreaterFullEqual: "\u2267", gE: "\u2267", geqq: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", gl: "\u2277", gtrless: "\u2277", GreaterSlantEqual: "\u2A7E", geqslant: "\u2A7E", ges: "\u2A7E", GreaterTilde: "\u2273", gsim: "\u2273", gtrsim: "\u2273", Gscr: "\u{1D4A2}", Gt: "\u226B", NestedGreaterGreater: "\u226B", gg: "\u226B", HARDcy: "\u042A", Hacek: "\u02C7", caron: "\u02C7", Hat: "^", Hcirc: "\u0124", Hfr: "\u210C", Poincareplane: "\u210C", HilbertSpace: "\u210B", Hscr: "\u210B", hamilt: "\u210B", Hopf: "\u210D", quaternions: "\u210D", HorizontalLine: "\u2500", boxh: "\u2500", Hstrok: "\u0126", HumpEqual: "\u224F", bumpe: "\u224F", bumpeq: "\u224F", IEcy: "\u0415", IJlig: "\u0132", IOcy: "\u0401", Iacute: "\xCD", Icirc: "\xCE", Icy: "\u0418", Idot: "\u0130", Ifr: "\u2111", Im: "\u2111", image: "\u2111", imagpart: "\u2111", Igrave: "\xCC", Imacr: "\u012A", ImaginaryI: "\u2148", ii: "\u2148", Int: "\u222C", Integral: "\u222B", int: "\u222B", Intersection: "\u22C2", bigcap: "\u22C2", xcap: "\u22C2", InvisibleComma: "\u2063", ic: "\u2063", InvisibleTimes: "\u2062", it: "\u2062", Iogon: "\u012E", Iopf: "\u{1D540}", Iota: "\u0399", Iscr: "\u2110", imagline: "\u2110", Itilde: "\u0128", Iukcy: "\u0406", Iuml: "\xCF", Jcirc: "\u0134", Jcy: "\u0419", Jfr: "\u{1D50D}", Jopf: "\u{1D541}", Jscr: "\u{1D4A5}", Jsercy: "\u0408", Jukcy: "\u0404", KHcy: "\u0425", KJcy: "\u040C", Kappa: "\u039A", Kcedil: "\u0136", Kcy: "\u041A", Kfr: "\u{1D50E}", Kopf: "\u{1D542}", Kscr: "\u{1D4A6}", LJcy: "\u0409", LT: "<", lt: "<", Lacute: "\u0139", Lambda: "\u039B", Lang: "\u27EA", Laplacetrf: "\u2112", Lscr: "\u2112", lagran: "\u2112", Larr: "\u219E", twoheadleftarrow: "\u219E", Lcaron: "\u013D", Lcedil: "\u013B", Lcy: "\u041B", LeftAngleBracket: "\u27E8", lang: "\u27E8", langle: "\u27E8", LeftArrow: "\u2190", ShortLeftArrow: "\u2190", larr: "\u2190", leftarrow: "\u2190", slarr: "\u2190", LeftArrowBar: "\u21E4", larrb: "\u21E4", LeftArrowRightArrow: "\u21C6", leftrightarrows: "\u21C6", lrarr: "\u21C6", LeftCeiling: "\u2308", lceil: "\u2308", LeftDoubleBracket: "\u27E6", lobrk: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", dharl: "\u21C3", downharpoonleft: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", lfloor: "\u230A", LeftRightArrow: "\u2194", harr: "\u2194", leftrightarrow: "\u2194", LeftRightVector: "\u294E", LeftTee: "\u22A3", dashv: "\u22A3", LeftTeeArrow: "\u21A4", mapstoleft: "\u21A4", LeftTeeVector: "\u295A", LeftTriangle: "\u22B2", vartriangleleft: "\u22B2", vltri: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", ltrie: "\u22B4", trianglelefteq: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", uharl: "\u21BF", upharpoonleft: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", leftharpoonup: "\u21BC", lharu: "\u21BC", LeftVectorBar: "\u2952", LessEqualGreater: "\u22DA", leg: "\u22DA", lesseqgtr: "\u22DA", LessFullEqual: "\u2266", lE: "\u2266", leqq: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", lg: "\u2276", LessLess: "\u2AA1", LessSlantEqual: "\u2A7D", leqslant: "\u2A7D", les: "\u2A7D", LessTilde: "\u2272", lesssim: "\u2272", lsim: "\u2272", Lfr: "\u{1D50F}", Ll: "\u22D8", Lleftarrow: "\u21DA", lAarr: "\u21DA", Lmidot: "\u013F", LongLeftArrow: "\u27F5", longleftarrow: "\u27F5", xlarr: "\u27F5", LongLeftRightArrow: "\u27F7", longleftrightarrow: "\u27F7", xharr: "\u27F7", LongRightArrow: "\u27F6", longrightarrow: "\u27F6", xrarr: "\u27F6", Lopf: "\u{1D543}", LowerLeftArrow: "\u2199", swarr: "\u2199", swarrow: "\u2199", LowerRightArrow: "\u2198", searr: "\u2198", searrow: "\u2198", Lsh: "\u21B0", lsh: "\u21B0", Lstrok: "\u0141", Lt: "\u226A", NestedLessLess: "\u226A", ll: "\u226A", Map: "\u2905", Mcy: "\u041C", MediumSpace: "\u205F", Mellintrf: "\u2133", Mscr: "\u2133", phmmat: "\u2133", Mfr: "\u{1D510}", MinusPlus: "\u2213", mnplus: "\u2213", mp: "\u2213", Mopf: "\u{1D544}", Mu: "\u039C", NJcy: "\u040A", Nacute: "\u0143", Ncaron: "\u0147", Ncedil: "\u0145", Ncy: "\u041D", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", ZeroWidthSpace: "\u200B", NewLine: `
`, Nfr: "\u{1D511}", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nbsp: "\xA0", Nopf: "\u2115", naturals: "\u2115", Not: "\u2AEC", NotCongruent: "\u2262", nequiv: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", npar: "\u2226", nparallel: "\u2226", nshortparallel: "\u2226", nspar: "\u2226", NotElement: "\u2209", notin: "\u2209", notinva: "\u2209", NotEqual: "\u2260", ne: "\u2260", NotEqualTilde: "\u2242\u0338", nesim: "\u2242\u0338", NotExists: "\u2204", nexist: "\u2204", nexists: "\u2204", NotGreater: "\u226F", ngt: "\u226F", ngtr: "\u226F", NotGreaterEqual: "\u2271", nge: "\u2271", ngeq: "\u2271", NotGreaterFullEqual: "\u2267\u0338", ngE: "\u2267\u0338", ngeqq: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", nGtv: "\u226B\u0338", NotGreaterLess: "\u2279", ntgl: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", NotGreaterTilde: "\u2275", ngsim: "\u2275", NotHumpDownHump: "\u224E\u0338", nbump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", nbumpe: "\u224F\u0338", NotLeftTriangle: "\u22EA", nltri: "\u22EA", ntriangleleft: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", nltrie: "\u22EC", ntrianglelefteq: "\u22EC", NotLess: "\u226E", nless: "\u226E", nlt: "\u226E", NotLessEqual: "\u2270", nle: "\u2270", nleq: "\u2270", NotLessGreater: "\u2278", ntlg: "\u2278", NotLessLess: "\u226A\u0338", nLtv: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", NotLessTilde: "\u2274", nlsim: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", NotPrecedes: "\u2280", npr: "\u2280", nprec: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", npre: "\u2AAF\u0338", npreceq: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", nprcue: "\u22E0", NotReverseElement: "\u220C", notni: "\u220C", notniva: "\u220C", NotRightTriangle: "\u22EB", nrtri: "\u22EB", ntriangleright: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", nrtrie: "\u22ED", ntrianglerighteq: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", nsqsube: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", nsqsupe: "\u22E3", NotSubset: "\u2282\u20D2", nsubset: "\u2282\u20D2", vnsub: "\u2282\u20D2", NotSubsetEqual: "\u2288", nsube: "\u2288", nsubseteq: "\u2288", NotSucceeds: "\u2281", nsc: "\u2281", nsucc: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", nsce: "\u2AB0\u0338", nsucceq: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", nsccue: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", nsupset: "\u2283\u20D2", vnsup: "\u2283\u20D2", NotSupersetEqual: "\u2289", nsupe: "\u2289", nsupseteq: "\u2289", NotTilde: "\u2241", nsim: "\u2241", NotTildeEqual: "\u2244", nsime: "\u2244", nsimeq: "\u2244", NotTildeFullEqual: "\u2247", ncong: "\u2247", NotTildeTilde: "\u2249", nap: "\u2249", napprox: "\u2249", NotVerticalBar: "\u2224", nmid: "\u2224", nshortmid: "\u2224", nsmid: "\u2224", Nscr: "\u{1D4A9}", Ntilde: "\xD1", Nu: "\u039D", OElig: "\u0152", Oacute: "\xD3", Ocirc: "\xD4", Ocy: "\u041E", Odblac: "\u0150", Ofr: "\u{1D512}", Ograve: "\xD2", Omacr: "\u014C", Omega: "\u03A9", ohm: "\u03A9", Omicron: "\u039F", Oopf: "\u{1D546}", OpenCurlyDoubleQuote: "\u201C", ldquo: "\u201C", OpenCurlyQuote: "\u2018", lsquo: "\u2018", Or: "\u2A54", Oscr: "\u{1D4AA}", Oslash: "\xD8", Otilde: "\xD5", Otimes: "\u2A37", Ouml: "\xD6", OverBar: "\u203E", oline: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", tbrk: "\u23B4", OverParenthesis: "\u23DC", PartialD: "\u2202", part: "\u2202", Pcy: "\u041F", Pfr: "\u{1D513}", Phi: "\u03A6", Pi: "\u03A0", PlusMinus: "\xB1", plusmn: "\xB1", pm: "\xB1", Popf: "\u2119", primes: "\u2119", Pr: "\u2ABB", Precedes: "\u227A", pr: "\u227A", prec: "\u227A", PrecedesEqual: "\u2AAF", pre: "\u2AAF", preceq: "\u2AAF", PrecedesSlantEqual: "\u227C", prcue: "\u227C", preccurlyeq: "\u227C", PrecedesTilde: "\u227E", precsim: "\u227E", prsim: "\u227E", Prime: "\u2033", Product: "\u220F", prod: "\u220F", Proportional: "\u221D", prop: "\u221D", propto: "\u221D", varpropto: "\u221D", vprop: "\u221D", Pscr: "\u{1D4AB}", Psi: "\u03A8", QUOT: '"', quot: '"', Qfr: "\u{1D514}", Qopf: "\u211A", rationals: "\u211A", Qscr: "\u{1D4AC}", RBarr: "\u2910", drbkarow: "\u2910", REG: "\xAE", circledR: "\xAE", reg: "\xAE", Racute: "\u0154", Rang: "\u27EB", Rarr: "\u21A0", twoheadrightarrow: "\u21A0", Rarrtl: "\u2916", Rcaron: "\u0158", Rcedil: "\u0156", Rcy: "\u0420", Re: "\u211C", Rfr: "\u211C", real: "\u211C", realpart: "\u211C", ReverseElement: "\u220B", SuchThat: "\u220B", ni: "\u220B", niv: "\u220B", ReverseEquilibrium: "\u21CB", leftrightharpoons: "\u21CB", lrhar: "\u21CB", ReverseUpEquilibrium: "\u296F", duhar: "\u296F", Rho: "\u03A1", RightAngleBracket: "\u27E9", rang: "\u27E9", rangle: "\u27E9", RightArrow: "\u2192", ShortRightArrow: "\u2192", rarr: "\u2192", rightarrow: "\u2192", srarr: "\u2192", RightArrowBar: "\u21E5", rarrb: "\u21E5", RightArrowLeftArrow: "\u21C4", rightleftarrows: "\u21C4", rlarr: "\u21C4", RightCeiling: "\u2309", rceil: "\u2309", RightDoubleBracket: "\u27E7", robrk: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", dharr: "\u21C2", downharpoonright: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", rfloor: "\u230B", RightTee: "\u22A2", vdash: "\u22A2", RightTeeArrow: "\u21A6", map: "\u21A6", mapsto: "\u21A6", RightTeeVector: "\u295B", RightTriangle: "\u22B3", vartriangleright: "\u22B3", vrtri: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", rtrie: "\u22B5", trianglerighteq: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", uharr: "\u21BE", upharpoonright: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", rharu: "\u21C0", rightharpoonup: "\u21C0", RightVectorBar: "\u2953", Ropf: "\u211D", reals: "\u211D", RoundImplies: "\u2970", Rrightarrow: "\u21DB", rAarr: "\u21DB", Rscr: "\u211B", realine: "\u211B", Rsh: "\u21B1", rsh: "\u21B1", RuleDelayed: "\u29F4", SHCHcy: "\u0429", SHcy: "\u0428", SOFTcy: "\u042C", Sacute: "\u015A", Sc: "\u2ABC", Scaron: "\u0160", Scedil: "\u015E", Scirc: "\u015C", Scy: "\u0421", Sfr: "\u{1D516}", ShortUpArrow: "\u2191", UpArrow: "\u2191", uarr: "\u2191", uparrow: "\u2191", Sigma: "\u03A3", SmallCircle: "\u2218", compfn: "\u2218", Sopf: "\u{1D54A}", Sqrt: "\u221A", radic: "\u221A", Square: "\u25A1", squ: "\u25A1", square: "\u25A1", SquareIntersection: "\u2293", sqcap: "\u2293", SquareSubset: "\u228F", sqsub: "\u228F", sqsubset: "\u228F", SquareSubsetEqual: "\u2291", sqsube: "\u2291", sqsubseteq: "\u2291", SquareSuperset: "\u2290", sqsup: "\u2290", sqsupset: "\u2290", SquareSupersetEqual: "\u2292", sqsupe: "\u2292", sqsupseteq: "\u2292", SquareUnion: "\u2294", sqcup: "\u2294", Sscr: "\u{1D4AE}", Star: "\u22C6", sstarf: "\u22C6", Sub: "\u22D0", Subset: "\u22D0", SubsetEqual: "\u2286", sube: "\u2286", subseteq: "\u2286", Succeeds: "\u227B", sc: "\u227B", succ: "\u227B", SucceedsEqual: "\u2AB0", sce: "\u2AB0", succeq: "\u2AB0", SucceedsSlantEqual: "\u227D", sccue: "\u227D", succcurlyeq: "\u227D", SucceedsTilde: "\u227F", scsim: "\u227F", succsim: "\u227F", Sum: "\u2211", sum: "\u2211", Sup: "\u22D1", Supset: "\u22D1", Superset: "\u2283", sup: "\u2283", supset: "\u2283", SupersetEqual: "\u2287", supe: "\u2287", supseteq: "\u2287", THORN: "\xDE", TRADE: "\u2122", trade: "\u2122", TSHcy: "\u040B", TScy: "\u0426", Tab: "	", Tau: "\u03A4", Tcaron: "\u0164", Tcedil: "\u0162", Tcy: "\u0422", Tfr: "\u{1D517}", Therefore: "\u2234", there4: "\u2234", therefore: "\u2234", Theta: "\u0398", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", Tilde: "\u223C", sim: "\u223C", thicksim: "\u223C", thksim: "\u223C", TildeEqual: "\u2243", sime: "\u2243", simeq: "\u2243", TildeFullEqual: "\u2245", cong: "\u2245", TildeTilde: "\u2248", ap: "\u2248", approx: "\u2248", asymp: "\u2248", thickapprox: "\u2248", thkap: "\u2248", Topf: "\u{1D54B}", TripleDot: "\u20DB", tdot: "\u20DB", Tscr: "\u{1D4AF}", Tstrok: "\u0166", Uacute: "\xDA", Uarr: "\u219F", Uarrocir: "\u2949", Ubrcy: "\u040E", Ubreve: "\u016C", Ucirc: "\xDB", Ucy: "\u0423", Udblac: "\u0170", Ufr: "\u{1D518}", Ugrave: "\xD9", Umacr: "\u016A", UnderBar: "_", lowbar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", bbrk: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", bigcup: "\u22C3", xcup: "\u22C3", UnionPlus: "\u228E", uplus: "\u228E", Uogon: "\u0172", Uopf: "\u{1D54C}", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", udarr: "\u21C5", UpDownArrow: "\u2195", updownarrow: "\u2195", varr: "\u2195", UpEquilibrium: "\u296E", udhar: "\u296E", UpTee: "\u22A5", bot: "\u22A5", bottom: "\u22A5", perp: "\u22A5", UpTeeArrow: "\u21A5", mapstoup: "\u21A5", UpperLeftArrow: "\u2196", nwarr: "\u2196", nwarrow: "\u2196", UpperRightArrow: "\u2197", nearr: "\u2197", nearrow: "\u2197", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", Uring: "\u016E", Uscr: "\u{1D4B0}", Utilde: "\u0168", Uuml: "\xDC", VDash: "\u22AB", Vbar: "\u2AEB", Vcy: "\u0412", Vdash: "\u22A9", Vdashl: "\u2AE6", Vee: "\u22C1", bigvee: "\u22C1", xvee: "\u22C1", Verbar: "\u2016", Vert: "\u2016", VerticalBar: "\u2223", mid: "\u2223", shortmid: "\u2223", smid: "\u2223", VerticalLine: "|", verbar: "|", vert: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", wr: "\u2240", wreath: "\u2240", VeryThinSpace: "\u200A", hairsp: "\u200A", Vfr: "\u{1D519}", Vopf: "\u{1D54D}", Vscr: "\u{1D4B1}", Vvdash: "\u22AA", Wcirc: "\u0174", Wedge: "\u22C0", bigwedge: "\u22C0", xwedge: "\u22C0", Wfr: "\u{1D51A}", Wopf: "\u{1D54E}", Wscr: "\u{1D4B2}", Xfr: "\u{1D51B}", Xi: "\u039E", Xopf: "\u{1D54F}", Xscr: "\u{1D4B3}", YAcy: "\u042F", YIcy: "\u0407", YUcy: "\u042E", Yacute: "\xDD", Ycirc: "\u0176", Ycy: "\u042B", Yfr: "\u{1D51C}", Yopf: "\u{1D550}", Yscr: "\u{1D4B4}", Yuml: "\u0178", ZHcy: "\u0416", Zacute: "\u0179", Zcaron: "\u017D", Zcy: "\u0417", Zdot: "\u017B", Zeta: "\u0396", Zfr: "\u2128", zeetrf: "\u2128", Zopf: "\u2124", integers: "\u2124", Zscr: "\u{1D4B5}", aacute: "\xE1", abreve: "\u0103", ac: "\u223E", mstpos: "\u223E", acE: "\u223E\u0333", acd: "\u223F", acirc: "\xE2", acy: "\u0430", aelig: "\xE6", afr: "\u{1D51E}", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", alpha: "\u03B1", amacr: "\u0101", amalg: "\u2A3F", and: "\u2227", wedge: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", angle: "\u2220", ange: "\u29A4", angmsd: "\u2221", measuredangle: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angzarr: "\u237C", aogon: "\u0105", aopf: "\u{1D552}", apE: "\u2A70", apacir: "\u2A6F", ape: "\u224A", approxeq: "\u224A", apid: "\u224B", apos: "'", aring: "\xE5", ascr: "\u{1D4B6}", ast: "*", midast: "*", atilde: "\xE3", auml: "\xE4", awint: "\u2A11", bNot: "\u2AED", backcong: "\u224C", bcong: "\u224C", backepsilon: "\u03F6", bepsi: "\u03F6", backprime: "\u2035", bprime: "\u2035", backsim: "\u223D", bsim: "\u223D", backsimeq: "\u22CD", bsime: "\u22CD", barvee: "\u22BD", barwed: "\u2305", barwedge: "\u2305", bbrktbrk: "\u23B6", bcy: "\u0431", bdquo: "\u201E", ldquor: "\u201E", bemptyv: "\u29B0", beta: "\u03B2", beth: "\u2136", between: "\u226C", twixt: "\u226C", bfr: "\u{1D51F}", bigcirc: "\u25EF", xcirc: "\u25EF", bigodot: "\u2A00", xodot: "\u2A00", bigoplus: "\u2A01", xoplus: "\u2A01", bigotimes: "\u2A02", xotime: "\u2A02", bigsqcup: "\u2A06", xsqcup: "\u2A06", bigstar: "\u2605", starf: "\u2605", bigtriangledown: "\u25BD", xdtri: "\u25BD", bigtriangleup: "\u25B3", xutri: "\u25B3", biguplus: "\u2A04", xuplus: "\u2A04", bkarow: "\u290D", rbarr: "\u290D", blacklozenge: "\u29EB", lozf: "\u29EB", blacktriangle: "\u25B4", utrif: "\u25B4", blacktriangledown: "\u25BE", dtrif: "\u25BE", blacktriangleleft: "\u25C2", ltrif: "\u25C2", blacktriangleright: "\u25B8", rtrif: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bnot: "\u2310", bopf: "\u{1D553}", bowtie: "\u22C8", boxDL: "\u2557", boxDR: "\u2554", boxDl: "\u2556", boxDr: "\u2553", boxH: "\u2550", boxHD: "\u2566", boxHU: "\u2569", boxHd: "\u2564", boxHu: "\u2567", boxUL: "\u255D", boxUR: "\u255A", boxUl: "\u255C", boxUr: "\u2559", boxV: "\u2551", boxVH: "\u256C", boxVL: "\u2563", boxVR: "\u2560", boxVh: "\u256B", boxVl: "\u2562", boxVr: "\u255F", boxbox: "\u29C9", boxdL: "\u2555", boxdR: "\u2552", boxdl: "\u2510", boxdr: "\u250C", boxhD: "\u2565", boxhU: "\u2568", boxhd: "\u252C", boxhu: "\u2534", boxminus: "\u229F", minusb: "\u229F", boxplus: "\u229E", plusb: "\u229E", boxtimes: "\u22A0", timesb: "\u22A0", boxuL: "\u255B", boxuR: "\u2558", boxul: "\u2518", boxur: "\u2514", boxv: "\u2502", boxvH: "\u256A", boxvL: "\u2561", boxvR: "\u255E", boxvh: "\u253C", boxvl: "\u2524", boxvr: "\u251C", brvbar: "\xA6", bscr: "\u{1D4B7}", bsemi: "\u204F", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bumpE: "\u2AAE", cacute: "\u0107", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", caps: "\u2229\uFE00", caret: "\u2041", ccaps: "\u2A4D", ccaron: "\u010D", ccedil: "\xE7", ccirc: "\u0109", ccups: "\u2A4C", ccupssm: "\u2A50", cdot: "\u010B", cemptyv: "\u29B2", cent: "\xA2", cfr: "\u{1D520}", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", chi: "\u03C7", cir: "\u25CB", cirE: "\u29C3", circ: "\u02C6", circeq: "\u2257", cire: "\u2257", circlearrowleft: "\u21BA", olarr: "\u21BA", circlearrowright: "\u21BB", orarr: "\u21BB", circledS: "\u24C8", oS: "\u24C8", circledast: "\u229B", oast: "\u229B", circledcirc: "\u229A", ocir: "\u229A", circleddash: "\u229D", odash: "\u229D", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", clubs: "\u2663", clubsuit: "\u2663", colon: ":", comma: ",", commat: "@", comp: "\u2201", complement: "\u2201", congdot: "\u2A6D", copf: "\u{1D554}", copysr: "\u2117", crarr: "\u21B5", cross: "\u2717", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", curlyeqprec: "\u22DE", cuesc: "\u22DF", curlyeqsucc: "\u22DF", cularr: "\u21B6", curvearrowleft: "\u21B6", cularrp: "\u293D", cup: "\u222A", cupbrcap: "\u2A48", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curvearrowright: "\u21B7", curarrm: "\u293C", curlyvee: "\u22CE", cuvee: "\u22CE", curlywedge: "\u22CF", cuwed: "\u22CF", curren: "\xA4", cwint: "\u2231", cylcty: "\u232D", dHar: "\u2965", dagger: "\u2020", daleth: "\u2138", dash: "\u2010", hyphen: "\u2010", dbkarow: "\u290F", rBarr: "\u290F", dcaron: "\u010F", dcy: "\u0434", ddarr: "\u21CA", downdownarrows: "\u21CA", ddotseq: "\u2A77", eDDot: "\u2A77", deg: "\xB0", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", dfr: "\u{1D521}", diamondsuit: "\u2666", diams: "\u2666", digamma: "\u03DD", gammad: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", djcy: "\u0452", dlcorn: "\u231E", llcorner: "\u231E", dlcrop: "\u230D", dollar: "$", dopf: "\u{1D555}", doteqdot: "\u2251", eDot: "\u2251", dotminus: "\u2238", minusd: "\u2238", dotplus: "\u2214", plusdo: "\u2214", dotsquare: "\u22A1", sdotb: "\u22A1", drcorn: "\u231F", lrcorner: "\u231F", drcrop: "\u230C", dscr: "\u{1D4B9}", dscy: "\u0455", dsol: "\u29F6", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", triangledown: "\u25BF", dwangle: "\u29A6", dzcy: "\u045F", dzigrarr: "\u27FF", eacute: "\xE9", easter: "\u2A6E", ecaron: "\u011B", ecir: "\u2256", eqcirc: "\u2256", ecirc: "\xEA", ecolon: "\u2255", eqcolon: "\u2255", ecy: "\u044D", edot: "\u0117", efDot: "\u2252", fallingdotseq: "\u2252", efr: "\u{1D522}", eg: "\u2A9A", egrave: "\xE8", egs: "\u2A96", eqslantgtr: "\u2A96", egsdot: "\u2A98", el: "\u2A99", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", eqslantless: "\u2A95", elsdot: "\u2A97", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", emptyv: "\u2205", varnothing: "\u2205", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", eng: "\u014B", ensp: "\u2002", eogon: "\u0119", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", epsilon: "\u03B5", epsiv: "\u03F5", straightepsilon: "\u03F5", varepsilon: "\u03F5", equals: "=", equest: "\u225F", questeq: "\u225F", equivDD: "\u2A78", eqvparsl: "\u29E5", erDot: "\u2253", risingdotseq: "\u2253", erarr: "\u2971", escr: "\u212F", eta: "\u03B7", eth: "\xF0", euml: "\xEB", euro: "\u20AC", excl: "!", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", ffr: "\u{1D523}", filig: "\uFB01", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", fopf: "\u{1D557}", fork: "\u22D4", pitchfork: "\u22D4", forkv: "\u2AD9", fpartint: "\u2A0D", frac12: "\xBD", half: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", sfrown: "\u2322", fscr: "\u{1D4BB}", gEl: "\u2A8C", gtreqqless: "\u2A8C", gacute: "\u01F5", gamma: "\u03B3", gap: "\u2A86", gtrapprox: "\u2A86", gbreve: "\u011F", gcirc: "\u011D", gcy: "\u0433", gdot: "\u0121", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", gfr: "\u{1D524}", gimel: "\u2137", gjcy: "\u0453", glE: "\u2A92", gla: "\u2AA5", glj: "\u2AA4", gnE: "\u2269", gneqq: "\u2269", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gneq: "\u2A88", gnsim: "\u22E7", gopf: "\u{1D558}", gscr: "\u210A", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtrdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrarr: "\u2978", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", hardcy: "\u044A", harrcir: "\u2948", harrw: "\u21AD", leftrightsquigarrow: "\u21AD", hbar: "\u210F", hslash: "\u210F", planck: "\u210F", plankv: "\u210F", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", mldr: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", hksearow: "\u2925", searhk: "\u2925", hkswarow: "\u2926", swarhk: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", larrhk: "\u21A9", hookrightarrow: "\u21AA", rarrhk: "\u21AA", hopf: "\u{1D559}", horbar: "\u2015", hscr: "\u{1D4BD}", hstrok: "\u0127", hybull: "\u2043", iacute: "\xED", icirc: "\xEE", icy: "\u0438", iecy: "\u0435", iexcl: "\xA1", ifr: "\u{1D526}", igrave: "\xEC", iiiint: "\u2A0C", qint: "\u2A0C", iiint: "\u222D", tint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", ijlig: "\u0133", imacr: "\u012B", imath: "\u0131", inodot: "\u0131", imof: "\u22B7", imped: "\u01B5", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", intcal: "\u22BA", intercal: "\u22BA", intlarhk: "\u2A17", intprod: "\u2A3C", iprod: "\u2A3C", iocy: "\u0451", iogon: "\u012F", iopf: "\u{1D55A}", iota: "\u03B9", iquest: "\xBF", iscr: "\u{1D4BE}", isinE: "\u22F9", isindot: "\u22F5", isins: "\u22F4", isinsv: "\u22F3", itilde: "\u0129", iukcy: "\u0456", iuml: "\xEF", jcirc: "\u0135", jcy: "\u0439", jfr: "\u{1D527}", jmath: "\u0237", jopf: "\u{1D55B}", jscr: "\u{1D4BF}", jsercy: "\u0458", jukcy: "\u0454", kappa: "\u03BA", kappav: "\u03F0", varkappa: "\u03F0", kcedil: "\u0137", kcy: "\u043A", kfr: "\u{1D528}", kgreen: "\u0138", khcy: "\u0445", kjcy: "\u045C", kopf: "\u{1D55C}", kscr: "\u{1D4C0}", lAtail: "\u291B", lBarr: "\u290E", lEg: "\u2A8B", lesseqqgtr: "\u2A8B", lHar: "\u2962", lacute: "\u013A", laemptyv: "\u29B4", lambda: "\u03BB", langd: "\u2991", lap: "\u2A85", lessapprox: "\u2A85", laquo: "\xAB", larrbfs: "\u291F", larrfs: "\u291D", larrlp: "\u21AB", looparrowleft: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", leftarrowtail: "\u21A2", lat: "\u2AAB", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lcub: "{", lbrack: "[", lsqb: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", lcaron: "\u013E", lcedil: "\u013C", lcy: "\u043B", ldca: "\u2936", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", leq: "\u2264", leftleftarrows: "\u21C7", llarr: "\u21C7", leftthreetimes: "\u22CB", lthree: "\u22CB", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessdot: "\u22D6", ltdot: "\u22D6", lfisht: "\u297C", lfr: "\u{1D529}", lgE: "\u2A91", lharul: "\u296A", lhblk: "\u2584", ljcy: "\u0459", llhard: "\u296B", lltri: "\u25FA", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnE: "\u2268", lneqq: "\u2268", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lneq: "\u2A87", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", longmapsto: "\u27FC", xmap: "\u27FC", looparrowright: "\u21AC", rarrlp: "\u21AC", lopar: "\u2985", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", loz: "\u25CA", lozenge: "\u25CA", lpar: "(", lparlt: "\u2993", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", lsime: "\u2A8D", lsimg: "\u2A8F", lsquor: "\u201A", sbquo: "\u201A", lstrok: "\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltrPar: "\u2996", ltri: "\u25C3", triangleleft: "\u25C3", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", mDDot: "\u223A", macr: "\xAF", strns: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", marker: "\u25AE", mcomma: "\u2A29", mcy: "\u043C", mdash: "\u2014", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", midcir: "\u2AF0", minus: "\u2212", minusdu: "\u2A2A", mlcp: "\u2ADB", models: "\u22A7", mopf: "\u{1D55E}", mscr: "\u{1D4C2}", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nGg: "\u22D9\u0338", nGt: "\u226B\u20D2", nLeftarrow: "\u21CD", nlArr: "\u21CD", nLeftrightarrow: "\u21CE", nhArr: "\u21CE", nLl: "\u22D8\u0338", nLt: "\u226A\u20D2", nRightarrow: "\u21CF", nrArr: "\u21CF", nVDash: "\u22AF", nVdash: "\u22AE", nacute: "\u0144", nang: "\u2220\u20D2", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", natur: "\u266E", natural: "\u266E", ncap: "\u2A43", ncaron: "\u0148", ncedil: "\u0146", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", ncy: "\u043D", ndash: "\u2013", neArr: "\u21D7", nearhk: "\u2924", nedot: "\u2250\u0338", nesear: "\u2928", toea: "\u2928", nfr: "\u{1D52B}", nharr: "\u21AE", nleftrightarrow: "\u21AE", nhpar: "\u2AF2", nis: "\u22FC", nisd: "\u22FA", njcy: "\u045A", nlE: "\u2266\u0338", nleqq: "\u2266\u0338", nlarr: "\u219A", nleftarrow: "\u219A", nldr: "\u2025", nopf: "\u{1D55F}", not: "\xAC", notinE: "\u22F9\u0338", notindot: "\u22F5\u0338", notinvb: "\u22F7", notinvc: "\u22F6", notnivb: "\u22FE", notnivc: "\u22FD", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", nrarr: "\u219B", nrightarrow: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nscr: "\u{1D4C3}", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsubseteqq: "\u2AC5\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupseteqq: "\u2AC6\u0338", ntilde: "\xF1", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvDash: "\u22AD", nvHarr: "\u2904", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwArr: "\u21D6", nwarhk: "\u2923", nwnear: "\u2927", oacute: "\xF3", ocirc: "\xF4", ocy: "\u043E", odblac: "\u0151", odiv: "\u2A38", odsold: "\u29BC", oelig: "\u0153", ofcir: "\u29BF", ofr: "\u{1D52C}", ogon: "\u02DB", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", olcir: "\u29BE", olcross: "\u29BB", olt: "\u29C0", omacr: "\u014D", omega: "\u03C9", omicron: "\u03BF", omid: "\u29B6", oopf: "\u{1D560}", opar: "\u29B7", operp: "\u29B9", or: "\u2228", vee: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", oscr: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oslash: "\xF8", osol: "\u2298", otilde: "\xF5", otimesas: "\u2A36", ouml: "\xF6", ovbar: "\u233D", para: "\xB6", parsim: "\u2AF3", parsl: "\u2AFD", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", pertenk: "\u2031", pfr: "\u{1D52D}", phi: "\u03C6", phiv: "\u03D5", straightphi: "\u03D5", varphi: "\u03D5", phone: "\u260E", pi: "\u03C0", piv: "\u03D6", varpi: "\u03D6", planckh: "\u210E", plus: "+", plusacir: "\u2A23", pluscir: "\u2A22", plusdu: "\u2A25", pluse: "\u2A72", plussim: "\u2A26", plustwo: "\u2A27", pointint: "\u2A15", popf: "\u{1D561}", pound: "\xA3", prE: "\u2AB3", prap: "\u2AB7", precapprox: "\u2AB7", precnapprox: "\u2AB9", prnap: "\u2AB9", precneqq: "\u2AB5", prnE: "\u2AB5", precnsim: "\u22E8", prnsim: "\u22E8", prime: "\u2032", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prurel: "\u22B0", pscr: "\u{1D4C5}", psi: "\u03C8", puncsp: "\u2008", qfr: "\u{1D52E}", qopf: "\u{1D562}", qprime: "\u2057", qscr: "\u{1D4C6}", quatint: "\u2A16", quest: "?", rAtail: "\u291C", rHar: "\u2964", race: "\u223D\u0331", racute: "\u0155", raemptyv: "\u29B3", rangd: "\u2992", range: "\u29A5", raquo: "\xBB", rarrap: "\u2975", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrpl: "\u2945", rarrsim: "\u2974", rarrtl: "\u21A3", rightarrowtail: "\u21A3", rarrw: "\u219D", rightsquigarrow: "\u219D", ratail: "\u291A", ratio: "\u2236", rbbrk: "\u2773", rbrace: "}", rcub: "}", rbrack: "]", rsqb: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", rcaron: "\u0159", rcedil: "\u0157", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdsh: "\u21B3", rect: "\u25AD", rfisht: "\u297D", rfr: "\u{1D52F}", rharul: "\u296C", rho: "\u03C1", rhov: "\u03F1", varrho: "\u03F1", rightrightarrows: "\u21C9", rrarr: "\u21C9", rightthreetimes: "\u22CC", rthree: "\u22CC", ring: "\u02DA", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", ropar: "\u2986", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rsaquo: "\u203A", rscr: "\u{1D4C7}", rtimes: "\u22CA", rtri: "\u25B9", triangleright: "\u25B9", rtriltri: "\u29CE", ruluhar: "\u2968", rx: "\u211E", sacute: "\u015B", scE: "\u2AB4", scap: "\u2AB8", succapprox: "\u2AB8", scaron: "\u0161", scedil: "\u015F", scirc: "\u015D", scnE: "\u2AB6", succneqq: "\u2AB6", scnap: "\u2ABA", succnapprox: "\u2ABA", scnsim: "\u22E9", succnsim: "\u22E9", scpolint: "\u2A13", scy: "\u0441", sdot: "\u22C5", sdote: "\u2A66", seArr: "\u21D8", sect: "\xA7", semi: ";", seswar: "\u2929", tosa: "\u2929", sext: "\u2736", sfr: "\u{1D530}", sharp: "\u266F", shchcy: "\u0449", shcy: "\u0448", shy: "\xAD", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", varsigma: "\u03C2", simdot: "\u2A6A", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", smashp: "\u2A33", smeparsl: "\u29E4", smile: "\u2323", ssmile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", sqcaps: "\u2293\uFE00", sqcups: "\u2294\uFE00", sscr: "\u{1D4C8}", star: "\u2606", sub: "\u2282", subset: "\u2282", subE: "\u2AC5", subseteqq: "\u2AC5", subdot: "\u2ABD", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subsetneqq: "\u2ACB", subne: "\u228A", subsetneq: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", supE: "\u2AC6", supseteqq: "\u2AC6", supdot: "\u2ABE", supdsub: "\u2AD8", supedot: "\u2AC4", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supsetneqq: "\u2ACC", supne: "\u228B", supsetneq: "\u228B", supplus: "\u2AC0", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swArr: "\u21D9", swnwar: "\u292A", szlig: "\xDF", target: "\u2316", tau: "\u03C4", tcaron: "\u0165", tcedil: "\u0163", tcy: "\u0442", telrec: "\u2315", tfr: "\u{1D531}", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", vartheta: "\u03D1", thorn: "\xFE", times: "\xD7", timesbar: "\u2A31", timesd: "\u2A30", topbot: "\u2336", topcir: "\u2AF1", topf: "\u{1D565}", topfork: "\u2ADA", tprime: "\u2034", triangle: "\u25B5", utri: "\u25B5", triangleq: "\u225C", trie: "\u225C", tridot: "\u25EC", triminus: "\u2A3A", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", tscr: "\u{1D4C9}", tscy: "\u0446", tshcy: "\u045B", tstrok: "\u0167", uHar: "\u2963", uacute: "\xFA", ubrcy: "\u045E", ubreve: "\u016D", ucirc: "\xFB", ucy: "\u0443", udblac: "\u0171", ufisht: "\u297E", ufr: "\u{1D532}", ugrave: "\xF9", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", umacr: "\u016B", uogon: "\u0173", uopf: "\u{1D566}", upsi: "\u03C5", upsilon: "\u03C5", upuparrows: "\u21C8", uuarr: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", uring: "\u016F", urtri: "\u25F9", uscr: "\u{1D4CA}", utdot: "\u22F0", utilde: "\u0169", uuml: "\xFC", uwangle: "\u29A7", vBar: "\u2AE8", vBarv: "\u2AE9", vangrt: "\u299C", varsubsetneq: "\u228A\uFE00", vsubne: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", vsubnE: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", vsupne: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vsupnE: "\u2ACC\uFE00", vcy: "\u0432", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", vfr: "\u{1D533}", vopf: "\u{1D567}", vscr: "\u{1D4CB}", vzigzag: "\u299A", wcirc: "\u0175", wedbar: "\u2A5F", wedgeq: "\u2259", weierp: "\u2118", wp: "\u2118", wfr: "\u{1D534}", wopf: "\u{1D568}", wscr: "\u{1D4CC}", xfr: "\u{1D535}", xi: "\u03BE", xnis: "\u22FB", xopf: "\u{1D569}", xscr: "\u{1D4CD}", yacute: "\xFD", yacy: "\u044F", ycirc: "\u0177", ycy: "\u044B", yen: "\xA5", yfr: "\u{1D536}", yicy: "\u0457", yopf: "\u{1D56A}", yscr: "\u{1D4CE}", yucy: "\u044E", yuml: "\xFF", zacute: "\u017A", zcaron: "\u017E", zcy: "\u0437", zdot: "\u017C", zeta: "\u03B6", zfr: "\u{1D537}", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" };
_e4.ngsp = "\uE500";
var za = class {
  constructor(e, t, r) {
    __publicField(this, "tokens");
    __publicField(this, "errors");
    __publicField(this, "nonNormalizedIcuExpressions");
    this.tokens = e, this.errors = t, this.nonNormalizedIcuExpressions = r;
  }
};
function Di2(e, t, r, n = {}) {
  let i = new Qa(new rt2(e, t), r, n);
  return i.tokenize(), new za(no2(i.tokens), i.errors, i.nonNormalizedIcuExpressions);
}
var Ga = /\r\n?/g;
function Se2(e) {
  return `Unexpected character "${e === 0 ? "EOF" : String.fromCharCode(e)}"`;
}
function xi2(e) {
  return `Unknown entity "${e}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
function $a(e, t) {
  return `Unable to parse entity "${t}" - ${e} character reference entities must end with ";"`;
}
var ja = ["@if", "@else", "@for", "@switch", "@case", "@default", "@empty", "@defer", "@placeholder", "@loading", "@boundary", "@error", "@content"];
var it2 = { start: "{{", end: "}}" };
var Ya = /^default[^\S\r\n]+never/;
var Ka = /^else[^\S\r\n]+if/;
var Qa = class {
  constructor(e, t, r) {
    __publicField(this, "_getTagContentType");
    __publicField(this, "_cursor");
    __publicField(this, "_tokenizeIcu");
    __publicField(this, "_leadingTriviaCodePoints");
    __publicField(this, "_canSelfClose");
    __publicField(this, "_allowHtmComponentClosingTags");
    __publicField(this, "_allowStartTagComments");
    __publicField(this, "_currentTokenStart", null);
    __publicField(this, "_currentTokenType", null);
    __publicField(this, "_expansionCaseStack", []);
    __publicField(this, "_openDirectiveCount", 0);
    __publicField(this, "_inInterpolation", false);
    __publicField(this, "_preserveLineEndings");
    __publicField(this, "_i18nNormalizeLineEndingsInICUs");
    __publicField(this, "_fullNameStack", []);
    __publicField(this, "_tokenizeBlocks");
    __publicField(this, "_tokenizeLet");
    __publicField(this, "_selectorlessEnabled");
    __publicField(this, "tokens", []);
    __publicField(this, "errors", []);
    __publicField(this, "nonNormalizedIcuExpressions", []);
    this._getTagContentType = t, this._tokenizeIcu = r.tokenizeExpansionForms || false, this._leadingTriviaCodePoints = r.leadingTriviaChars && r.leadingTriviaChars.map((i) => i.codePointAt(0) || 0), this._canSelfClose = r.canSelfClose || false, this._allowHtmComponentClosingTags = r.allowHtmComponentClosingTags || false, this._allowStartTagComments = r.allowStartTagComments ?? true;
    let n = r.range || { endPos: e.content.length, startPos: 0, startLine: 0, startCol: 0 };
    this._cursor = r.escapedString ? new io2(e, n) : new Ii2(e, n), this._preserveLineEndings = r.preserveLineEndings || false, this._i18nNormalizeLineEndingsInICUs = r.i18nNormalizeLineEndingsInICUs || false, this._tokenizeBlocks = r.tokenizeBlocks ?? true, this._tokenizeLet = r.tokenizeLet ?? true, this._selectorlessEnabled = r.selectorlessEnabled ?? false;
    try {
      this._cursor.init();
    } catch (i) {
      this.handleError(i);
    }
  }
  _processCarriageReturns(e) {
    return this._preserveLineEndings ? e : e.replace(Ga, `
`);
  }
  tokenize() {
    for (; this._cursor.peek() !== 0; ) {
      let e = this._cursor.clone();
      try {
        if (this._attemptCharCode(60)) if (this._attemptCharCode(33)) this._attemptStr("[CDATA[") ? this._consumeCdata(e) : this._attemptStr("--") ? this._consumeComment(e) : this._attemptStrCaseInsensitive("doctype") ? this._consumeDocType(e) : this._consumeBogusComment(e);
        else if (this._attemptCharCode(47)) this._consumeTagClose(e);
        else {
          let t = this._cursor.clone();
          this._attemptCharCode(63) ? (this._cursor = t, this._consumeBogusComment(e)) : this._consumeTagOpen(e);
        }
        else this._tokenizeLet && this._cursor.peek() === 64 && !this._inInterpolation && this._isLetStart() ? this._consumeLetDeclaration(e) : this._tokenizeBlocks && this._isBlockStart() ? this._consumeBlockStart(e) : this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansionCase() && !this._isInExpansionForm() && this._attemptCharCode(125) ? this._consumeBlockEnd(e) : this._tokenizeIcu && this._tokenizeExpansionForm() || this._consumeWithInterpolation(5, 8, () => this._isTextEnd(), () => this._isTagStart());
      } catch (t) {
        this.handleError(t);
      }
    }
    this._beginToken(44), this._endToken([]);
  }
  _getBlockName() {
    let e = false, t = this._cursor.clone();
    this._attemptCharCodeUntilFn((n) => nt2(n) ? !e : ro2(n) ? (e = true, false) : true);
    let r = this._cursor.getChars(t).trim();
    return Ka.test(r) ? r = "else if" : Ya.test(r) && (r = "default never"), r;
  }
  _consumeBlockStart(e) {
    this._requireCharCode(64), this._beginToken(26, e);
    let t = this._endToken([this._getBlockName()]);
    if (this._cursor.peek() === 40) if (this._cursor.advance(), this._consumeBlockParameters(), this._attemptCharCodeUntilFn(b2), this._attemptCharCode(41)) this._attemptCharCodeUntilFn(b2);
    else {
      t.type = 30;
      return;
    }
    if (t.parts[0] === "default never" && this._attemptCharCode(59)) {
      this._beginToken(27), this._endToken([]), this._beginToken(28), this._endToken([]);
      return;
    }
    this._attemptCharCode(123) ? (this._beginToken(27), this._endToken([])) : this._isBlockStart() && (t.parts[0] === "case" || t.parts[0] === "default") ? (this._beginToken(27), this._endToken([]), this._beginToken(28), this._endToken([])) : t.type = 30;
  }
  _consumeBlockEnd(e) {
    this._beginToken(28, e), this._endToken([]);
  }
  _consumeBlockParameters() {
    for (this._attemptCharCodeUntilFn(Ai2); this._cursor.peek() !== 41 && this._cursor.peek() !== 0; ) {
      this._beginToken(29);
      let e = this._cursor.clone(), t = null, r = 0;
      for (; this._cursor.peek() !== 59 && this._cursor.peek() !== 0 || t !== null; ) {
        let n = this._cursor.peek();
        if (n === 92) this._cursor.advance();
        else if (n === t) t = null;
        else if (t === null && Rt2(n)) t = n;
        else if (n === 40 && t === null) r++;
        else if (n === 41 && t === null) {
          if (r === 0) break;
          r > 0 && r--;
        }
        this._cursor.advance();
      }
      this._endToken([this._cursor.getChars(e)]), this._attemptCharCodeUntilFn(Ai2);
    }
  }
  _consumeLetDeclaration(e) {
    if (this._requireStr("@let"), this._beginToken(31, e), nt2(this._cursor.peek())) this._attemptCharCodeUntilFn(b2);
    else {
      let r = this._endToken([this._cursor.getChars(e)]);
      r.type = 34;
      return;
    }
    let t = this._endToken([this._getLetDeclarationName()]);
    if (this._attemptCharCodeUntilFn(b2), !this._attemptCharCode(61)) {
      t.type = 34;
      return;
    }
    this._attemptCharCodeUntilFn((r) => b2(r) && !Oe2(r)), this._consumeLetDeclarationValue(), this._cursor.peek() === 59 ? (this._beginToken(33), this._cursor.advance(), this._endToken([])) : (t.type = 34, t.sourceSpan = this._cursor.getSpan(e));
  }
  _getLetDeclarationName() {
    let e = this._cursor.clone(), t = false;
    return this._attemptCharCodeUntilFn((r) => Re2(r) || r === 36 || r === 95 || t && Ie2(r) ? (t = true, false) : true), this._cursor.getChars(e).trim();
  }
  _consumeLetDeclarationValue() {
    let e = this._cursor.clone();
    this._beginToken(32, e), this._attemptUntilIgnoreQuotes((t) => t === 59), this._endToken([this._cursor.getChars(e)]);
  }
  _tokenizeExpansionForm() {
    if (this.isExpansionFormStart()) return this._consumeExpansionFormStart(), true;
    if (eo2(this._cursor.peek()) && this._isInExpansionForm()) return this._consumeExpansionCaseStart(), true;
    if (this._cursor.peek() === 125) {
      if (this._isInExpansionCase()) return this._consumeExpansionCaseEnd(), true;
      if (this._isInExpansionForm()) return this._consumeExpansionFormEnd(), true;
    }
    return false;
  }
  _beginToken(e, t = this._cursor.clone()) {
    this._currentTokenStart = t, this._currentTokenType = e;
  }
  _endToken(e, t) {
    if (this._currentTokenStart === null) throw new re2(this._cursor.getSpan(t), "Programming error - attempted to end a token when there was no start to the token");
    if (this._currentTokenType === null) throw new re2(this._cursor.getSpan(this._currentTokenStart), "Programming error - attempted to end a token which has no token type");
    let r = { type: this._currentTokenType, parts: e, sourceSpan: (t ?? this._cursor).getSpan(this._currentTokenStart, this._leadingTriviaCodePoints) };
    return this.tokens.push(r), this._currentTokenStart = null, this._currentTokenType = null, r;
  }
  _createError(e, t) {
    this._isInExpansionForm() && (e += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`);
    let r = new re2(t, e);
    return this._currentTokenStart = null, this._currentTokenType = null, r;
  }
  handleError(e) {
    if (e instanceof Cr2 && (e = this._createError(e.msg, this._cursor.getSpan(e.cursor))), e instanceof re2) this.errors.push(e);
    else throw e;
  }
  _attemptCharCode(e) {
    return this._cursor.peek() === e ? (this._cursor.advance(), true) : false;
  }
  _attemptCharCodeCaseInsensitive(e) {
    return to2(this._cursor.peek(), e) ? (this._cursor.advance(), true) : false;
  }
  _requireCharCode(e) {
    let t = this._cursor.clone();
    if (!this._attemptCharCode(e)) throw this._createError(Se2(this._cursor.peek()), this._cursor.getSpan(t));
  }
  _attemptStr(e) {
    let t = e.length;
    if (this._cursor.charsLeft() < t) return false;
    let r = this._cursor.clone();
    for (let n = 0; n < t; n++) if (!this._attemptCharCode(e.charCodeAt(n))) return this._cursor = r, false;
    return true;
  }
  _attemptStrCaseInsensitive(e) {
    for (let t = 0; t < e.length; t++) if (!this._attemptCharCodeCaseInsensitive(e.charCodeAt(t))) return false;
    return true;
  }
  _requireStr(e) {
    let t = this._cursor.clone();
    if (!this._attemptStr(e)) throw this._createError(Se2(this._cursor.peek()), this._cursor.getSpan(t));
  }
  _requireStrCaseInsensitive(e) {
    let t = this._cursor.clone();
    if (!this._attemptStrCaseInsensitive(e)) throw this._createError(Se2(this._cursor.peek()), this._cursor.getSpan(t));
  }
  _attemptCharCodeUntilFn(e) {
    for (; !e(this._cursor.peek()); ) this._cursor.advance();
  }
  _requireCharCodeUntilFn(e, t) {
    let r = this._cursor.clone();
    if (this._attemptCharCodeUntilFn(e), this._cursor.diff(r) < t) throw this._createError(Se2(this._cursor.peek()), this._cursor.getSpan(r));
  }
  _attemptUntilChar(e) {
    for (; this._cursor.peek() !== e; ) this._cursor.advance();
  }
  _attemptUntilIgnoreQuotes(e) {
    for (; this._cursor.peek() !== 0; ) {
      let t = this._cursor.peek();
      if (e(t)) break;
      Rt2(t) && (this._cursor.advance(), this._attemptCharCodeUntilFn((r) => r === 92 ? (this._cursor.advance(), false) : r === t)), this._cursor.advance();
    }
  }
  _readChar() {
    let e = String.fromCodePoint(this._cursor.peek());
    return this._cursor.advance(), e;
  }
  _peekStr(e) {
    let t = e.length;
    if (this._cursor.charsLeft() < t) return false;
    let r = this._cursor.clone();
    for (let n = 0; n < t; n++) {
      if (r.peek() !== e.charCodeAt(n)) return false;
      r.advance();
    }
    return true;
  }
  _isBlockStart() {
    return this._cursor.peek() === 64 && ja.some((e) => this._peekStr(e));
  }
  _isLetStart() {
    return this._cursor.peek() === 64 && this._peekStr("@let");
  }
  _consumeEntity(e) {
    this._beginToken(9);
    let t = this._cursor.clone();
    if (this._cursor.advance(), this._attemptCharCode(35)) {
      let r = this._attemptCharCode(120) || this._attemptCharCode(88), n = this._cursor.clone();
      if (this._attemptCharCodeUntilFn(Ja), this._cursor.peek() != 59) {
        this._cursor.advance();
        let s = r ? "hexadecimal" : "decimal";
        throw this._createError($a(s, this._cursor.getChars(t)), this._cursor.getSpan());
      }
      let i = this._cursor.getChars(n);
      this._cursor.advance();
      try {
        let s = parseInt(i, r ? 16 : 10);
        this._endToken([String.fromCodePoint(s), this._cursor.getChars(t)]);
      } catch {
        throw this._createError(xi2(this._cursor.getChars(t)), this._cursor.getSpan());
      }
    } else {
      let r = this._cursor.clone();
      if (this._attemptCharCodeUntilFn(Za), this._cursor.peek() != 59) this._beginToken(e, t), this._cursor = r, this._endToken(["&"]);
      else {
        let n = this._cursor.getChars(r);
        this._cursor.advance();
        let i = Y2(_e4, n) && _e4[n];
        if (!i) throw this._createError(xi2(n), this._cursor.getSpan(t));
        this._endToken([i, `&${n};`]);
      }
    }
  }
  _consumeRawText(e, t) {
    this._beginToken(e ? 6 : 7);
    let r = [];
    for (; ; ) {
      let n = this._cursor.clone(), i = t();
      if (this._cursor = n, i) break;
      e && this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(r.join(""))]), r.length = 0, this._consumeEntity(6), this._beginToken(6)) : r.push(this._readChar());
    }
    this._endToken([this._processCarriageReturns(r.join(""))]);
  }
  _consumeComment(e) {
    this._beginToken(10, e), this._endToken([]), this._consumeRawText(false, () => this._attemptStr("-->")), this._beginToken(11), this._requireStr("-->"), this._endToken([]);
  }
  _consumeBogusComment(e) {
    this._beginToken(10, e), this._endToken([]), this._consumeRawText(false, () => this._cursor.peek() === 62), this._beginToken(11), this._cursor.advance(), this._endToken([]);
  }
  _consumeCdata(e) {
    this._beginToken(13, e), this._endToken([]), this._consumeRawText(false, () => this._attemptStr("]]>")), this._beginToken(14), this._requireStr("]]>"), this._endToken([]);
  }
  _consumeDocType(e) {
    this._beginToken(19, e), this._endToken([]), this._consumeRawText(false, () => this._cursor.peek() === 62), this._beginToken(20), this._cursor.advance(), this._endToken([]);
  }
  _consumeProcessingInstruction(e) {
    this._beginToken(43, e);
    let t = this._cursor.clone();
    this._attemptUntilIgnoreQuotes((i) => i === 63 || i === 62);
    let r = this._cursor.peek(), n = this._cursor.getChars(t);
    this._cursor.advance(), r === 63 && this._requireCharCode(62), this._endToken([n]);
  }
  _consumePrefixAndName(e) {
    let t = this._cursor.clone(), r = "";
    for (; this._cursor.peek() !== 58 && !Xa(this._cursor.peek()); ) this._cursor.advance();
    let n;
    this._cursor.peek() === 58 ? (r = this._cursor.getChars(t), this._cursor.advance(), n = this._cursor.clone()) : n = t, this._requireCharCodeUntilFn(e, r === "" ? 0 : 1);
    let i = this._cursor.getChars(n);
    return [r, i];
  }
  _consumeSingleLineComment(e) {
    let t = this._cursor.clone();
    this._attemptCharCodeUntilFn((i) => Oe2(i) || i === 0);
    let r = this._cursor.clone(), n = r.getChars(t);
    this._beginToken(12, e), this._endToken([n, "single"], r), this._attemptCharCodeUntilFn(b2);
  }
  _consumeMultiLineComment(e) {
    let t = this._cursor.clone();
    this._attemptCharCodeUntilFn((s) => {
      if (s === 0) return true;
      if (s === 42) {
        let a = this._cursor.clone();
        return a.advance(), a.peek() === 47;
      }
      return false;
    });
    let r = this._cursor.clone(), n = r.getChars(t), i = r;
    this._attemptStr("*/") && (i = this._cursor.clone(), this._attemptCharCodeUntilFn(b2)), this._beginToken(12, e), this._endToken([n, "multi"], i);
  }
  _consumeTagOpen(e) {
    let t, r, n, i, s = [];
    try {
      if (this._selectorlessEnabled && Ot2(this._cursor.peek())) i = this._consumeComponentOpenStart(e), [n, r, t] = i.parts, r && (n += `:${r}`), t && (n += `:${t}`), this._attemptCharCodeUntilFn(b2);
      else {
        if (!Re2(this._cursor.peek())) throw this._createError(Se2(this._cursor.peek()), this._cursor.getSpan(e));
        i = this._consumeTagOpenStart(e), r = i.parts[0], t = n = i.parts[1], this._attemptCharCodeUntilFn(b2);
      }
      for (; ; ) {
        if (this._allowStartTagComments) {
          let o = this._cursor.clone();
          if (this._attemptStr("//")) {
            this._consumeSingleLineComment(o);
            continue;
          }
          if (this._attemptStr("/*")) {
            this._consumeMultiLineComment(o);
            continue;
          }
        }
        if (Ni2(this._cursor.peek())) break;
        if (this._selectorlessEnabled && this._cursor.peek() === 64) {
          let o = this._cursor.clone(), l = o.clone();
          l.advance(), Ot2(l.peek()) && this._consumeDirective(o, l);
        } else {
          let o = this._consumeAttribute();
          s.push(o);
        }
      }
      i.type === 35 ? this._consumeComponentOpenEnd() : this._consumeTagOpenEnd();
    } catch (o) {
      if (o instanceof re2) {
        i ? i.type = i.type === 35 ? 39 : 4 : (this._beginToken(5, e), this._endToken(["<"]));
        return;
      }
      throw o;
    }
    if (this._canSelfClose && this.tokens[this.tokens.length - 1].type === 2) return;
    let a = this._getTagContentType(t, r, this._fullNameStack.length > 0, s);
    this._handleFullNameStackForTagOpen(r, t), a === 0 ? this._consumeRawTextWithTagClose(r, i, n, false) : a === 1 && this._consumeRawTextWithTagClose(r, i, n, true);
  }
  _consumeRawTextWithTagClose(e, t, r, n) {
    this._consumeRawText(n, () => !this._attemptCharCode(60) || !this._attemptCharCode(47) || (this._attemptCharCodeUntilFn(b2), !this._attemptStrCaseInsensitive(e && t.type !== 35 ? `${e}:${r}` : r)) ? false : (this._attemptCharCodeUntilFn(b2), this._attemptCharCode(62))), this._beginToken(t.type === 35 ? 38 : 3), this._requireCharCodeUntilFn((i) => i === 62, 3), this._cursor.advance(), this._endToken(t.parts), this._handleFullNameStackForTagClose(e, r);
  }
  _consumeTagOpenStart(e) {
    this._beginToken(0, e);
    let t = this._consumePrefixAndName(ve2);
    return this._endToken(t);
  }
  _consumeComponentOpenStart(e) {
    this._beginToken(35, e);
    let t = this._consumeComponentName();
    return this._endToken(t);
  }
  _consumeComponentName() {
    let e = this._cursor.clone();
    for (; Pi2(this._cursor.peek()); ) this._cursor.advance();
    let t = this._cursor.getChars(e), r = "", n = "";
    return this._cursor.peek() === 58 && (this._cursor.advance(), [r, n] = this._consumePrefixAndName(ve2)), [t, r, n];
  }
  _consumeAttribute() {
    let [e, t] = this._consumeAttributeName(), r;
    return this._attemptCharCodeUntilFn(b2), this._attemptCharCode(61) && (this._attemptCharCodeUntilFn(b2), r = this._consumeAttributeValue()), this._attemptCharCodeUntilFn(b2), { prefix: e, name: t, value: r };
  }
  _consumeAttributeName() {
    let e = this._cursor.peek();
    if (e === 39 || e === 34) throw this._createError(Se2(e), this._cursor.getSpan());
    this._beginToken(15);
    let t;
    if (this._openDirectiveCount > 0) {
      let n = 0;
      t = (i) => {
        if (this._openDirectiveCount > 0) {
          if (i === 40) n++;
          else if (i === 41) {
            if (n === 0) return true;
            n--;
          }
        }
        return ve2(i);
      };
    } else if (e === 91) {
      let n = 0;
      t = (i) => (i === 91 ? n++ : i === 93 && n--, n <= 0 ? ve2(i) : Oe2(i));
    } else t = ve2;
    let r = this._consumePrefixAndName(t);
    return this._endToken(r), r;
  }
  _consumeAttributeValue() {
    let e;
    if (this._cursor.peek() === 39 || this._cursor.peek() === 34) {
      let t = this._cursor.peek();
      this._consumeQuote(t);
      let r = () => this._cursor.peek() === t;
      e = this._consumeWithInterpolation(17, 18, r, r), this._consumeQuote(t);
    } else {
      let t = () => ve2(this._cursor.peek());
      e = this._consumeWithInterpolation(17, 18, t, t);
    }
    return e;
  }
  _consumeQuote(e) {
    this._beginToken(16), this._requireCharCode(e), this._endToken([String.fromCodePoint(e)]);
  }
  _consumeTagOpenEnd() {
    let e = this._attemptCharCode(47) ? 2 : 1;
    this._beginToken(e), this._requireCharCode(62), this._endToken([]);
  }
  _consumeComponentOpenEnd() {
    let e = this._attemptCharCode(47) ? 37 : 36;
    this._beginToken(e), this._requireCharCode(62), this._endToken([]);
  }
  _consumeTagClose(e) {
    if (this._selectorlessEnabled) {
      let t = e.clone();
      for (; t.peek() !== 62 && !Ot2(t.peek()); ) t.advance();
      if (Ot2(t.peek())) {
        this._beginToken(38, e);
        let r = this._consumeComponentName();
        this._attemptCharCodeUntilFn(b2), this._requireCharCode(62), this._endToken(r);
        return;
      }
    }
    if (this._beginToken(3, e), this._attemptCharCodeUntilFn(b2), this._allowHtmComponentClosingTags && this._attemptCharCode(47)) this._attemptCharCodeUntilFn(b2), this._requireCharCode(62), this._endToken([]);
    else {
      let [t, r] = this._consumePrefixAndName(ve2);
      this._attemptCharCodeUntilFn(b2), this._requireCharCode(62), this._endToken([t, r]), this._handleFullNameStackForTagClose(t, r);
    }
  }
  _consumeExpansionFormStart() {
    this._beginToken(21), this._requireCharCode(123), this._endToken([]), this._expansionCaseStack.push(21), this._beginToken(7);
    let e = this._readUntil(44), t = this._processCarriageReturns(e);
    if (this._i18nNormalizeLineEndingsInICUs) this._endToken([t]);
    else {
      let n = this._endToken([e]);
      t !== e && this.nonNormalizedIcuExpressions.push(n);
    }
    this._requireCharCode(44), this._attemptCharCodeUntilFn(b2), this._beginToken(7);
    let r = this._readUntil(44);
    this._endToken([r]), this._requireCharCode(44), this._attemptCharCodeUntilFn(b2);
  }
  _consumeExpansionCaseStart() {
    this._beginToken(22);
    let e = this._readUntil(123).trim();
    this._endToken([e]), this._attemptCharCodeUntilFn(b2), this._beginToken(23), this._requireCharCode(123), this._endToken([]), this._attemptCharCodeUntilFn(b2), this._expansionCaseStack.push(23);
  }
  _consumeExpansionCaseEnd() {
    this._beginToken(24), this._requireCharCode(125), this._endToken([]), this._attemptCharCodeUntilFn(b2), this._expansionCaseStack.pop();
  }
  _consumeExpansionFormEnd() {
    this._beginToken(25), this._requireCharCode(125), this._endToken([]), this._expansionCaseStack.pop();
  }
  _consumeWithInterpolation(e, t, r, n) {
    this._beginToken(e);
    let i = [];
    for (; !r(); ) {
      let a = this._cursor.clone();
      this._attemptStr(it2.start) ? (this._endToken([this._processCarriageReturns(i.join(""))], a), i.length = 0, this._consumeInterpolation(t, a, n), this._beginToken(e)) : this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(i.join(""))]), i.length = 0, this._consumeEntity(e), this._beginToken(e)) : i.push(this._readChar());
    }
    this._inInterpolation = false;
    let s = this._processCarriageReturns(i.join(""));
    return this._endToken([s]), s;
  }
  _consumeInterpolation(e, t, r) {
    let n = [];
    this._beginToken(e, t), n.push(it2.start);
    let i = this._cursor.clone(), s = null, a = false;
    for (; this._cursor.peek() !== 0 && (r === null || !r()); ) {
      let o = this._cursor.clone();
      if (this._isTagStart()) {
        this._cursor = o, n.push(this._getProcessedChars(i, o)), this._endToken(n);
        return;
      }
      if (s === null) if (this._attemptStr(it2.end)) {
        n.push(this._getProcessedChars(i, o)), n.push(it2.end), this._endToken(n);
        return;
      } else this._attemptStr("//") && (a = true);
      let l = this._cursor.peek();
      this._cursor.advance(), l === 92 ? this._cursor.advance() : l === s ? s = null : !a && s === null && Rt2(l) && (s = l);
    }
    n.push(this._getProcessedChars(i, this._cursor)), this._endToken(n);
  }
  _consumeDirective(e, t) {
    for (this._requireCharCode(64), this._cursor.advance(); Pi2(this._cursor.peek()); ) this._cursor.advance();
    this._beginToken(40, e);
    let r = this._cursor.getChars(t);
    if (this._endToken([r]), this._attemptCharCodeUntilFn(b2), this._cursor.peek() === 40) {
      for (this._openDirectiveCount++, this._beginToken(41), this._cursor.advance(), this._endToken([]), this._attemptCharCodeUntilFn(b2); !Ni2(this._cursor.peek()) && this._cursor.peek() !== 41; ) this._consumeAttribute();
      if (this._attemptCharCodeUntilFn(b2), this._openDirectiveCount--, this._cursor.peek() !== 41) {
        if (this._cursor.peek() === 62 || this._cursor.peek() === 47) return;
        throw this._createError(Se2(this._cursor.peek()), this._cursor.getSpan(e));
      }
      this._beginToken(42), this._cursor.advance(), this._endToken([]), this._attemptCharCodeUntilFn(b2);
    }
  }
  _getProcessedChars(e, t) {
    return this._processCarriageReturns(t.getChars(e));
  }
  _isTextEnd() {
    return !!(this._isTagStart() || this._cursor.peek() === 0 || this._tokenizeIcu && !this._inInterpolation && (this.isExpansionFormStart() || this._cursor.peek() === 125 && this._isInExpansionCase()) || this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansion() && (this._isBlockStart() || this._isLetStart() || this._cursor.peek() === 125));
  }
  _isTagStart() {
    if (this._cursor.peek() === 60) {
      let e = this._cursor.clone();
      e.advance();
      let t = e.peek();
      if (97 <= t && t <= 122 || 65 <= t && t <= 90 || t === 47 || t === 33 || t === 63) return true;
    }
    return false;
  }
  _readUntil(e) {
    let t = this._cursor.clone();
    return this._attemptUntilChar(e), this._cursor.getChars(t);
  }
  _isInExpansion() {
    return this._isInExpansionCase() || this._isInExpansionForm();
  }
  _isInExpansionCase() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 23;
  }
  _isInExpansionForm() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 21;
  }
  isExpansionFormStart() {
    if (this._cursor.peek() !== 123) return false;
    let e = this._cursor.clone(), t = this._attemptStr(it2.start);
    return this._cursor = e, !t;
  }
  _handleFullNameStackForTagOpen(e, t) {
    let r = fe2(e, t);
    (this._fullNameStack.length === 0 || this._fullNameStack[this._fullNameStack.length - 1] === r) && this._fullNameStack.push(r);
  }
  _handleFullNameStackForTagClose(e, t) {
    let r = fe2(e, t);
    this._fullNameStack.length !== 0 && this._fullNameStack[this._fullNameStack.length - 1] === r && this._fullNameStack.pop();
  }
};
function b2(e) {
  return !nt2(e) || e === 0;
}
function ve2(e) {
  return nt2(e) || e === 62 || e === 60 || e === 47 || e === 39 || e === 34 || e === 61 || e === 0;
}
function Xa(e) {
  return (e < 97 || 122 < e) && (e < 65 || 90 < e) && (e < 48 || e > 57);
}
function Ja(e) {
  return e === 59 || e === 0 || !Ei2(e);
}
function Za(e) {
  return e === 59 || e === 0 || !(Re2(e) || Ie2(e));
}
function eo2(e) {
  return e !== 125;
}
function to2(e, t) {
  return Li2(e) === Li2(t);
}
function Li2(e) {
  return e >= 97 && e <= 122 ? e - 97 + 65 : e;
}
function ro2(e) {
  return Re2(e) || Ie2(e) || e === 95;
}
function Ai2(e) {
  return e !== 59 && b2(e);
}
function Ot2(e) {
  return e === 95 || e >= 65 && e <= 90;
}
function Pi2(e) {
  return Re2(e) || Ie2(e) || e === 95;
}
function Ni2(e) {
  return e === 47 || e === 62 || e === 60 || e === 0;
}
function no2(e) {
  let t = [], r;
  for (let n = 0; n < e.length; n++) {
    let i = e[n];
    r && r.type === 5 && i.type === 5 || r && r.type === 17 && i.type === 17 ? (r.parts[0] += i.parts[0], r.sourceSpan.end = i.sourceSpan.end) : (r = i, t.push(r));
  }
  return t;
}
var Ii2 = class Sr2 {
  constructor(t, r) {
    __publicField(this, "state");
    __publicField(this, "file");
    __publicField(this, "input");
    __publicField(this, "end");
    if (t instanceof Sr2) {
      this.file = t.file, this.input = t.input, this.end = t.end;
      let n = t.state;
      this.state = { peek: n.peek, offset: n.offset, line: n.line, column: n.column };
    } else {
      if (!r) throw new Error("Programming error: the range argument must be provided with a file argument.");
      this.file = t, this.input = t.content, this.end = r.endPos, this.state = { peek: -1, offset: r.startPos, line: r.startLine, column: r.startCol };
    }
  }
  clone() {
    return new Sr2(this);
  }
  peek() {
    return this.state.peek;
  }
  charsLeft() {
    return this.end - this.state.offset;
  }
  diff(t) {
    return this.state.offset - t.state.offset;
  }
  advance() {
    this.advanceState(this.state);
  }
  init() {
    this.updatePeek(this.state);
  }
  getSpan(t, r) {
    t = t || this;
    let n = t;
    if (r) for (; this.diff(t) > 0 && r.indexOf(t.peek()) !== -1; ) n === t && (t = t.clone()), t.advance();
    let i = this.locationFromCursor(t), s = this.locationFromCursor(this), a = n !== t ? this.locationFromCursor(n) : i;
    return new p(i, s, a);
  }
  getChars(t) {
    return this.input.substring(t.state.offset, this.state.offset);
  }
  charAt(t) {
    return this.input.charCodeAt(t);
  }
  advanceState(t) {
    if (t.offset >= this.end) throw this.state = t, new Cr2('Unexpected character "EOF"', this);
    let r = this.charAt(t.offset);
    r === 10 ? (t.line++, t.column = 0) : Oe2(r) || t.column++, t.offset++, this.updatePeek(t);
  }
  updatePeek(t) {
    t.peek = t.offset >= this.end ? 0 : this.charAt(t.offset);
  }
  locationFromCursor(t) {
    return new De2(t.file, t.state.offset, t.state.line, t.state.column);
  }
};
var io2 = class vr2 extends Ii2 {
  constructor(t, r) {
    var __super = (...args) => {
      super(...args);
      __publicField(this, "internalState");
      return this;
    };
    t instanceof vr2 ? (__super(t), this.internalState = { ...t.internalState }) : (__super(t, r), this.internalState = this.state);
  }
  advance() {
    this.state = this.internalState, super.advance(), this.processEscapeSequence();
  }
  init() {
    super.init(), this.processEscapeSequence();
  }
  clone() {
    return new vr2(this);
  }
  getChars(t) {
    let r = t.clone(), n = "";
    for (; r.internalState.offset < this.internalState.offset; ) n += String.fromCodePoint(r.peek()), r.advance();
    return n;
  }
  processEscapeSequence() {
    let t = () => this.internalState.peek;
    if (t() === 92) if (this.internalState = { ...this.state }, this.advanceState(this.internalState), t() === 110) this.state.peek = 10;
    else if (t() === 114) this.state.peek = 13;
    else if (t() === 118) this.state.peek = 11;
    else if (t() === 116) this.state.peek = 9;
    else if (t() === 98) this.state.peek = 8;
    else if (t() === 102) this.state.peek = 12;
    else if (t() === 117) if (this.advanceState(this.internalState), t() === 123) {
      this.advanceState(this.internalState);
      let r = this.clone(), n = 0;
      for (; t() !== 125; ) this.advanceState(this.internalState), n++;
      this.state.peek = this.decodeHexDigits(r, n);
    } else {
      let r = this.clone();
      this.advanceState(this.internalState), this.advanceState(this.internalState), this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r, 4);
    }
    else if (t() === 120) {
      this.advanceState(this.internalState);
      let r = this.clone();
      this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r, 2);
    } else if (_r3(t())) {
      let r = "", n = 0, i = this.clone();
      for (; _r3(t()) && n < 3; ) i = this.clone(), r += String.fromCodePoint(t()), this.advanceState(this.internalState), n++;
      this.state.peek = parseInt(r, 8), this.internalState = i.internalState;
    } else Oe2(this.internalState.peek) ? (this.advanceState(this.internalState), this.state = this.internalState) : this.state.peek = this.internalState.peek;
  }
  decodeHexDigits(t, r) {
    let n = this.input.slice(t.internalState.offset, t.internalState.offset + r), i = parseInt(n, 16);
    if (isNaN(i)) throw t.state = t.internalState, new Cr2("Invalid hexadecimal escape sequence", t);
    return i;
  }
};
var Cr2 = class extends Error {
  constructor(e, t) {
    super(e);
    __publicField(this, "msg");
    __publicField(this, "cursor");
    this.msg = e, this.cursor = t, Object.setPrototypeOf(this, new.target.prototype);
  }
};
var x2 = class Mi2 extends re2 {
  constructor(t, r, n) {
    super(r, n);
    __publicField(this, "elementName");
    this.elementName = t;
  }
  static create(t, r, n) {
    return new Mi2(t, r, n);
  }
};
var so2 = class {
  constructor(e, t) {
    __publicField(this, "rootNodes");
    __publicField(this, "errors");
    this.rootNodes = e, this.errors = t;
  }
};
var Bi2 = class {
  constructor(e) {
    __publicField(this, "getTagDefinition");
    this.getTagDefinition = e;
  }
  parse(e, t, r, n = false, i) {
    let s = (h) => (f, ...g2) => h(f.toLowerCase(), ...g2), a = n ? this.getTagDefinition : s(this.getTagDefinition), o = (h) => a(h).getContentType(), l = n ? i : s(i), c = Di2(e, t, i ? (h, f, g2, v2) => {
      let W2 = l(h, f, g2, v2);
      return W2 !== void 0 ? W2 : o(h);
    } : o, r), u = r && r.canSelfClose || false, d = r && r.allowHtmComponentClosingTags || false, _ = new ao2(c.tokens, a, u, d, n);
    return _.build(), new so2(_.rootNodes, [...c.errors, ..._.errors]);
  }
};
var ao2 = class qi {
  constructor(t, r, n, i, s) {
    __publicField(this, "tokens");
    __publicField(this, "tagDefinitionResolver");
    __publicField(this, "canSelfClose");
    __publicField(this, "allowHtmComponentClosingTags");
    __publicField(this, "isTagNameCaseSensitive");
    __publicField(this, "_index", -1);
    __publicField(this, "_peek");
    __publicField(this, "_containerStack", []);
    __publicField(this, "rootNodes", []);
    __publicField(this, "errors", []);
    this.tokens = t, this.tagDefinitionResolver = r, this.canSelfClose = n, this.allowHtmComponentClosingTags = i, this.isTagNameCaseSensitive = s, this._advance();
  }
  build() {
    for (; this._peek.type !== 44; ) this._peek.type === 0 || this._peek.type === 4 ? this._consumeElementStartTag(this._advance()) : this._peek.type === 3 ? (this._closeVoidElement(), this._consumeElementEndTag(this._advance())) : this._peek.type === 13 ? (this._closeVoidElement(), this._consumeCdata(this._advance())) : this._peek.type === 10 ? (this._closeVoidElement(), this._consumeComment(this._advance())) : this._peek.type === 5 || this._peek.type === 7 || this._peek.type === 6 ? (this._closeVoidElement(), this._consumeText(this._advance())) : this._peek.type === 21 ? this._consumeExpansion(this._advance()) : this._peek.type === 26 ? (this._closeVoidElement(), this._consumeBlockOpen(this._advance())) : this._peek.type === 28 ? (this._closeVoidElement(), this._consumeBlockClose(this._advance())) : this._peek.type === 30 ? (this._closeVoidElement(), this._consumeIncompleteBlock(this._advance())) : this._peek.type === 31 ? (this._closeVoidElement(), this._consumeLet(this._advance())) : this._peek.type === 19 ? this._consumeDocType(this._advance()) : this._peek.type === 34 ? (this._closeVoidElement(), this._consumeIncompleteLet(this._advance())) : this._peek.type === 35 || this._peek.type === 39 ? this._consumeComponentStartTag(this._advance()) : this._peek.type === 38 ? this._consumeComponentEndTag(this._advance()) : this._advance();
    for (let t of this._containerStack) t instanceof ge2 && this.errors.push(x2.create(t.name, t.sourceSpan, `Unclosed block "${t.name}"`));
  }
  _advance() {
    let t = this._peek;
    return this._index < this.tokens.length - 1 && this._index++, this._peek = this.tokens[this._index], t;
  }
  _advanceIf(t) {
    return this._peek.type === t ? this._advance() : null;
  }
  _consumeCdata(t) {
    let r = this._advance(), n = this._getText(r), i = this._advanceIf(14);
    this._addToParent(new Si2(n, new p(t.sourceSpan.start, (i || r).sourceSpan.end), [r]));
  }
  _consumeComment(t) {
    let r = this._advanceIf(7), n = this._advanceIf(11), i = r != null ? r.parts[0].trim() : null, s = n == null ? t.sourceSpan : new p(t.sourceSpan.start, n.sourceSpan.end, t.sourceSpan.fullStart);
    this._addToParent(new wi2(i, s));
  }
  _consumeDocType(t) {
    let r = this._advanceIf(7), n = this._advanceIf(20), i = r != null ? r.parts[0].trim() : null, s = new p(t.sourceSpan.start, (n || r || t).sourceSpan.end);
    this._addToParent(new Ti2(i, s));
  }
  _consumeExpansion(t) {
    let r = this._advance(), n = this._advance(), i = [];
    for (; this._peek.type === 22; ) {
      let a = this._parseExpansionCase();
      if (!a) return;
      i.push(a);
    }
    if (this._peek.type !== 25) {
      this.errors.push(x2.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '}'."));
      return;
    }
    let s = new p(t.sourceSpan.start, this._peek.sourceSpan.end, t.sourceSpan.fullStart);
    this._addToParent(new vi2(r.parts[0], n.parts[0], i, s, r.sourceSpan)), this._advance();
  }
  _parseExpansionCase() {
    let t = this._advance();
    if (this._peek.type !== 23) return this.errors.push(x2.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '{'.")), null;
    let r = this._advance(), n = this._collectExpansionExpTokens(r);
    if (!n) return null;
    let i = this._advance();
    n.push({ type: 44, parts: [], sourceSpan: i.sourceSpan });
    let s = new qi(n, this.tagDefinitionResolver, this.canSelfClose, this.allowHtmComponentClosingTags, this.isTagNameCaseSensitive);
    if (s.build(), s.errors.length > 0) return this.errors = this.errors.concat(s.errors), null;
    let a = new p(t.sourceSpan.start, i.sourceSpan.end, t.sourceSpan.fullStart), o = new p(r.sourceSpan.start, i.sourceSpan.end, r.sourceSpan.fullStart);
    return new Ci2(t.parts[0], s.rootNodes, a, t.sourceSpan, o);
  }
  _collectExpansionExpTokens(t) {
    let r = [], n = [23];
    for (; ; ) {
      if ((this._peek.type === 21 || this._peek.type === 23) && n.push(this._peek.type), this._peek.type === 24) if (Ri2(n, 23)) {
        if (n.pop(), n.length === 0) return r;
      } else return this.errors.push(x2.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      if (this._peek.type === 25) if (Ri2(n, 21)) n.pop();
      else return this.errors.push(x2.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      if (this._peek.type === 44) return this.errors.push(x2.create(null, t.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      r.push(this._advance());
    }
  }
  _getText(t) {
    let r = t.parts[0];
    if (r.length > 0 && r[0] == `
`) {
      var n;
      let i = this._getClosestElementLikeParent();
      i != null && i.children.length == 0 && (!((n = this._getTagDefinition(i)) === null || n === void 0) && n.ignoreFirstLf) && (r = r.substring(1));
    }
    return r;
  }
  _consumeText(t) {
    let r = [t], n = t.sourceSpan, i = t.parts[0];
    if (i.length > 0 && i[0] === `
`) {
      var s;
      let a = this._getContainer();
      a != null && a.children.length === 0 && (!((s = this._getTagDefinition(a)) === null || s === void 0) && s.ignoreFirstLf) && (i = i.substring(1), r[0] = { type: t.type, sourceSpan: t.sourceSpan, parts: [i] });
    }
    for (; this._peek.type === 8 || this._peek.type === 5 || this._peek.type === 9; ) t = this._advance(), r.push(t), t.type === 8 ? i += t.parts.join("").replace(/&([^;]+);/g, Oi2) : t.type === 9 ? i += t.parts[0] : i += t.parts.join("");
    if (i.length > 0) {
      let a = t.sourceSpan;
      this._addToParent(new _i2(i, new p(n.start, a.end, n.fullStart, n.details), r));
    }
  }
  _closeVoidElement() {
    var t;
    let r = this._getContainer();
    r !== null && (!((t = this._getTagDefinition(r)) === null || t === void 0) && t.isVoid) && this._containerStack.pop();
  }
  _consumeElementStartTag(t) {
    var r;
    let n = [], i = [], s = [];
    this._consumeAttributesAndDirectives(n, i, s);
    let a = this._getElementFullName(t, this._getClosestElementLikeParent()), o = this._getTagDefinition(a), l = false;
    if (this._peek.type === 2) {
      this._advance(), l = true;
      let v2 = this._getTagDefinition(a);
      this.canSelfClose || v2?.canSelfClose || Pe2(a) !== null || v2?.isVoid || this.errors.push(x2.create(a, t.sourceSpan, `Only void, custom and foreign elements can be self closed "${t.parts[1]}"`));
    } else this._peek.type === 1 && (this._advance(), l = false);
    let c = this._peek.sourceSpan.fullStart, u = new p(t.sourceSpan.start, c, t.sourceSpan.fullStart), d = new p(t.sourceSpan.start, c, t.sourceSpan.fullStart), _ = new p(t.sourceSpan.start.moveBy(1), t.sourceSpan.end), h = new ne2(a, n, i, [], l, u, d, void 0, _, o?.isVoid ?? false, void 0, s), f = this._getContainer(), g2 = f !== null && !!(!((r = this._getTagDefinition(f)) === null || r === void 0) && r.isClosedByChild(h.name));
    this._pushContainer(h, g2), l ? this._popContainer(a, ne2, u) : t.type === 4 && (this._popContainer(a, ne2, null), this.errors.push(x2.create(a, u, `Opening tag "${a}" not terminated.`)));
  }
  _consumeComponentStartTag(t) {
    var r;
    let n = t.parts[0], i = [], s = [], a = [];
    this._consumeAttributesAndDirectives(i, s, a);
    let o = this._getClosestElementLikeParent(), l = this._getComponentTagName(t, o), c = this._getComponentFullName(t, o), u = this._peek.type === 37;
    this._advance();
    let d = this._peek.sourceSpan.fullStart, _ = new p(t.sourceSpan.start, d, t.sourceSpan.fullStart), h = new p(t.sourceSpan.start, d, t.sourceSpan.fullStart), f = new U2(n, l, c, i, s, [], u, _, h, void 0, void 0, a), g2 = this._getContainer(), v2 = g2 !== null && f.tagName !== null && !!(!((r = this._getTagDefinition(g2)) === null || r === void 0) && r.isClosedByChild(f.tagName));
    this._pushContainer(f, v2), u ? this._popContainer(c, U2, _) : t.type === 39 && (this._popContainer(c, U2, null), this.errors.push(x2.create(c, _, `Opening tag "${c}" not terminated.`)));
  }
  _consumeAttributesAndDirectives(t, r, n) {
    for (; this._peek.type === 15 || this._peek.type === 40 || this._peek.type === 12; ) if (this._peek.type === 40) r.push(this._consumeDirective(this._peek));
    else if (this._peek.type === 15) t.push(this._consumeAttr(this._advance()));
    else {
      let i = this._advance();
      n.push(new bi2(i.parts[0], i.parts[1], i.sourceSpan));
    }
  }
  _consumeComponentEndTag(t) {
    let r = this._getComponentFullName(t, this._getClosestElementLikeParent());
    if (!this._popContainer(r, U2, t.sourceSpan)) {
      let n = this._containerStack[this._containerStack.length - 1], i;
      n instanceof U2 && n.componentName === t.parts[0] ? i = `, did you mean "${n.fullName}"?` : i = ". It may happen when the tag has already been closed by another tag.";
      let s = `Unexpected closing tag "${r}"${i}`;
      this.errors.push(x2.create(r, t.sourceSpan, s));
    }
  }
  _getTagDefinition(t) {
    return typeof t == "string" ? this.tagDefinitionResolver(t) : t instanceof ne2 ? this.tagDefinitionResolver(t.name) : t instanceof U2 && t.tagName !== null ? this.tagDefinitionResolver(t.tagName) : null;
  }
  _pushContainer(t, r) {
    r && this._containerStack.pop(), this._addToParent(t), this._containerStack.push(t);
  }
  _consumeElementEndTag(t) {
    var r;
    let n = this.allowHtmComponentClosingTags && t.parts.length === 0 ? null : this._getElementFullName(t, this._getClosestElementLikeParent());
    if (n && (!((r = this._getTagDefinition(n)) === null || r === void 0) && r.isVoid)) this.errors.push(x2.create(n, t.sourceSpan, `Void elements do not have end tags "${t.parts[1]}"`));
    else if (!this._popContainer(n, ne2, t.sourceSpan)) {
      let i = `Unexpected closing tag "${n}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
      this.errors.push(x2.create(n, t.sourceSpan, i));
    }
  }
  _popContainer(t, r, n) {
    let i = false;
    for (let a = this._containerStack.length - 1; a >= 0; a--) {
      var s;
      let o = this._containerStack[a], l = o instanceof U2 ? o.fullName : o.name;
      if (Pe2(l) ? l === t : (l === t || t === null) && o instanceof r) return o.endSourceSpan = n, o.sourceSpan.end = n !== null ? n.end : o.sourceSpan.end, this._containerStack.splice(a, this._containerStack.length - a), !i;
      (o instanceof ge2 || !(!((s = this._getTagDefinition(o)) === null || s === void 0) && s.closedByParent)) && (i = true);
    }
    return false;
  }
  _consumeAttr(t) {
    let r = fe2(t.parts[0], t.parts[1]), n = t.sourceSpan.end, i;
    this._peek.type === 16 && (i = this._advance());
    let s = "", a = [], o, l;
    if (this._peek.type === 17) for (o = this._peek.sourceSpan, l = this._peek.sourceSpan.end; this._peek.type === 17 || this._peek.type === 18 || this._peek.type === 9; ) {
      let u = this._advance();
      a.push(u), u.type === 18 ? s += u.parts.join("").replace(/&([^;]+);/g, Oi2) : u.type === 9 ? s += u.parts[0] : s += u.parts.join(""), l = n = u.sourceSpan.end;
    }
    this._peek.type === 16 && (l = n = this._advance().sourceSpan.end);
    let c = o && l && new p(i?.sourceSpan.start ?? o.start, l, i?.sourceSpan.fullStart ?? o.fullStart);
    return new ki2(r, s, new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), t.sourceSpan, c, a.length > 0 ? a : void 0, void 0);
  }
  _consumeDirective(t) {
    let r = [], n = t.sourceSpan.end, i = null;
    if (this._advance(), this._peek.type === 41) {
      for (n = this._peek.sourceSpan.end, this._advance(); this._peek.type === 15; ) r.push(this._consumeAttr(this._advance()));
      this._peek.type === 42 ? (i = this._peek.sourceSpan, this._advance()) : this.errors.push(x2.create(null, t.sourceSpan, "Unterminated directive definition"));
    }
    let s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new p(s.start, i === null ? t.sourceSpan.end : i.end, s.fullStart);
    return new yi2(t.parts[0], r, a, s, i);
  }
  _consumeBlockOpen(t) {
    let r = [];
    for (; this._peek.type === 29; ) {
      let o = this._advance();
      r.push(new fr2(o.parts[0], o.sourceSpan));
    }
    this._peek.type === 27 && this._advance();
    let n = this._peek.sourceSpan.fullStart, i = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new ge2(t.parts[0], r, [], i, t.sourceSpan, s);
    this._pushContainer(a, false);
  }
  _consumeBlockClose(t) {
    let r = this._containerStack.length, n = this._containerStack[r - 1];
    if (!this._popContainer(null, ge2, t.sourceSpan)) {
      if (this._containerStack.length < r) {
        let i = n instanceof U2 ? n.fullName : n.name;
        this.errors.push(x2.create(null, t.sourceSpan, `Unexpected closing block. The block may have been closed earlier. Did you forget to close the <${i}> element? If you meant to write the \`}\` character, you should use the "&#125;" HTML entity instead.`));
        return;
      }
      this.errors.push(x2.create(null, t.sourceSpan, 'Unexpected closing block. The block may have been closed earlier. If you meant to write the `}` character, you should use the "&#125;" HTML entity instead.'));
    }
  }
  _consumeIncompleteBlock(t) {
    let r = [];
    for (; this._peek.type === 29; ) {
      let o = this._advance();
      r.push(new fr2(o.parts[0], o.sourceSpan));
    }
    let n = this._peek.sourceSpan.fullStart, i = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), s = new p(t.sourceSpan.start, n, t.sourceSpan.fullStart), a = new ge2(t.parts[0], r, [], i, t.sourceSpan, s);
    this._pushContainer(a, false), this._popContainer(null, ge2, null), this.errors.push(x2.create(t.parts[0], i, `Incomplete block "${t.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`));
  }
  _consumeLet(t) {
    let r = t.parts[0], n, i;
    if (this._peek.type !== 32) {
      this.errors.push(x2.create(t.parts[0], t.sourceSpan, `Invalid @let declaration "${r}". Declaration must have a value.`));
      return;
    } else n = this._advance();
    if (this._peek.type !== 33) {
      this.errors.push(x2.create(t.parts[0], t.sourceSpan, `Unterminated @let declaration "${r}". Declaration must be terminated with a semicolon.`));
      return;
    } else i = this._advance();
    let s = i.sourceSpan.end, a = new p(t.sourceSpan.start, s, t.sourceSpan.fullStart), o = t.sourceSpan.toString().lastIndexOf(r), l = t.sourceSpan.start.moveBy(o), c = new p(l, t.sourceSpan.end), u = new dr2(r, n.parts[0], a, c, n.sourceSpan);
    this._addToParent(u);
  }
  _consumeIncompleteLet(t) {
    let r = t.parts[0] ?? "", n = r ? ` "${r}"` : "";
    if (r.length > 0) {
      let i = t.sourceSpan.toString().lastIndexOf(r), s = t.sourceSpan.start.moveBy(i), a = new p(s, t.sourceSpan.end), o = new p(t.sourceSpan.start, t.sourceSpan.start.moveBy(0)), l = new dr2(r, "", t.sourceSpan, a, o);
      this._addToParent(l);
    }
    this.errors.push(x2.create(t.parts[0], t.sourceSpan, `Incomplete @let declaration${n}. @let declarations must be written as \`@let <name> = <value>;\``));
  }
  _getContainer() {
    return this._containerStack.length > 0 ? this._containerStack[this._containerStack.length - 1] : null;
  }
  _getClosestElementLikeParent() {
    for (let t = this._containerStack.length - 1; t > -1; t--) {
      let r = this._containerStack[t];
      if (r instanceof ne2 || r instanceof U2) return r;
    }
    return null;
  }
  _addToParent(t) {
    let r = this._getContainer();
    r === null ? this.rootNodes.push(t) : r.children.push(t);
  }
  _getElementFullName(t, r) {
    let n = this._getPrefix(t, r);
    return fe2(n, t.parts[1]);
  }
  _getComponentFullName(t, r) {
    let n = t.parts[0], i = this._getComponentTagName(t, r);
    return i === null ? n : i.startsWith(":") ? n + i : `${n}:${i}`;
  }
  _getComponentTagName(t, r) {
    let n = this._getPrefix(t, r), i = t.parts[2];
    return !n && !i ? null : !n && i ? i : fe2(n, i || "ng-component");
  }
  _getPrefix(t, r) {
    var n;
    let i, s;
    if (t.type === 35 || t.type === 39 || t.type === 38 ? (i = t.parts[1], s = t.parts[2]) : (i = t.parts[0], s = t.parts[1]), i = i || ((n = this._getTagDefinition(s)) === null || n === void 0 ? void 0 : n.implicitNamespacePrefix) || "", !i && r) {
      let a = r instanceof ne2 ? r.name : r.tagName;
      if (a !== null) {
        let o = ee2(a)[1], l = this._getTagDefinition(o);
        l !== null && !l.preventNamespaceInheritance && (i = Pe2(a));
      }
    }
    return i;
  }
};
function Ri2(e, t) {
  return e.length > 0 && e[e.length - 1] === t;
}
function Oi2(e, t) {
  return _e4[t] !== void 0 ? _e4[t] || e : /^#x[a-f0-9]+$/i.test(t) ? String.fromCodePoint(parseInt(t.slice(2), 16)) : /^#\d+$/.test(t) ? String.fromCodePoint(parseInt(t.slice(1), 10)) : e;
}
var Hi = class extends Bi2 {
  constructor() {
    super(Ne2);
  }
  parse(e, t, r, n = false, i) {
    return super.parse(e, t, r, n, i);
  }
};
var kr2;
function Mt2(e, t = {}) {
  let { canSelfClose: r = false, allowHtmComponentClosingTags: n = false, allowStartTagComments: i = false, isTagNameCaseSensitive: s = false, getTagContentType: a, tokenizeAngularBlocks: o = false, tokenizeAngularLetDeclaration: l = false, enableAngularSelectorlessSyntax: c = false } = t;
  return kr2 ?? (kr2 = new Hi()), kr2.parse(e, "angular-html-parser", { tokenizeExpansionForms: o, canSelfClose: r, allowHtmComponentClosingTags: n, allowStartTagComments: i, tokenizeBlocks: o, tokenizeLet: l, selectorlessEnabled: c }, s, a);
}
var oo2 = [co2, uo2, ho2, fo2, go2, vo2, _o2, So2, Co2, mo2];
function lo2(e, t) {
  for (let r of oo2) r(e, t);
  return e;
}
function co2(e) {
  e.walk((t) => {
    if (t.kind === "element" && t.tagDefinition.ignoreFirstLf && t.children.length > 0 && t.children[0].kind === "text" && t.children[0].value[0] === `
`) {
      let r = t.children[0];
      r.value.length === 1 ? t.removeChild(r) : r.value = r.value.slice(1);
    }
  });
}
function uo2(e) {
  let t = (r) => r.kind === "element" && r.prev?.kind === "ieConditionalStartComment" && r.prev.sourceSpan.end.offset === r.startSourceSpan.start.offset && r.firstChild?.kind === "ieConditionalEndComment" && r.firstChild.sourceSpan.start.offset === r.startSourceSpan.end.offset;
  e.walk((r) => {
    if (r.children) for (let n = 0; n < r.children.length; n++) {
      let i = r.children[n];
      if (!t(i)) continue;
      let s = i.prev, a = i.firstChild;
      r.removeChild(s), n--;
      let o = new p(s.sourceSpan.start, a.sourceSpan.end), l = new p(o.start, i.sourceSpan.end);
      i.condition = s.condition, i.sourceSpan = l, i.startSourceSpan = o, i.removeChild(a);
    }
  });
}
function po2(e, t, r) {
  e.walk((n) => {
    if (n.children) for (let i = 0; i < n.children.length; i++) {
      let s = n.children[i];
      if (s.kind !== "text" && !t(s)) continue;
      s.kind !== "text" && (s.kind = "text", s.value = r(s));
      let a = s.prev;
      !a || a.kind !== "text" || (a.value += s.value, a.sourceSpan = new p(a.sourceSpan.start, s.sourceSpan.end), n.removeChild(s), i--);
    }
  });
}
function ho2(e) {
  return po2(e, (t) => t.kind === "cdata", (t) => `<![CDATA[${t.value}]]>`);
}
function mo2(e) {
  let t = (r) => r.kind === "element" && r.attrs.length === 0 && !J(r.startTagComments) && r.children.length === 1 && r.firstChild.kind === "text" && !P.hasWhitespaceCharacter(r.children[0].value) && !r.firstChild.hasLeadingSpaces && !r.firstChild.hasTrailingSpaces && r.isLeadingSpaceSensitive && !r.hasLeadingSpaces && r.isTrailingSpaceSensitive && !r.hasTrailingSpaces && r.prev?.kind === "text" && r.next?.kind === "text";
  e.walk((r) => {
    if (r.children) for (let n = 0; n < r.children.length; n++) {
      let i = r.children[n];
      if (!t(i)) continue;
      let s = i.prev, a = i.next;
      s.value += `<${i.rawName}>` + i.firstChild.value + `</${i.rawName}>` + a.value, s.sourceSpan = new p(s.sourceSpan.start, a.sourceSpan.end), s.isTrailingSpaceSensitive = a.isTrailingSpaceSensitive, s.hasTrailingSpaces = a.hasTrailingSpaces, r.removeChild(i), n--, r.removeChild(a);
    }
  });
}
function fo2(e, t) {
  if (t.parser === "html") return;
  let r = /\{\{(.+?)\}\}/s;
  e.walk((n) => {
    if (rn2(n, t)) for (let i of n.children) {
      if (i.kind !== "text") continue;
      let s = i.sourceSpan.start, a, o = i.value.split(r);
      for (let l = 0; l < o.length; l++, s = a) {
        let c = o[l];
        if (l % 2 === 0) {
          a = s.moveBy(c.length), c.length > 0 && n.insertChildBefore(i, { kind: "text", value: c, sourceSpan: new p(s, a) });
          continue;
        }
        a = s.moveBy(c.length + 4), n.insertChildBefore(i, { kind: "interpolation", sourceSpan: new p(s, a), children: c.length === 0 ? [] : [{ kind: "text", value: c, sourceSpan: new p(s.moveBy(2), a.moveBy(-2)) }] });
      }
      n.removeChild(i);
    }
  });
}
function go2(e, t) {
  e.walk((r) => {
    let n = r.$children;
    if (!n) return;
    if (n.length === 0 || n.length === 1 && n[0].kind === "text" && P.trim(n[0].value).length === 0) {
      r.hasDanglingSpaces = n.length > 0, r.$children = [];
      return;
    }
    let i = nn2(r, t), s = er2(r);
    if (!i) for (let a = 0; a < n.length; a++) {
      let o = n[a];
      if (o.kind !== "text") continue;
      let { leadingWhitespace: l, text: c, trailingWhitespace: u } = tn2(o.value), d = o.prev, _ = o.next;
      c ? (o.value = c, o.sourceSpan = new p(o.sourceSpan.start.moveBy(l.length), o.sourceSpan.end.moveBy(-u.length)), l && (d && (d.hasTrailingSpaces = true), o.hasLeadingSpaces = true), u && (o.hasTrailingSpaces = true, _ && (_.hasLeadingSpaces = true))) : (r.removeChild(o), a--, (l || u) && (d && (d.hasTrailingSpaces = true), _ && (_.hasLeadingSpaces = true)));
    }
    r.isWhitespaceSensitive = i, r.isIndentationSensitive = s;
  });
}
function _o2(e) {
  e.walk((t) => {
    t.isSelfClosing = !t.children || t.kind === "element" && (t.tagDefinition.isVoid || t.endSourceSpan && t.startSourceSpan.start === t.endSourceSpan.start && t.startSourceSpan.end === t.endSourceSpan.end);
  });
}
function So2(e, t) {
  e.walk((r) => {
    r.kind === "element" && (r.hasHtmComponentClosingTag = r.endSourceSpan && /^<\s*\/\s*\/\s*>$/.test(t.originalText.slice(r.endSourceSpan.start.offset, r.endSourceSpan.end.offset)));
  });
}
function vo2(e, t) {
  e.walk((r) => {
    r.cssDisplay = fn2(r, t);
  });
}
function Co2(e, t) {
  e.walk((r) => {
    let { children: n } = r;
    if (n) {
      if (n.length === 0) {
        r.isDanglingSpaceSensitive = on2(r, t);
        return;
      }
      for (let i of n) i.isLeadingSpaceSensitive = sn2(i, t), i.isTrailingSpaceSensitive = an2(i, t);
      for (let i = 0; i < n.length; i++) {
        let s = n[i];
        s.isLeadingSpaceSensitive = (i === 0 || s.prev.isTrailingSpaceSensitive) && s.isLeadingSpaceSensitive, s.isTrailingSpaceSensitive = (i === n.length - 1 || s.next.isLeadingSpaceSensitive) && s.isTrailingSpaceSensitive;
      }
    }
  });
}
var Fi2 = lo2;
function ko2(e, t, r) {
  let { node: n } = e;
  switch (n.kind) {
    case "root":
      return t.__onHtmlRoot && t.__onHtmlRoot(n), [C(Ae2(e, t, r)), k2];
    case "element":
    case "ieConditionalComment":
      return li2(e, t, r);
    case "angularControlFlowBlock":
      return ni2(e, t, r);
    case "angularControlFlowBlockParameters":
      return si2(e, t, r);
    case "angularControlFlowBlockParameter":
      return P.trim(n.expression);
    case "angularLetDeclaration":
      return C(["@let ", C([n.id, " =", C(A([S2, r("init")]))]), ";"]);
    case "angularLetDeclarationInitializer":
      return n.value;
    case "angularIcuExpression":
      return ai2(e, t, r);
    case "angularIcuCase":
      return oi2(e, t, r);
    case "ieConditionalStartComment":
    case "ieConditionalEndComment":
      return [me2(n), ue2(n)];
    case "interpolation":
      return [me2(n, t), ...e.map(r, "children"), ue2(n, t)];
    case "text": {
      if (n.parent.kind === "interpolation") {
        let o = /\n[^\S\n]*$/, l = o.test(n.value), c = l ? n.value.replace(o, "") : n.value;
        return [L2(c), l ? k2 : ""];
      }
      let i = B(n, t), s = Tt2(n), a = M2(n, t);
      return s[0] = [i, s[0]], s.push([s.pop(), a]), gt2(s);
    }
    case "docType":
      return [C([me2(n, t), " ", T2(0, n.value.replace(/^html\b/i, "html"), /\s+/g, " ")]), ue2(n, t)];
    case "comment":
      return [B(n, t), L2(t.originalText.slice(F(n), Z2(n))), M2(n, t)];
    case "attribute": {
      if (n.value === null) return n.rawName;
      let i = nr2(n.value), s = Et2(n, t) ? "" : Wr2(i, '"');
      return [n.rawName, "=", s, L2(s === '"' ? T2(0, i, '"', "&quot;") : T2(0, i, "'", "&apos;")), s];
    }
    case "startTagComment":
      return ci2(e);
    default:
      throw new Gr2(n, "HTML");
  }
}
var bo2 = { features: { experimental_frontMatterSupport: { massageAstNode: true, embed: true, print: true } }, preprocess: Fi2, print: ko2, insertPragma: ei2, massageAstNode: or2, embed: Gn2, getVisitorKeys: Yn2 };
var Vi2 = bo2;
var Ui2 = [{ name: "Angular", type: "markup", aceMode: "html", extensions: [".component.html"], tmScope: "text.html.basic", aliases: ["xhtml"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["angular"], vscodeLanguageIds: ["html"], filenames: [], linguistLanguageId: 146 }, { name: "HTML", type: "markup", aceMode: "html", extensions: [".html", ".hta", ".htm", ".html.hl", ".inc", ".xht", ".xhtml"], tmScope: "text.html.basic", aliases: ["xhtml"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["html"], vscodeLanguageIds: ["html"], linguistLanguageId: 146 }, { name: "Lightning Web Components", type: "markup", aceMode: "html", extensions: [], tmScope: "text.html.basic", aliases: ["LWC", "lwc"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["lwc"], vscodeLanguageIds: ["html"], filenames: [], linguistLanguageId: 146 }, { name: "MJML", type: "markup", aceMode: "html", extensions: [".mjml"], tmScope: "text.mjml.basic", aliases: ["MJML", "mjml"], codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", parsers: ["mjml"], filenames: [], vscodeLanguageIds: ["mjml"], linguistLanguageId: 146 }, { name: "Vue", type: "markup", aceMode: "vue", extensions: [".vue"], tmScope: "text.html.vue", codemirrorMode: "vue", codemirrorMimeType: "text/x-vue", parsers: ["vue"], vscodeLanguageIds: ["vue"], linguistLanguageId: 391 }];
var br2 = { bracketSpacing: { category: "Common", type: "boolean", default: true, description: "Print spaces between brackets.", oppositeDescription: "Do not print spaces between brackets." }, objectWrap: { category: "Common", type: "choice", default: "preserve", description: "How to wrap object literals.", choices: [{ value: "preserve", description: "Keep as multi-line, if there is a newline between the opening brace and first property." }, { value: "collapse", description: "Fit to a single line when possible." }] }, singleQuote: { category: "Common", type: "boolean", default: false, description: "Use single quotes instead of double quotes." }, proseWrap: { category: "Common", type: "choice", default: "preserve", description: "How to wrap prose.", choices: [{ value: "always", description: "Wrap prose if it exceeds the print width." }, { value: "never", description: "Do not wrap prose." }, { value: "preserve", description: "Wrap prose as-is." }] }, bracketSameLine: { category: "Common", type: "boolean", default: false, description: "Put > of opening tags on the last line instead of on a new line." }, singleAttributePerLine: { category: "Common", type: "boolean", default: false, description: "Enforce single attribute per line in HTML, Vue and JSX." } };
var Wi2 = "HTML";
var wo2 = { bracketSameLine: br2.bracketSameLine, htmlWhitespaceSensitivity: { category: Wi2, type: "choice", default: "css", description: "How to handle whitespaces in HTML.", choices: [{ value: "css", description: "Respect the default value of CSS display property." }, { value: "strict", description: "Whitespaces are considered sensitive." }, { value: "ignore", description: "Whitespaces are considered insensitive." }] }, singleAttributePerLine: br2.singleAttributePerLine, vueIndentScriptAndStyle: { category: Wi2, type: "boolean", default: false, description: "Indent script and style tags in Vue files." } };
var zi = wo2;
var Pr2 = {};
Ir2(Pr2, { angular: () => Wo2, html: () => Fo2, lwc: () => Go2, mjml: () => Uo2, vue: () => zo2 });
function To2(e, t) {
  let r = new SyntaxError(e + " (" + t.loc.start.line + ":" + t.loc.start.column + ")");
  return Object.assign(r, t);
}
var Gi = To2;
var yo2 = { canSelfClose: true, normalizeTagName: false, normalizeAttributeName: false, allowHtmComponentClosingTags: false, allowStartTagComments: false, isTagNameCaseSensitive: false, shouldParseFrontMatter: true };
function Bt2(e) {
  return { ...yo2, ...e };
}
function wr2(e) {
  let { canSelfClose: t, allowHtmComponentClosingTags: r, allowStartTagComments: n, isTagNameCaseSensitive: i, shouldParseAsRawText: s, tokenizeAngularBlocks: a, tokenizeAngularLetDeclaration: o } = e;
  return { canSelfClose: t, allowHtmComponentClosingTags: r, allowStartTagComments: n, isTagNameCaseSensitive: i, getTagContentType: s ? (...l) => s(...l) ? lr.RAW_TEXT : void 0 : void 0, tokenizeAngularBlocks: a, tokenizeAngularLetDeclaration: o };
}
var qt2 = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set(["accesskey", "autocapitalize", "autocorrect", "autofocus", "class", "contenteditable", "dir", "draggable", "enterkeyhint", "exportparts", "hidden", "id", "inert", "inputmode", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "nonce", "part", "popover", "slot", "spellcheck", "style", "tabindex", "title", "translate", "writingsuggestions"])], ["a", /* @__PURE__ */ new Set(["charset", "coords", "download", "href", "hreflang", "name", "ping", "referrerpolicy", "rel", "rev", "shape", "target", "type"])], ["applet", /* @__PURE__ */ new Set(["align", "alt", "archive", "code", "codebase", "height", "hspace", "name", "object", "vspace", "width"])], ["area", /* @__PURE__ */ new Set(["alt", "coords", "download", "href", "hreflang", "nohref", "ping", "referrerpolicy", "rel", "shape", "target", "type"])], ["audio", /* @__PURE__ */ new Set(["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"])], ["base", /* @__PURE__ */ new Set(["href", "target"])], ["basefont", /* @__PURE__ */ new Set(["color", "face", "size"])], ["blockquote", /* @__PURE__ */ new Set(["cite"])], ["body", /* @__PURE__ */ new Set(["alink", "background", "bgcolor", "link", "text", "vlink"])], ["br", /* @__PURE__ */ new Set(["clear"])], ["button", /* @__PURE__ */ new Set(["command", "commandfor", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "popovertarget", "popovertargetaction", "type", "value"])], ["canvas", /* @__PURE__ */ new Set(["height", "width"])], ["caption", /* @__PURE__ */ new Set(["align"])], ["col", /* @__PURE__ */ new Set(["align", "char", "charoff", "span", "valign", "width"])], ["colgroup", /* @__PURE__ */ new Set(["align", "char", "charoff", "span", "valign", "width"])], ["data", /* @__PURE__ */ new Set(["value"])], ["del", /* @__PURE__ */ new Set(["cite", "datetime"])], ["details", /* @__PURE__ */ new Set(["name", "open"])], ["dialog", /* @__PURE__ */ new Set(["closedby", "open"])], ["dir", /* @__PURE__ */ new Set(["compact"])], ["div", /* @__PURE__ */ new Set(["align"])], ["dl", /* @__PURE__ */ new Set(["compact"])], ["embed", /* @__PURE__ */ new Set(["height", "src", "type", "width"])], ["fieldset", /* @__PURE__ */ new Set(["disabled", "form", "name"])], ["font", /* @__PURE__ */ new Set(["color", "face", "size"])], ["form", /* @__PURE__ */ new Set(["accept", "accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"])], ["frame", /* @__PURE__ */ new Set(["frameborder", "longdesc", "marginheight", "marginwidth", "name", "noresize", "scrolling", "src"])], ["frameset", /* @__PURE__ */ new Set(["cols", "rows"])], ["h1", /* @__PURE__ */ new Set(["align"])], ["h2", /* @__PURE__ */ new Set(["align"])], ["h3", /* @__PURE__ */ new Set(["align"])], ["h4", /* @__PURE__ */ new Set(["align"])], ["h5", /* @__PURE__ */ new Set(["align"])], ["h6", /* @__PURE__ */ new Set(["align"])], ["head", /* @__PURE__ */ new Set(["profile"])], ["hr", /* @__PURE__ */ new Set(["align", "noshade", "size", "width"])], ["html", /* @__PURE__ */ new Set(["manifest", "version"])], ["iframe", /* @__PURE__ */ new Set(["align", "allow", "allowfullscreen", "allowpaymentrequest", "allowusermedia", "frameborder", "height", "loading", "longdesc", "marginheight", "marginwidth", "name", "referrerpolicy", "sandbox", "scrolling", "src", "srcdoc", "width"])], ["img", /* @__PURE__ */ new Set(["align", "alt", "border", "crossorigin", "decoding", "fetchpriority", "height", "hspace", "ismap", "loading", "longdesc", "name", "referrerpolicy", "sizes", "src", "srcset", "usemap", "vspace", "width"])], ["input", /* @__PURE__ */ new Set(["accept", "align", "alpha", "alt", "autocomplete", "checked", "colorspace", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "ismap", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "popovertarget", "popovertargetaction", "readonly", "required", "size", "src", "step", "type", "usemap", "value", "width"])], ["ins", /* @__PURE__ */ new Set(["cite", "datetime"])], ["isindex", /* @__PURE__ */ new Set(["prompt"])], ["label", /* @__PURE__ */ new Set(["for", "form"])], ["legend", /* @__PURE__ */ new Set(["align"])], ["li", /* @__PURE__ */ new Set(["type", "value"])], ["link", /* @__PURE__ */ new Set(["as", "blocking", "charset", "color", "crossorigin", "disabled", "fetchpriority", "href", "hreflang", "imagesizes", "imagesrcset", "integrity", "media", "referrerpolicy", "rel", "rev", "sizes", "target", "type"])], ["map", /* @__PURE__ */ new Set(["name"])], ["menu", /* @__PURE__ */ new Set(["compact"])], ["meta", /* @__PURE__ */ new Set(["charset", "content", "http-equiv", "media", "name", "scheme"])], ["meter", /* @__PURE__ */ new Set(["high", "low", "max", "min", "optimum", "value"])], ["object", /* @__PURE__ */ new Set(["align", "archive", "border", "classid", "codebase", "codetype", "data", "declare", "form", "height", "hspace", "name", "standby", "type", "typemustmatch", "usemap", "vspace", "width"])], ["ol", /* @__PURE__ */ new Set(["compact", "reversed", "start", "type"])], ["optgroup", /* @__PURE__ */ new Set(["disabled", "label"])], ["option", /* @__PURE__ */ new Set(["disabled", "label", "selected", "value"])], ["output", /* @__PURE__ */ new Set(["for", "form", "name"])], ["p", /* @__PURE__ */ new Set(["align"])], ["param", /* @__PURE__ */ new Set(["name", "type", "value", "valuetype"])], ["pre", /* @__PURE__ */ new Set(["width"])], ["progress", /* @__PURE__ */ new Set(["max", "value"])], ["q", /* @__PURE__ */ new Set(["cite"])], ["script", /* @__PURE__ */ new Set(["async", "blocking", "charset", "crossorigin", "defer", "fetchpriority", "integrity", "language", "nomodule", "referrerpolicy", "src", "type"])], ["select", /* @__PURE__ */ new Set(["autocomplete", "disabled", "form", "multiple", "name", "required", "size"])], ["slot", /* @__PURE__ */ new Set(["name"])], ["source", /* @__PURE__ */ new Set(["height", "media", "sizes", "src", "srcset", "type", "width"])], ["style", /* @__PURE__ */ new Set(["blocking", "media", "type"])], ["table", /* @__PURE__ */ new Set(["align", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "rules", "summary", "width"])], ["tbody", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["td", /* @__PURE__ */ new Set(["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"])], ["template", /* @__PURE__ */ new Set(["shadowrootclonable", "shadowrootcustomelementregistry", "shadowrootdelegatesfocus", "shadowrootmode", "shadowrootserializable"])], ["textarea", /* @__PURE__ */ new Set(["autocomplete", "cols", "dirname", "disabled", "form", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "wrap"])], ["tfoot", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["th", /* @__PURE__ */ new Set(["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"])], ["thead", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["time", /* @__PURE__ */ new Set(["datetime"])], ["tr", /* @__PURE__ */ new Set(["align", "bgcolor", "char", "charoff", "valign"])], ["track", /* @__PURE__ */ new Set(["default", "kind", "label", "src", "srclang"])], ["ul", /* @__PURE__ */ new Set(["compact", "type"])], ["video", /* @__PURE__ */ new Set(["autoplay", "controls", "crossorigin", "height", "loop", "muted", "playsinline", "poster", "preload", "src", "width"])]]);
var $i2 = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fencedframe", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "geolocation", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "math", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", "rb", "rbc", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "search", "section", "select", "selectedcontent", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"]);
var Ht2 = { attrs: true, children: true, cases: true, expression: true };
var ji2 = /* @__PURE__ */ new Set(["parent"]);
var ie2;
var Tr2;
var yr2;
var Me2 = class Me3 {
  constructor(t = {}) {
    Rr2(this, ie2);
    Wt2(this, "kind");
    Wt2(this, "parent");
    for (let r of /* @__PURE__ */ new Set([...ji2, ...Object.keys(t)])) this.setProperty(r, t[r]);
    if (ae2(t)) for (let r of Object.getOwnPropertySymbols(t)) this.setProperty(r, t[r]);
  }
  setProperty(t, r) {
    if (this[t] !== r) {
      if (t in Ht2 && (r = r.map((n) => this.createChild(n))), !ji2.has(t)) {
        this[t] = r;
        return;
      }
      Object.defineProperty(this, t, { value: r, enumerable: false, configurable: true });
    }
  }
  map(t) {
    let r;
    for (let n in Ht2) {
      let i = this[n];
      if (i) {
        let s = Eo2(i, (a) => a.map(t));
        r !== i && (r ?? (r = new Me3({ parent: this.parent })), r.setProperty(n, s));
      }
    }
    if (r) for (let n in this) n in Ht2 || (r[n] = this[n]);
    return t(r || this);
  }
  walk(t) {
    for (let r in Ht2) {
      let n = this[r];
      if (n) for (let i = 0; i < n.length; i++) n[i].walk(t);
    }
    t(this);
  }
  createChild(t) {
    let r = t instanceof Me3 ? t.clone() : new Me3(t);
    return r.setProperty("parent", this), r;
  }
  insertChildBefore(t, r) {
    let n = this.$children;
    n.splice(n.indexOf(t), 0, this.createChild(r));
  }
  removeChild(t) {
    let r = this.$children;
    r.splice(r.indexOf(t), 1);
  }
  replaceChild(t, r) {
    let n = this.$children;
    n[n.indexOf(t)] = this.createChild(r);
  }
  clone() {
    return new Me3(this);
  }
  get $children() {
    return this[qe2(this, ie2, Tr2)];
  }
  set $children(t) {
    this[qe2(this, ie2, Tr2)] = t;
  }
  get firstChild() {
    return this.$children?.[0];
  }
  get lastChild() {
    return I2(1, this.$children, -1);
  }
  get prev() {
    let t = qe2(this, ie2, yr2);
    return t[t.indexOf(this) - 1];
  }
  get next() {
    let t = qe2(this, ie2, yr2);
    return t[t.indexOf(this) + 1];
  }
  get rawName() {
    return this.hasExplicitNamespace ? this.fullName : this.name;
  }
  get fullName() {
    return this.namespace ? this.namespace + ":" + this.name : this.name;
  }
  get attrMap() {
    return Object.fromEntries(this.attrs.map((t) => [t.fullName, t.value]));
  }
};
ie2 = /* @__PURE__ */ new WeakSet(), Tr2 = function() {
  return this.kind === "angularIcuCase" ? "expression" : this.kind === "angularIcuExpression" ? "cases" : "children";
}, yr2 = function() {
  return this.parent?.$children ?? [];
};
var Ft2 = Me2;
function Eo2(e, t) {
  let r = e.map(t);
  return r.some((n, i) => n !== e[i]) ? r : e;
}
var xo2 = [{ regex: /^(?<openingTagSuffix>\[if(?<condition>[^\]]*)\]>)(?<data>.*?)<!\s*\[endif\]$/s, parse: Lo2 }, { regex: /^\[if(?<condition>[^\]]*)\]><!$/, parse: Ao2 }, { regex: /^<!\s*\[endif\]$/, parse: Po2 }];
function Yi2(e, t) {
  if (e.value) for (let { regex: r, parse: n } of xo2) {
    let i = e.value.match(r);
    if (i) return n(e, i, t);
  }
  return null;
}
function Lo2(e, t, r) {
  let { openingTagSuffix: n, condition: i, data: s } = t.groups, a = 4 + n.length, o = e.sourceSpan.start.moveBy(a), l = o.moveBy(s.length), [c, u] = (() => {
    try {
      return [true, r(s, o).children];
    } catch {
      return [false, [{ kind: "text", value: s, sourceSpan: new p(o, l) }]];
    }
  })();
  return { kind: "ieConditionalComment", complete: c, children: u, condition: T2(0, i.trim(), /\s+/g, " "), sourceSpan: e.sourceSpan, startSourceSpan: new p(e.sourceSpan.start, o), endSourceSpan: new p(l, e.sourceSpan.end) };
}
function Ao2(e, t) {
  let { condition: r } = t.groups;
  return { kind: "ieConditionalStartComment", condition: T2(0, r.trim(), /\s+/g, " "), sourceSpan: e.sourceSpan };
}
function Po2(e) {
  return { kind: "ieConditionalEndComment", sourceSpan: e.sourceSpan };
}
var Er2 = class extends gr2 {
  visitExpansionCase(t, r) {
    r.parseOptions.name === "angular" && this.visitChildren(r, (n) => {
      n(t.expression);
    });
  }
  visit(t, { parseOptions: r }) {
    Ro2(t), Oo2(t, r), Bo2(t, r), Mo2(t);
  }
};
function Xi(e, t, r, n) {
  let i = r.name === "angular";
  It2(new Er2(), e.children, { parseOptions: r }), t && e.children.unshift(t);
  let s = new Ft2(e);
  return s.walk((a) => {
    if (a.kind === "comment") {
      let o = Yi2(a, n);
      o && a.parent.replaceChild(a, o);
    } else i && a.kind === "element" && a.comments && (a.startTagComments = a.comments, delete a.comments);
    i && (No2(a), Do2(a), Io2(a));
  }), s;
}
function No2(e) {
  if (e.kind === "block") {
    if (e.name = T2(0, e.name.toLowerCase(), /\s+/g, " ").trim(), e.kind = "angularControlFlowBlock", !J(e.parameters)) {
      delete e.parameters;
      return;
    }
    for (let t of e.parameters) t.kind = "angularControlFlowBlockParameter";
    e.parameters = { kind: "angularControlFlowBlockParameters", children: e.parameters, sourceSpan: new p(e.parameters[0].sourceSpan.start, I2(0, e.parameters, -1).sourceSpan.end) };
  }
}
function Do2(e) {
  e.kind === "letDeclaration" && (e.kind = "angularLetDeclaration", e.id = e.name, e.init = { kind: "angularLetDeclarationInitializer", sourceSpan: new p(e.valueSpan.start, e.valueSpan.end), value: e.value }, delete e.name, delete e.value);
}
function Io2(e) {
  e.kind === "expansion" && (e.kind = "angularIcuExpression"), e.kind === "expansionCase" && (e.kind = "angularIcuCase");
}
function Ki(e, t) {
  let r = e.toLowerCase();
  return t(r) ? r : e;
}
function Qi(e) {
  let t = e.name.startsWith(":") ? e.name.slice(1).split(":", 1)[0] : null, r = e.nameSpan.toString(), n = t !== null && r.startsWith(`${t}:`), i = n ? r.slice(t.length + 1) : r;
  e.name = i, e.namespace = t, e.hasExplicitNamespace = n;
}
function Ro2(e) {
  switch (e.kind) {
    case "element":
      Qi(e);
      for (let t of e.attrs) Qi(t), t.valueSpan ? (t.value = t.valueSpan.toString(), /["']/.test(t.value[0]) && (t.value = t.value.slice(1, -1))) : t.value = null;
      break;
    case "comment":
      e.value = e.sourceSpan.toString().slice(4, -3);
      break;
    case "text":
      e.value = e.sourceSpan.toString();
      break;
  }
}
function Oo2(e, t) {
  if (e.kind === "element") {
    let r = Ne2(t.isTagNameCaseSensitive ? e.name : e.name.toLowerCase());
    !e.namespace || e.namespace === r.implicitNamespacePrefix || oe2(e) ? e.tagDefinition = r : e.tagDefinition = Ne2("");
  }
}
function Mo2(e) {
  e.sourceSpan && e.endSourceSpan && (e.sourceSpan = new p(e.sourceSpan.start, e.endSourceSpan.end));
}
function Bo2(e, t) {
  if (e.kind === "element" && (t.normalizeTagName && (!e.namespace || e.namespace === e.tagDefinition.implicitNamespacePrefix || oe2(e)) && (e.name = Ki(e.name, (r) => $i2.has(r))), t.normalizeAttributeName)) for (let r of e.attrs) r.namespace || (r.name = Ki(r.name, (n) => qt2.has(e.name) && (qt2.get("*").has(n) || qt2.get(e.name).has(n))));
}
function Lr2(e, t) {
  let { rootNodes: r, errors: n } = Mt2(e, wr2(t));
  return n.length > 0 && xr2(n[0]), { parseOptions: t, rootNodes: r };
}
function Ji(e, t) {
  let r = wr2(t), { rootNodes: n, errors: i } = Mt2(e, r);
  if (n.some((c) => c.kind === "docType" && c.value === "html" || c.kind === "element" && c.name.toLowerCase() === "html")) return Lr2(e, Vt2);
  let a, o = () => a ?? (a = Mt2(e, { ...r, getTagContentType: void 0 })), l = (c) => {
    let { offset: u } = c.startSourceSpan.start;
    return o().rootNodes.find((d) => d.kind === "element" && d.startSourceSpan.start.offset === u) ?? c;
  };
  for (let [c, u] of n.entries()) if (u.kind === "element") {
    if (u.isVoid) i = o().errors, n[c] = l(u);
    else if (qo2(u)) {
      let { endSourceSpan: d, startSourceSpan: _ } = u, h = o().errors.find((f) => f.span.start.offset > _.start.offset && f.span.start.offset < d.end.offset);
      h && xr2(h), n[c] = l(u);
    }
  }
  return i.length > 0 && xr2(i[0]), { parseOptions: t, rootNodes: n };
}
function qo2(e) {
  if (e.kind !== "element" || e.name !== "template") return false;
  let t = e.attrs.find((r) => r.name === "lang")?.value;
  return !t || t === "html";
}
function xr2(e) {
  let { msg: t, span: { start: r, end: n } } = e;
  throw Gi(t, { loc: { start: { line: r.line + 1, column: r.col + 1 }, end: { line: n.line + 1, column: n.col + 1 } }, cause: e });
}
function Ho2(e, t, r, n, i, s) {
  let { offset: a } = n, o = vt2(t.slice(0, a)) + r, l = Ar2(o, e, { ...i, shouldParseFrontMatter: false }, s);
  l.sourceSpan = new p(n, I2(0, l.children, -1).sourceSpan.end);
  let c = l.children[0];
  return c.length === a ? l.children.shift() : (c.sourceSpan = new p(c.sourceSpan.start.moveBy(a), c.sourceSpan.end), c.value = c.value.slice(a)), l;
}
function Ar2(e, t, r, n = {}) {
  let { frontMatter: i, content: s } = r.shouldParseFrontMatter ? Qt2(e) : { content: e }, a = new rt2(e, n.filepath), o = new De2(a, 0, 0, 0), l = o.moveBy(e.length), { parseOptions: c, rootNodes: u } = t(s, r), d = { kind: "root", sourceSpan: new p(o, l), children: u }, _;
  if (i) {
    let [f, g2] = [i.start, i.end].map((v2) => new De2(a, v2.index, v2.line - 1, v2.column));
    _ = { ...i, kind: "frontMatter", sourceSpan: new p(f, g2) };
  }
  return Xi(d, _, c, (f, g2) => Ho2(t, e, f, g2, c, n));
}
var Vt2 = Bt2({ name: "html", normalizeTagName: true, normalizeAttributeName: true, allowHtmComponentClosingTags: true });
function st2(e) {
  let t = Bt2(e), r = t.name === "vue" ? Ji : Lr2;
  return { parse: (n, i) => Ar2(n, r, t, i), hasPragma: Jn2, hasIgnorePragma: Zn2, astFormat: "html", locStart: F, locEnd: Z2 };
}
var Fo2 = st2(Vt2);
var Vo2 = /* @__PURE__ */ new Set(["mj-style", "mj-raw"]);
var Uo2 = st2({ ...Vt2, name: "mjml", shouldParseAsRawText: (e) => Vo2.has(e) });
var Wo2 = st2({ name: "angular", tokenizeAngularBlocks: true, tokenizeAngularLetDeclaration: true, allowStartTagComments: true });
var zo2 = st2({ name: "vue", isTagNameCaseSensitive: true, shouldParseAsRawText(e, t, r, n) {
  return e.toLowerCase() !== "html" && !r && (e !== "template" || n.some(({ name: i, value: s }) => i === "lang" && s !== "html" && s !== "" && s !== void 0));
} });
var Go2 = st2({ name: "lwc", canSelfClose: false });
var $o2 = { html: Vi2 };

// client/utils/blogRteCodePane.ts
var VOID_TAGS = /* @__PURE__ */ new Set([
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
function formatHtmlWithPrettier(source) {
  const input = String(source ?? "");
  if (!input.trim()) return input;
  try {
    return Pu(input, {
      parser: "html",
      plugins: [html_exports],
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      htmlWhitespaceSensitivity: "ignore"
    });
  } catch {
    return beautifyHtml(input);
  }
}
function beautifyHtml(html) {
  const raw = String(html ?? "").replace(/\r\n/g, "\n");
  const tokens = raw.split(/(<[^>]+>)/g).filter((t) => t.length);
  const indent = "  ";
  let depth = 0;
  const lines = [];
  let textBuf = "";
  const flushText = () => {
    const t = textBuf.replace(/\s+/g, " ").trim();
    if (t) lines.push(`${indent.repeat(depth)}${t}`);
    textBuf = "";
  };
  for (const token of tokens) {
    if (!token.startsWith("<")) {
      textBuf += token;
      continue;
    }
    flushText();
    const tag = token.match(/^<\/?([a-zA-Z0-9:-]+)/);
    const name = tag?.[1]?.toLowerCase() || "";
    const isClose = token.startsWith("</");
    const isSelfClose = /\/>$/.test(token) || VOID_TAGS.has(name);
    const isOpen = !isClose && !isSelfClose && !token.startsWith("<!") && !token.startsWith("<?");
    if (isClose) depth = Math.max(0, depth - 1);
    lines.push(`${indent.repeat(depth)}${token.trim()}`);
    if (isOpen) depth += 1;
  }
  flushText();
  return `${lines.join("\n").trim()}
`;
}
function updateCursorMeta(el, metaEl) {
  if (!metaEl) return;
  const pos = el.selectionStart ?? 0;
  const before = el.value.slice(0, pos);
  const lines = before.split("\n");
  const line = lines.length;
  const col = (lines[lines.length - 1]?.length ?? 0) + 1;
  metaEl.textContent = `Ln ${line}, Col ${col}`;
}
function scrollSelectionIntoView(el, index) {
  const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 18;
  el.scrollTop = (el.value.slice(0, index).split("\n").length - 1) * lineHeight;
}
function findMatchIndices(haystack, needle) {
  const indices = [];
  if (!needle) return indices;
  let pos = 0;
  while (true) {
    const idx = haystack.indexOf(needle, pos);
    if (idx === -1) break;
    indices.push(idx);
    pos = idx + needle.length;
  }
  return indices;
}
function setupBlogRteCodePane(wrap, codeEl, options = {}) {
  const shell = codeEl.closest(".pa-rte-code-shell");
  const metaEl = shell?.querySelector(".pa-rte-code-meta");
  const searchBar = shell?.querySelector("#blogWsCodeSearch");
  const searchInput = shell?.querySelector("#blogWsCodeSearchInput");
  const searchStatus = shell?.querySelector("#blogWsCodeSearchStatus");
  const searchToggleBtn = shell?.querySelector('[data-code-action="search-toggle"]');
  codeEl.classList.add("pa-rte-code-pane--wrap");
  const notify = () => {
    updateCursorMeta(codeEl, metaEl);
    options.onChange?.();
  };
  const applyFormat = () => {
    codeEl.value = formatHtmlWithPrettier(codeEl.value);
    notify();
  };
  const applyBeautify = () => {
    codeEl.value = beautifyHtml(codeEl.value);
    notify();
  };
  const setSearchStatus = (message, kind = "") => {
    if (!searchStatus) return;
    searchStatus.textContent = message;
    searchStatus.classList.remove("is-error", "is-match");
    if (kind) searchStatus.classList.add(kind);
  };
  const isSearchOpen = () => searchBar && !searchBar.hidden;
  const setSearchOpen = (open2) => {
    if (!searchBar) return;
    searchBar.hidden = !open2;
    searchToggleBtn?.classList.toggle("is-active", open2);
    searchToggleBtn?.setAttribute("aria-expanded", open2 ? "true" : "false");
    if (open2) {
      window.requestAnimationFrame(() => searchInput?.focus());
    } else {
      setSearchStatus("");
    }
  };
  const selectMatchAt = (index, query, total, ordinal) => {
    codeEl.focus();
    codeEl.selectionStart = index;
    codeEl.selectionEnd = index + query.length;
    scrollSelectionIntoView(codeEl, index);
    if (total > 0) {
      setSearchStatus(`${ordinal} of ${total}`, "is-match");
    }
  };
  const runSearch = (direction) => {
    const query = (searchInput?.value ?? "").trim();
    if (!query) {
      setSearchStatus("Enter text to search", "is-error");
      searchInput?.focus();
      return;
    }
    const indices = findMatchIndices(codeEl.value, query);
    if (!indices.length) {
      setSearchStatus("No matches", "is-error");
      return;
    }
    const caret = codeEl.selectionStart ?? 0;
    const selEnd = codeEl.selectionEnd ?? 0;
    let index = indices[0];
    if (direction === "next") {
      const next = indices.find((idx) => idx >= selEnd);
      index = next !== void 0 ? next : indices[0];
    } else {
      const prev = [...indices].reverse().find((idx) => idx < caret);
      index = prev !== void 0 ? prev : indices[indices.length - 1];
    }
    const ordinal = indices.indexOf(index) + 1;
    selectMatchAt(index, query, indices.length, ordinal);
  };
  searchInput?.addEventListener("input", () => {
    setSearchStatus("");
  });
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setSearchOpen(false);
      codeEl.focus();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch(e.shiftKey ? "prev" : "next");
    }
  });
  shell?.querySelectorAll("[data-code-search]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const action = btn.getAttribute("data-code-search");
      if (action === "close") {
        setSearchOpen(false);
        codeEl.focus();
        return;
      }
      if (action === "prev") runSearch("prev");
      if (action === "next") runSearch("next");
    });
  });
  shell?.querySelectorAll("[data-code-action]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const action = btn.getAttribute("data-code-action");
      if (action === "format") applyFormat();
      else if (action === "beautify") applyBeautify();
      else if (action === "search-toggle") {
        setSearchOpen(!isSearchOpen());
      }
      notify();
    });
  });
  codeEl.addEventListener("keydown", (e) => {
    if (!wrap.classList.contains("pa-rte--code-mode")) return;
    const mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    if (e.key === "f" && !e.shiftKey) {
      e.preventDefault();
      setSearchOpen(true);
      if (searchInput?.value.trim()) runSearch("next");
      return;
    }
    if (e.shiftKey && (e.key === "F" || e.key === "f")) {
      e.preventDefault();
      applyFormat();
    }
  });
  codeEl.addEventListener("input", notify);
  codeEl.addEventListener("click", notify);
  codeEl.addEventListener("keyup", notify);
  codeEl.addEventListener("select", notify);
  wrap.addEventListener("pa-rte-code-refresh-meta", () => updateCursorMeta(codeEl, metaEl));
}

// client/utils/blogRte.ts
function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function insertBlogImageHtml(body, url, alt = "") {
  if (!body || !url) return;
  body.focus();
  const html = `<figure class="pa-rte-figure"><img src="${escapeAttr(url)}" alt="${escapeAttr(alt)}" loading="lazy" /></figure><p><br></p>`;
  document.execCommand("insertHTML", false, html);
}
function syncCodeFromVisual(body, codeEl) {
  if (!codeEl || !body) return;
  codeEl.value = getRteHtml(body);
}
function syncVisualFromCode(body, codeEl) {
  if (!codeEl || !body) return;
  setRteHtml(body, codeEl.value);
}
function getPreviewPane(wrap, previewPaneId) {
  if (previewPaneId) return document.getElementById(previewPaneId);
  return wrap.querySelector(".pa-rte-preview-pane");
}
function refreshPreviewPane(body, codeEl, onRefreshPreview) {
  syncCodeFromVisual(body, codeEl);
  onRefreshPreview?.();
}
function setRteEditorMode(wrap, body, codeEl, mode, options = {}) {
  wrap.querySelectorAll(".pa-rte-mode-btn").forEach((btn) => {
    const m2 = btn.getAttribute("data-rte-mode");
    const active = m2 === mode;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
  const toolbar = wrap.querySelector(".pa-rte-toolbar");
  const previewEl = getPreviewPane(wrap, options.previewPaneId);
  wrap.classList.remove("pa-rte--code-mode", "pa-rte--preview-mode");
  const codeShell = codeEl?.closest(".pa-rte-code-shell");
  if (mode === "preview") {
    syncCodeFromVisual(body, codeEl);
    body.hidden = true;
    if (codeShell) codeShell.hidden = true;
    if (codeEl) {
      codeEl.classList.remove("is-active");
    }
    if (previewEl) {
      previewEl.hidden = false;
      refreshPreviewPane(body, codeEl, options.onRefreshPreview);
    }
    toolbar?.setAttribute("hidden", "");
    wrap.classList.add("pa-rte--preview-mode");
    return;
  }
  if (previewEl) previewEl.hidden = true;
  if (mode === "code") {
    syncCodeFromVisual(body, codeEl);
    body.hidden = true;
    if (codeShell) codeShell.hidden = false;
    if (codeEl) {
      codeEl.classList.add("is-active");
    }
    toolbar?.setAttribute("hidden", "");
    wrap.classList.add("pa-rte--code-mode");
    wrap.dispatchEvent(new CustomEvent("pa-rte-code-refresh-meta"));
    codeEl?.focus();
    return;
  }
  if (codeShell) codeShell.hidden = true;
  syncVisualFromCode(body, codeEl);
  if (codeEl) {
    codeEl.classList.remove("is-active");
  }
  body.hidden = false;
  toolbar?.removeAttribute("hidden");
  body.focus();
}
function handleBlogPaste(e, body) {
  const html = e.clipboardData?.getData("text/html")?.trim();
  const text = e.clipboardData?.getData("text/plain")?.trim();
  e.preventDefault();
  body.focus();
  if (html) {
    document.execCommand("insertHTML", false, html);
  } else if (text) {
    document.execCommand("insertText", false, text);
  }
}
function runRteCommand(body, wrap, btn) {
  body.focus();
  const cmd = btn.dataset.cmd;
  if (!cmd) return;
  if (cmd === "createLink") {
    const sel = window.getSelection();
    const range = sel?.rangeCount ? sel.getRangeAt(0) : null;
    let existing = "";
    if (range) {
      let node = range.commonAncestorContainer;
      if (node?.nodeType === 3) node = node.parentElement;
      const anchor = node?.closest?.("a");
      if (anchor && body.contains(anchor)) {
        existing = anchor.getAttribute("href") || "";
      }
    }
    void promptUrl({
      defaultValue: existing,
      title: existing ? "Edit link" : "Insert link",
      confirmLabel: existing ? "Save link" : "Insert link"
    }).then((url) => {
      if (url === null) return;
      if (!url) {
        document.execCommand("unlink", false, null);
      } else if (range && !range.collapsed) {
        document.execCommand("createLink", false, url);
      } else {
        document.execCommand(
          "insertHTML",
          false,
          `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeAttr(url)}</a>`
        );
      }
      updateRteButtonStates(wrap);
    });
    return;
  }
  if (cmd === "formatBlock") {
    const tag = btn.dataset.value || "p";
    document.execCommand("formatBlock", false, tag);
  } else {
    document.execCommand(cmd, false, null);
  }
  updateRteButtonStates(wrap);
}
function ensureRteFullscreenButton(wrap, body) {
  const toolbar = wrap.querySelector(".pa-rte-toolbar");
  if (!toolbar || toolbar.querySelector(".pa-rte-fullscreen-wrap")) return;
  const group = document.createElement("div");
  group.className = "pa-rte-fullscreen-wrap";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "pa-rte-btn pa-rte-fullscreen-btn";
  btn.title = "Full screen";
  btn.setAttribute("aria-label", "Full screen");
  btn.innerHTML = '<i class="ri-fullscreen-line"></i>';
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const active = !wrap.classList.contains("pa-rte--fullscreen");
    wrap.classList.toggle("pa-rte--fullscreen", active);
    document.body.classList.toggle("pa-rte-fullscreen-active", active);
    btn.innerHTML = active ? '<i class="ri-fullscreen-exit-line"></i>' : '<i class="ri-fullscreen-line"></i>';
    if (active) body.focus();
  });
  group.appendChild(btn);
  toolbar.appendChild(group);
}
function setupBlogPostRte(wrapId, bodyId, codeId, options = {}) {
  const wrap = document.getElementById(wrapId);
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId);
  if (!wrap || !body) return;
  wrap.classList.add("pa-rte--blog-pro");
  ensureRteFullscreenButton(wrap, body);
  wrap.querySelectorAll(".pa-rte-mode-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const mode = btn.getAttribute("data-rte-mode");
      if (mode === "editor" || mode === "code" || mode === "preview") {
        setRteEditorMode(wrap, body, codeEl, mode, options);
      }
    });
  });
  wrap.querySelectorAll(".pa-rte-btn[data-cmd]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      runRteCommand(body, wrap, btn);
    });
  });
  const imageBtn = wrap.querySelector('[data-rte-action="insertImage"]');
  if (imageBtn && options.onInsertImage) {
    imageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      options.onInsertImage?.();
    });
  }
  body.addEventListener("keyup", () => updateRteButtonStates(wrap));
  body.addEventListener("mouseup", () => updateRteButtonStates(wrap));
  body.addEventListener("input", () => syncCodeFromVisual(body, codeEl));
  body.addEventListener("paste", (e) => handleBlogPaste(e, body));
  if (codeEl) {
    setupBlogRteCodePane(wrap, codeEl, {
      onChange: () => {
        if (!wrap.classList.contains("pa-rte--code-mode")) return;
        options.onRefreshPreview?.();
      }
    });
  }
  setRteEditorMode(wrap, body, codeEl, "editor", options);
}
function getBlogRteHtml(bodyId, codeId, wrapId) {
  const wrap = document.getElementById(wrapId);
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId);
  if (wrap?.classList.contains("pa-rte--code-mode") && codeEl) {
    return codeEl.value.trim();
  }
  return getRteHtml(body);
}
function setBlogRteHtml(bodyId, codeId, wrapId, html) {
  const body = document.getElementById(bodyId);
  const codeEl = document.getElementById(codeId);
  const wrap = document.getElementById(wrapId);
  setRteHtml(body, html);
  if (codeEl) codeEl.value = html || "";
  if (wrap && wrap.classList.contains("pa-rte--code-mode") && body && codeEl) {
    syncVisualFromCode(body, codeEl);
  }
}

// client/utils/blogSectionVisibility.ts
function collectSectionTargetsFromHtml(html) {
  const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
  const root = doc.body;
  const items = [];
  const seen = /* @__PURE__ */ new Set();
  root.querySelectorAll("section[id]").forEach((section) => {
    const id = section.getAttribute("id");
    if (!id || seen.has(id)) return;
    const title = section.querySelector("h2")?.textContent?.trim() || section.querySelector("h3")?.textContent?.trim() || id;
    items.push({ id, title });
    seen.add(id);
  });
  root.querySelectorAll("[data-bd-segment-id]").forEach((node) => {
    const id = node.getAttribute("data-bd-segment-id");
    if (!id || seen.has(id)) return;
    const title = node.getAttribute("data-bd-segment-title") || node.querySelector(".stat-value")?.textContent?.trim() || id;
    items.push({ id, title });
    seen.add(id);
  });
  return items;
}
function normalizeHiddenSectionIds(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const raw of list) {
    const id = String(raw || "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}
function pruneHiddenSections(hiddenSections, validIds) {
  const valid = validIds instanceof Set ? validIds : new Set(validIds || []);
  return normalizeHiddenSectionIds(hiddenSections).filter((id) => valid.has(id));
}

// client/utils/blogContentPayload.ts
var BLOG_DETAIL_TEMPLATE_META = [
  { id: "auto", label: "Auto", description: "Detect from sections and blocks (default)." },
  { id: "standard", label: "Standard", description: "Full layout \u2014 TOC left, article center, sidebar right." },
  { id: "minimal", label: "Minimal", description: "Centered article only \u2014 no sidebars." },
  { id: "case-study", label: "Case study", description: "Stronger hero and emphasis on stats and grids." },
  { id: "longform", label: "Longform", description: "TOC on the left \u2014 no right sidebar." }
];
function getBlogDetailTemplateLabel(templateId) {
  const id = String(templateId || "auto").trim() || "auto";
  const meta = BLOG_DETAIL_TEMPLATE_META.find((m2) => m2.id === id);
  return meta?.label || id;
}
function resolvePostDetailTemplate(post) {
  if (post?.detailTemplate) return String(post.detailTemplate);
  if (post?.content) {
    return extractBlogAdminFields(post.content).detailTemplate || "auto";
  }
  return "auto";
}
var TEMPLATE_IDS = /* @__PURE__ */ new Set(["standard", "minimal", "case-study", "longform"]);
function parseContentField(raw) {
  if (!raw || !String(raw).trim()) return { content: [], detailTemplate: void 0 };
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { content: parsed };
    if (parsed && typeof parsed === "object") {
      const blocks = parsed.content ?? parsed.sections ?? parsed.blocks;
      return {
        content: Array.isArray(blocks) ? blocks : [],
        detailTemplate: typeof parsed.detailTemplate === "string" ? parsed.detailTemplate : void 0,
        hiddenSections: Array.isArray(parsed.hiddenSections) ? normalizeHiddenSectionIds(parsed.hiddenSections) : void 0
      };
    }
  } catch {
  }
  const text = String(raw).trim();
  return {
    content: [
      {
        type: "section",
        id: "content",
        title: "Article",
        figureFirst: false,
        blocks: [{ type: "p", text }]
      }
    ]
  };
}
function extractHtmlFromBlocks(blocks) {
  const parts = [];
  for (const block of blocks || []) {
    if (!block) continue;
    if (block.type === "section" && Array.isArray(block.blocks)) {
      for (const inner of block.blocks) {
        if (inner?.type === "p" && inner.text) parts.push(inner.text);
      }
    } else if (block.type === "p" && block.text) {
      parts.push(block.text);
    }
  }
  return parts.join("");
}
function extractBlogAdminFields(raw) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return { html: "", detailTemplate: "auto" };
  const parsed = parseContentField(trimmed);
  const html = extractHtmlFromBlocks(parsed.content);
  const hiddenSections = parsed.hiddenSections || [];
  if (parsed.detailTemplate && TEMPLATE_IDS.has(parsed.detailTemplate)) {
    return { html, detailTemplate: parsed.detailTemplate, hiddenSections };
  }
  if (html) return { html, detailTemplate: "auto", hiddenSections };
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return { html: trimmed, detailTemplate: "auto", hiddenSections };
  }
  return { html, detailTemplate: "auto", hiddenSections };
}
function serializeBlogContentForStorage(html, detailTemplate, hiddenSections) {
  const choice = String(detailTemplate || "auto").trim();
  const payload = {
    content: [
      {
        type: "section",
        id: "content",
        title: "Article",
        figureFirst: false,
        blocks: [{ type: "p", text: html }]
      }
    ]
  };
  if (choice !== "auto" && TEMPLATE_IDS.has(choice)) {
    payload.detailTemplate = choice;
  }
  const hidden = normalizeHiddenSectionIds(hiddenSections);
  if (hidden.length) payload.hiddenSections = hidden;
  return JSON.stringify(payload);
}
function normalizeBlogContentJsonEditor(raw, detailTemplate) {
  const parsed = parseContentField(raw);
  const choice = String(detailTemplate || "auto").trim();
  const payload = { content: parsed.content || [] };
  const tpl = parsed.detailTemplate && TEMPLATE_IDS.has(parsed.detailTemplate) ? parsed.detailTemplate : choice !== "auto" && TEMPLATE_IDS.has(choice) ? choice : void 0;
  if (tpl) payload.detailTemplate = tpl;
  const hidden = normalizeHiddenSectionIds(parsed.hiddenSections);
  if (hidden.length) payload.hiddenSections = hidden;
  return JSON.stringify(payload);
}
function prepareBlogContentForStorageClient(raw, detailTemplate, hiddenSections) {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) return serializeBlogContentForStorage("", detailTemplate, hiddenSections);
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = parseContentField(trimmed);
      if (parsed.content?.length) {
        const mergedHidden = hiddenSections !== void 0 ? normalizeHiddenSectionIds(hiddenSections) : parsed.hiddenSections;
        const json = normalizeBlogContentJsonEditor(trimmed, detailTemplate);
        if (mergedHidden?.length) {
          const obj = JSON.parse(json);
          obj.hiddenSections = mergedHidden;
          return JSON.stringify(obj);
        }
        return json;
      }
    } catch {
    }
  }
  return serializeBlogContentForStorage(trimmed, detailTemplate, hiddenSections);
}

// client/utils/paBlogCard.ts
function getBlogStatusClass(status) {
  return (status || "Draft") === "Published" ? "published" : "draft";
}
function blogTagsHtml(tags, maxVisible = 4) {
  const list = Array.isArray(tags) ? tags : [];
  const visible = list.slice(0, maxVisible);
  const extra = list.length - visible.length;
  let html = visible.map((t) => `<span class="pa-proj-tech pa-proj-tech--blue">${escapeHtml(t)}</span>`).join("");
  if (extra > 0) html += `<span class="pa-proj-tech pa-proj-tech--more">+${extra}</span>`;
  return html;
}
function renderCardMenu(p2, idAttr) {
  const id = p2.id;
  const title = escapeHtml(p2.title);
  return `<div class="pa-card-menu" ${idAttr}="${id}">
    <div class="pa-card-menu-item" data-action="duplicate" ${idAttr}="${id}"><i class="ri-file-copy-line"></i> Duplicate</div>
    <div class="pa-card-menu-item" data-action="copy-slug" ${idAttr}="${id}"><i class="ri-links-line"></i> Copy slug URL</div>
  </div>`;
}
function renderActions(p2, idAttr) {
  const id = p2.id;
  const title = escapeHtml(p2.title);
  return `<button type="button" class="pa-action-btn pa-action-edit" title="Edit post" ${idAttr}="${id}" aria-label="Edit ${title}"><i class="ri-pencil-line"></i></button>
    <button type="button" class="pa-action-btn pa-action-delete" title="Delete post" ${idAttr}="${id}" aria-label="Delete ${title}"><i class="ri-delete-bin-line"></i></button>`;
}
function blogTemplateBadgeHtml(post) {
  const id = resolvePostDetailTemplate(post);
  const label = getBlogDetailTemplateLabel(id);
  return `<span class="pa-blog-tpl-badge" data-tpl="${escapeHtml(id)}" title="Detail page template">${escapeHtml(label)}</span>`;
}
function formatEngagementShort(engagement) {
  if (!engagement) return "";
  const parts = [];
  if (engagement.likes) parts.push(`${engagement.likes} likes`);
  if (engagement.comments) parts.push(`${engagement.comments} comments`);
  if (engagement.pending) parts.push(`${engagement.pending} pending`);
  return parts.join(" \xB7 ");
}
function engagementMetaHtml(engagement) {
  if (!engagement) return "";
  const likes = engagement.likes ?? 0;
  const comments = engagement.comments ?? 0;
  const pending = engagement.pending ?? 0;
  if (!likes && !comments && !pending) return "";
  const pendingBadge = pending ? `<span class="pa-blog-engagement-pending">${pending} pending</span>` : "";
  return `<div class="pa-proj-card__meta-item">
      <i class="ri-thumb-up-line" aria-hidden="true"></i>
      <span class="pa-proj-card__meta-label">Engagement</span>
      <span class="pa-proj-card__meta-value">${likes} likes \xB7 ${comments} comments ${pendingBadge}</span>
    </div>`;
}
function renderMeta(p2, engagement) {
  const published = formatDate(p2.publishedAt || p2.createdAt);
  const slug = escapeHtml(p2.slug || "\u2014");
  const tagCount = Array.isArray(p2.tags) ? p2.tags.length : 0;
  return `<div class="pa-proj-card__meta-item">
      <i class="ri-calendar-line" aria-hidden="true"></i>
      <span class="pa-proj-card__meta-label">Published</span>
      <span class="pa-proj-card__meta-value">${escapeHtml(published)}</span>
    </div>
    <div class="pa-proj-card__meta-item">
      <i class="ri-link" aria-hidden="true"></i>
      <span class="pa-proj-card__meta-label">Slug</span>
      <span class="pa-proj-card__meta-value">${slug}</span>
    </div>
    <div class="pa-proj-card__meta-item">
      <i class="ri-price-tag-3-line" aria-hidden="true"></i>
      <span class="pa-proj-card__meta-label">Tags</span>
      <span class="pa-proj-card__meta-value">${tagCount}</span>
    </div>
    <div class="pa-proj-card__meta-item">
      <i class="ri-layout-line" aria-hidden="true"></i>
      <span class="pa-proj-card__meta-label">Template</span>
      <span class="pa-proj-card__meta-value">${blogTemplateBadgeHtml(p2)}</span>
    </div>
    <div class="pa-proj-card__meta-item pa-proj-card__meta-item--demo">
      <i class="ri-article-line" aria-hidden="true"></i>
      <span class="pa-proj-card__meta-label">Status</span>
      <span class="pa-proj-card__meta-value">${escapeHtml(p2.status || "Draft")}</span>
    </div>
    ${engagementMetaHtml(engagement)}`;
}
function renderPaBlogListRow(p2, opts = {}) {
  const {
    meta = { label: p2.category, cls: "" },
    thumbHtml = "",
    rowIndex,
    cardClass = "",
    idAttr = "data-blog-id",
    engagement = null
  } = opts;
  const title = p2.title || "";
  const category = meta.label || p2.category || "\u2014";
  const engShort = formatEngagementShort(engagement);
  const categoryCell = engShort ? `${category} \u2014 ${engShort}` : category;
  const templateCell = blogTemplateBadgeHtml(p2);
  const created = formatDate(p2.publishedAt || p2.createdAt);
  const statusLabel = p2.status || "Draft";
  const variant = getBlogStatusClass(p2.status) === "published" ? "active" : "planning";
  const thumbInner = thumbHtml || '<i class="ri-article-line"></i>';
  const actions = `${listActionBtn("pa-action-edit", "ri-pencil-line", "Edit post", idAttr, p2.id, "Edit")}
    ${listActionBtn("pa-action-delete", "ri-delete-bin-line", "Delete post", idAttr, p2.id, "Delete")}`;
  return `${renderListRowStart(cardClass)}
    ${renderListIndexCell(rowIndex)}
    ${renderListProjectCell(title, thumbInner)}
    ${renderListTextCell(categoryCell)}
    <td class="pa-lv-col-tpl">${templateCell}</td>
    ${renderListStatusCell(statusLabel, variant)}
    ${renderListDateCell(created)}
    ${renderListActionsCell(actions)}
  ${closeListRow()}`;
}
function renderPaBlogCard(p2, opts = {}) {
  const {
    meta = { label: p2.category, cls: "" },
    thumbHtml,
    bulkCheckbox = "",
    cardClass = "",
    animationDelay = 0,
    idAttr = "data-blog-id",
    engagement = null
  } = opts;
  const id = p2.id;
  const title = escapeHtml(p2.title);
  const category = escapeHtml(meta.label || p2.category || "\u2014");
  const desc = escapeHtml(p2.excerpt || "");
  const statusClass = getBlogStatusClass(p2.status);
  const statusLabel = p2.status || "Draft";
  const featuredBadge = p2.featured ? '<span class="pa-proj-card__featured"><i class="ri-star-fill"></i> FEATURED</span>' : "";
  const statusBadge = `<span class="pa-proj-card__status pa-proj-card__status--${statusClass}"><span class="pa-proj-card__status-dot" aria-hidden="true"></span>${escapeHtml(statusLabel)}</span>`;
  const tagsHtml = blogTagsHtml(p2.tags);
  const metaHtml = renderMeta(p2, engagement);
  const actionsHtml = renderActions(p2, idAttr);
  const menuHtml = renderCardMenu(p2, idAttr);
  const catKey = escapeHtml(normalizeCategoryKey(meta.catKey || p2.category));
  return `<div class="pa-card pa-proj-card pa-blog-card${cardClass}" ${idAttr}="${id}" data-cat-key="${catKey}" style="animation-delay:${animationDelay}ms;">
    ${bulkCheckbox}
    <div class="pa-proj-card__grid">
      <div class="pa-proj-card__thumb">
        <div class="pa-proj-card__thumb-inner">${thumbHtml}</div>
        ${featuredBadge}
        ${statusBadge}
      </div>
      <div class="pa-proj-card__body">
        <div class="pa-proj-card__head">
          <div class="pa-proj-card__title-wrap">
            <span class="pa-proj-card__type-icon" aria-hidden="true"><i class="ri-article-line"></i></span>
            <div class="pa-proj-card__title-block">
              <h3 class="pa-proj-card__title" title="${title}">${title}</h3>
              <div class="pa-proj-card__category"><i class="ri-price-tag-3-line"></i> ${category}</div>
              <div class="pa-proj-card__template">${blogTemplateBadgeHtml(p2)}</div>
            </div>
          </div>
          <div class="pa-proj-card__head-more">
            <button type="button" class="pa-action-btn pa-action-more" ${idAttr}="${id}" title="More options" aria-label="More options for ${title}"><i class="ri-more-2-fill"></i></button>
            ${menuHtml}
          </div>
        </div>
        <p class="pa-proj-card__desc">${desc}</p>
        <div class="pa-proj-card__tags">${tagsHtml}</div>
        <div class="pa-proj-card__meta">${metaHtml}</div>
        <div class="pa-proj-card__footer">
          <div class="pa-proj-card__actions">${actionsHtml}</div>
        </div>
      </div>
    </div>
    <div class="pa-proj-card__list">
      <div class="pa-proj-card__list-thumb">
        <div class="pa-proj-card__thumb-inner">${thumbHtml}</div>
        ${featuredBadge}
      </div>
      <div class="pa-proj-card__list-main">
        <div class="pa-proj-card__list-top">
          <div class="pa-proj-card__title-block">
            <h3 class="pa-proj-card__title" title="${title}">${title}</h3>
            <div class="pa-proj-card__category"><i class="ri-price-tag-3-line"></i> ${category}</div>
            <div class="pa-proj-card__template">${blogTemplateBadgeHtml(p2)}</div>
          </div>
          <div class="pa-proj-card__list-status-wrap">
            ${statusBadge}
            <div class="pa-proj-card__list-more">
              <button type="button" class="pa-action-btn pa-action-more" ${idAttr}="${id}" title="More options" aria-label="More options for ${title}"><i class="ri-more-2-fill"></i></button>
              ${menuHtml}
            </div>
          </div>
        </div>
        <p class="pa-proj-card__desc">${desc}</p>
        <div class="pa-proj-card__tags">${tagsHtml}</div>
      </div>
      <div class="pa-proj-card__list-meta">${metaHtml}</div>
      <div class="pa-proj-card__list-actions">${actionsHtml}</div>
    </div>
  </div>`;
}

// client/data/blogDetailEditorTemplates.ts
var BLOG_DETAIL_EDITOR_TEMPLATES = {
  standard: {
    id: "standard",
    label: "Standard",
    bodyHtml: `
<section id="introduction">
  <h2>Introduction</h2>
  <p>Open with the problem your readers face and what this article will help them achieve on a production portfolio blog.</p>
  <p>Keep paragraphs short \u2014 the standard layout uses a left table of contents and a right sidebar on the live site.</p>
</section>
<div class="stat-box">
  <div class="stat-icon"><i class="ri-flashlight-line"></i></div>
  <div>
    <div class="stat-value">60%</div>
    <p class="stat-text">Example metric \u2014 replace with a real result from your project or article.</p>
  </div>
</div>
<section id="core-concepts">
  <h2>Core concepts</h2>
  <p>Explain the main ideas before diving into implementation details.</p>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-route-line"></i></div>
      <h4>Route splitting</h4>
      <p>Load features on demand to shrink the initial bundle.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-speed-line"></i></div>
      <h4>Prefetching</h4>
      <p>Warm critical routes before the user navigates.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-refresh-line"></i></div>
      <h4>OnPush change detection</h4>
      <p>Reduce unnecessary template work in large apps.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-database-2-line"></i></div>
      <h4>TrackBy in lists</h4>
      <p>Stabilize DOM nodes inside <code>*ngFor</code> loops.</p>
    </div>
  </div>
</section>
<section id="comparison">
  <h2>Default vs optimized</h2>
  <div class="compare-grid">
    <div class="compare-card">
      <h3>Default strategy</h3>
      <ul class="check-list"><li>More change detection cycles</li><li>Larger initial bundle</li><li>Easier to ship quickly</li></ul>
    </div>
    <div class="compare-card">
      <h3>Optimized approach</h3>
      <ul class="check-list"><li>OnPush where safe</li><li>Lazy-loaded feature modules</li><li>Measurable LCP gains</li></ul>
    </div>
  </div>
</section>
<section id="conclusion">
  <h2>Conclusion</h2>
  <div class="quote-box"><p>Performance is a feature \u2014 measure, iterate, and document wins for your team.</p></div>
  <p>Summarize next steps and link to related posts or your contact page.</p>
</section>`.trim()
  },
  minimal: {
    id: "minimal",
    label: "Minimal",
    bodyHtml: `
<section id="overview">
  <h2>Overview</h2>
  <p>The minimal layout centers the article with no sidebars \u2014 ideal for focused tutorials and shorter posts.</p>
  <p>Use clear headings, one hero idea, and strong visual blocks sparingly.</p>
</section>
<div class="stat-box">
  <div class="stat-icon"><i class="ri-flashlight-line"></i></div>
  <div>
    <div class="stat-value">60%</div>
    <p class="stat-text">Highlight one compelling stat or outcome near the top.</p>
  </div>
</div>
<section id="key-techniques">
  <h2>Key techniques</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-code-box-line"></i></div>
      <h4>Technique one</h4>
      <p>Short description.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-layers-line"></i></div>
      <h4>Technique two</h4>
      <p>Short description.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-shield-check-line"></i></div>
      <h4>Technique three</h4>
      <p>Short description.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><i class="ri-rocket-line"></i></div>
      <h4>Technique four</h4>
      <p>Short description.</p>
    </div>
  </div>
</section>
<section id="wrap-up">
  <h2>Wrap up</h2>
  <div class="quote-box"><p>Replace this pull quote with a memorable line from your article.</p></div>
  <p>Close with a single call to action.</p>
</section>`.trim()
  },
  longform: {
    id: "longform",
    label: "Longform",
    bodyHtml: `
<section id="whats-new">
  <h2>What's New in Next.js 14</h2>
  <p>Next.js 14 brings faster builds, improved caching semantics, and a more predictable developer experience for production apps.</p>
  <div class="feature-grid feature-grid--longform">
    <div class="feature-card"><div class="feature-icon"><i class="ri-flashlight-line"></i></div><h4>Turbopack</h4><p>Up to 53% faster local server startup.</p></div>
    <div class="feature-card"><div class="feature-icon"><i class="ri-server-line"></i></div><h4>Server Actions</h4><p>Run mutations on the server without API routes.</p></div>
    <div class="feature-card"><div class="feature-icon"><i class="ri-cpu-line"></i></div><h4>Partial Prerendering</h4><p>Static shell with dynamic holes.</p></div>
    <div class="feature-card"><div class="feature-icon"><i class="ri-image-line"></i></div><h4>Image Optimization</h4><p>Smarter defaults for responsive media.</p></div>
  </div>
</section>
<section id="getting-started">
  <h2>Getting Started</h2>
  <p>Create a new project and explore the App Router with TypeScript out of the box.</p>
  <pre data-language="bash"><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
  <pre data-language="bash"><code>cd my-app &amp;&amp; npm run dev</code></pre>
</section>
<div class="stat-box stat-box--perf" data-bd-segment-id="perf-callout" data-bd-segment-title="Performance callout">
  <div class="stat-icon"><i class="ri-flashlight-line"></i></div>
  <div class="stat-box__body">
    <div class="stat-value">Next.js 14 Performance</div>
    <p class="stat-text">Build and runtime improvements across the stack.</p>
  </div>
  <div class="stat-box__metrics">
    <div><span class="stat-metric-value">2x</span><span class="stat-metric-label">Faster builds</span></div>
    <div><span class="stat-metric-value">30%</span><span class="stat-metric-label">Better runtime</span></div>
  </div>
</div>
<section id="data-fetching">
  <h2>Data Fetching &amp; Caching</h2>
  <ul class="bullet-list">
    <li>Request memoization reduces duplicate fetches.</li>
    <li>Cache tags give fine-grained revalidation control.</li>
    <li>Streaming works seamlessly with Suspense boundaries.</li>
  </ul>
</section>
<section id="server-actions">
  <h2>Server Actions</h2>
  <pre data-language="typescript"><code>export async function createPost(formData: FormData) {
  'use server'
  await db.post.create({ data: { title: String(formData.get('title')) } })
}</code></pre>
</section>
<section id="comparison">
  <h2>Next.js 13 vs 14</h2>
  <table class="bd-compare-table">
    <thead><tr><th>Feature</th><th>Next.js 13</th><th>Next.js 14</th></tr></thead>
    <tbody>
      <tr><td>Dev bundler</td><td>Webpack default</td><td>Turbopack (beta)</td></tr>
      <tr><td>Server Actions</td><td>Experimental</td><td>Stable</td></tr>
    </tbody>
  </table>
</section>
<section id="deployment">
  <h2>Deployment</h2>
  <pre data-language="bash"><code>npm run build &amp;&amp; npm run start</code></pre>
</section>`.trim()
  },
  "case-study": {
    id: "case-study",
    label: "Case study",
    bodyHtml: `
<section id="overview">
  <header class="bd-section-head">
    <h2>Project Overview</h2>
    <p class="bd-section-sub">Understanding the challenge and goals</p>
  </header>
  <p>We redesigned a high-traffic storefront to improve conversion, accessibility, and maintainability.</p>
  <div class="bd-mini-stats-grid">
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">8.4%</span><span class="bd-mini-stat-label">Conversion (before)</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">12.1%</span><span class="bd-mini-stat-label">Conversion (after)</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">3.2s</span><span class="bd-mini-stat-label">LCP (before)</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">1.4s</span><span class="bd-mini-stat-label">LCP (after)</span></div>
  </div>
  <h3 class="bd-block-label">Project Deliverables</h3>
  <div class="bd-deliverables-grid">
    <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-layout-masonry-line"></i></div><h4>UX Audit</h4><p>Heuristic review and funnel analysis.</p></div>
    <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-palette-line"></i></div><h4>UI System</h4><p>Tokens, components, and patterns.</p></div>
    <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-code-box-line"></i></div><h4>Front-end Build</h4><p>Next.js storefront implementation.</p></div>
    <div class="bd-deliverable-card"><div class="feature-icon"><i class="ri-line-chart-line"></i></div><h4>Analytics</h4><p>Event taxonomy and dashboards.</p></div>
  </div>
</section>
<section id="before-after">
  <header class="bd-section-head">
    <h2>Before vs After</h2>
    <p class="bd-section-sub">What changed in the experience</p>
  </header>
  <div class="compare-grid compare-grid--case">
    <div class="compare-card before-card compare-card--before"><h3>Before</h3><ul class="check-list"><li class="danger-item">Cluttered checkout</li><li class="danger-item">Slow mobile LCP</li></ul></div>
    <div class="compare-card after-card compare-card--after"><h3>After</h3><ul class="check-list"><li class="success-item">Streamlined checkout</li><li class="success-item">Sub-1.5s LCP</li></ul></div>
  </div>
</section>
<section id="results">
  <header class="bd-section-head">
    <h2>Results &amp; Impact</h2>
    <p class="bd-section-sub">Measurable business outcomes</p>
  </header>
  <div class="quote-box quote-box--case"><p>"The new experience paid for itself within the first quarter."</p><span class="quote-box__credit">\u2014 Product Lead</span></div>
  <div class="bd-mini-stats-grid bd-mini-stats-grid--results">
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">142%</span><span class="bd-mini-stat-label">Conversion lift</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">56%</span><span class="bd-mini-stat-label">Faster LCP</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">38%</span><span class="bd-mini-stat-label">Lower bounce</span></div>
    <div class="bd-mini-stat"><span class="bd-mini-stat-value">4.8</span><span class="bd-mini-stat-label">CSAT score</span></div>
  </div>
</section>
<section id="takeaways">
  <header class="bd-section-head">
    <h2>Key Takeaways</h2>
    <p class="bd-section-sub">Lessons for your next redesign</p>
  </header>
  <div class="bd-takeaways-grid">
    <div class="bd-takeaway"><span class="bd-takeaway-num">1</span><p>Start with analytics and funnel drop-offs.</p></div>
    <div class="bd-takeaway"><span class="bd-takeaway-num">2</span><p>Invest in a token-based system early.</p></div>
    <div class="bd-takeaway"><span class="bd-takeaway-num">3</span><p>Ship performance budgets with design specs.</p></div>
    <div class="bd-takeaway"><span class="bd-takeaway-num">4</span><p>Test checkout on real devices and networks.</p></div>
  </div>
</section>`.trim()
  }
};
function getBlogDetailEditorTemplate(id) {
  if (id === "auto" || !id) return null;
  return BLOG_DETAIL_EDITOR_TEMPLATES[id] || null;
}

// client/utils/blogDetailTemplatePreview.ts
var SHELL_CLASS = "bd-tpl-standard";
var PREVIEW_FRAME_ID = "blogWsRtePreviewFrame";
function resolveBlogDetailPreviewClass(detailTemplate) {
  if (detailTemplate && detailTemplate !== "auto") {
    return `bd-tpl-${detailTemplate}`;
  }
  return SHELL_CLASS;
}
function buildTocHtmlFromArticle(articleHtml) {
  const doc = new DOMParser().parseFromString(articleHtml || "", "text/html");
  const sections = [];
  doc.querySelectorAll("section[id]").forEach((section) => {
    const id = section.getAttribute("id") || "";
    const h2 = section.querySelector("h2");
    const title = h2?.textContent?.trim() || id;
    if (id) sections.push({ id, title });
  });
  if (!sections.length) {
    doc.querySelectorAll("h2[id]").forEach((h2) => {
      const id = h2.getAttribute("id") || "";
      const title = h2.textContent?.trim() || id;
      if (id) sections.push({ id, title });
    });
  }
  if (!sections.length) {
    doc.querySelectorAll("h2").forEach((h2, index) => {
      const title = h2.textContent?.trim() || `Section ${index + 1}`;
      const slug = title.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || `section-${index + 1}`;
      sections.push({ id: slug, title });
    });
  }
  if (!sections.length) {
    return '<span class="pa-blog-ws-preview-toc-empty">Add <code>&lt;section id="\u2026"&gt;</code> with <code>&lt;h2&gt;</code> for TOC entries.</span>';
  }
  return sections.map(
    (section, index) => `<a href="#${section.id}"><span class="toc-num">${String(index + 1).padStart(2, "0")}</span> ${section.title}</a>`
  ).join("");
}
function previewFrameDoc() {
  const frame = document.getElementById(PREVIEW_FRAME_ID);
  if (!frame) return null;
  return ensureBlogDetailPreviewFrame(frame);
}
function ensureBlogDetailPreviewFrame(frame) {
  const doc = frame.contentDocument;
  if (!doc) return null;
  if (frame.dataset.previewReady === "1") {
    return doc;
  }
  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/assets/css/styles.css" />
  <link rel="stylesheet" href="/assets/css/blog-pages.css" />
  <link rel="stylesheet" href="/vendor/remixicon/remixicon.css" />
  <style>
    body { margin: 0; padding: 12px; background: var(--bg); }
    .pa-blog-ws-rte-preview-main { margin-top: 0; }
    .pa-blog-ws-preview-sidebar-note {
      font-size: var(--fs-14);
      color: var(--gray);
      line-height: 1.45;
      margin: 0;
    }
    .pa-blog-ws-preview-toc-empty { font-size: var(--fs-12); color: var(--gray); }
  </style>
</head>
<body>
  <div class="blog-details-page bd-tpl-standard" id="blogWsRteDetailPreviewShell">
    <div class="container" style="max-width: 100%; padding: 0;">
      <div class="main-layout pa-blog-ws-rte-preview-main">
        <aside class="sidebar-left pa-blog-ws-rte-preview-aside" aria-label="Table of contents preview">
          <div class="bd-sidebar-card card-tbl-content">
            <h2 class="card-title">Table of Contents</h2>
            <nav class="toc-list" id="blogWsRtePreviewToc" aria-label="Table of contents"></nav>
          </div>
        </aside>
        <div class="article-main">
          <article class="article-content pa-blog-ws-rte-preview-article" id="blogWsRtePreview" aria-label="Article preview"></article>
        </div>
        <aside class="sidebar-right pa-blog-ws-rte-preview-aside" aria-label="Sidebar preview">
          <div class="bd-sidebar-card">
            <h2 class="card-title">Related &amp; author</h2>
            <p class="pa-blog-ws-preview-sidebar-note">Widgets and related posts render on your live portfolio detail page.</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</body>
</html>`);
  doc.close();
  frame.dataset.previewReady = "1";
  return frame.contentDocument;
}
function syncBlogDetailRtePreview({
  detailTemplate,
  articleHtml,
  shellId = "blogWsRteDetailPreviewShell",
  articleId = "blogWsRtePreview",
  tocId = "blogWsRtePreviewToc",
  layoutLabelId = "blogWsRtePreviewLayoutLabel",
  layoutLabel
}) {
  const previewDoc = previewFrameDoc();
  const root = previewDoc ?? document;
  const labelEl = document.getElementById(layoutLabelId);
  if (labelEl && layoutLabel) labelEl.textContent = layoutLabel;
  const shell = root.getElementById(shellId);
  const article = root.getElementById(articleId);
  const toc = root.getElementById(tocId);
  if (shell) {
    shell.classList.remove(
      "bd-tpl-standard",
      "bd-tpl-minimal",
      "bd-tpl-longform",
      "bd-tpl-case-study"
    );
    shell.classList.add(resolveBlogDetailPreviewClass(detailTemplate));
  }
  if (article) {
    article.innerHTML = articleHtml || "";
    enhanceCompareCheckListItems(article);
  }
  if (toc) toc.innerHTML = buildTocHtmlFromArticle(articleHtml || "");
}
function resolveCompareCardVariant(heading, index, cardCount) {
  if (heading.includes("before")) return "before";
  if (heading.includes("after")) return "after";
  if (cardCount === 2) return index === 0 ? "before" : "after";
  return null;
}
function applyCompareCardVariantClasses(card, variant) {
  if (!variant) return;
  const before = variant === "before";
  card.classList.toggle("before-card", before);
  card.classList.toggle("after-card", !before);
  card.classList.toggle("compare-card--before", before);
  card.classList.toggle("compare-card--after", !before);
}
function enhanceCompareCheckListItems(root) {
  if (!root || typeof root.querySelectorAll !== "function") return;
  const scope = root;
  scope.querySelectorAll(".compare-grid").forEach((grid) => {
    const cards = grid.querySelectorAll(".compare-card");
    cards.forEach((card, index) => {
      const heading = (card.querySelector("h3")?.textContent || "").trim().toLowerCase();
      const variant = resolveCompareCardVariant(heading, index, cards.length);
      applyCompareCardVariantClasses(card, variant);
      let itemClass = "";
      if (variant === "before") itemClass = "danger-item";
      else if (variant === "after") itemClass = "success-item";
      card.querySelectorAll(".check-list li").forEach((li3) => {
        if (li3.classList.contains("danger-item") || li3.classList.contains("success-item")) return;
        if (itemClass) li3.classList.add(itemClass);
      });
    });
  });
}

// client/modules/blog/BlogPostWorkspace.ts
var BlogPostWorkspace = class {
  constructor(blog) {
    this.wired = false;
    this.wsSlugTouched = false;
    this.wsImageData = null;
    this.wsEditorMode = "edit";
    this.wsOpenMode = "edit";
    this.closing = false;
    this.closeTimer = null;
    this.engagementPostId = null;
    this.tagInputBinding = null;
    this.detailTemplate = "auto";
    this.hiddenSections = [];
    this.blog = blog;
  }
  bind() {
    if (this.wired) return;
    const root = $id("paBlogWorkspace");
    if (!root) return;
    this.wired = true;
    setupBlogPostRte("blogWsRteWrap", "blogWsContent", "blogWsContentHtml", {
      previewPaneId: "blogWsRtePreviewWrap",
      onInsertImage: () => this.blog.insertEditorImage(),
      onRefreshPreview: () => this.syncRteTemplatePreview()
    });
    this.blog.setupImageDropzone("blogWs");
    this.blog.setupMediaPicker("blogWs");
    this.blog.on($id("paBlogWsBackBtn"), "click", () => this.close());
    this.blog.on($id("paBlogWsSaveBtn"), "click", () => {
      void this.save();
    });
    this.blog.on($id("paBlogWsSaveDraftBtn"), "click", () => {
      void this.saveAsDraft();
    });
    this.blog.on($id("paBlogWsPublishNowBtn"), "click", () => {
      void this.publishNow();
    });
    this.blog.on($id("paBlogWsCopyPreviewLinkBtn"), "click", () => {
      void this.copyPublicPreviewLink();
    });
    this.blog.on($id("paBlogWsDeleteBtn"), "click", () => this.requestDelete());
    $all("#paBlogWsModeToggle .pa-view-btn").forEach((btn) => {
      this.blog.on(btn, "click", () => {
        const mode = btn.getAttribute("data-ws-mode");
        if (mode) this.setEditorMode(mode);
      });
    });
    this.blog.on($id("blogWsTitle"), "input", (e) => {
      const el = e.target;
      this.updateTitleCount();
      if (!this.wsSlugTouched) {
        const slugEl = $id("blogWsSlug");
        if (slugEl) slugEl.value = slugify(el.value);
      }
    });
    this.blog.on($id("blogWsSlug"), "input", () => {
      this.wsSlugTouched = true;
    });
    this.blog.on($id("blogWsExcerpt"), "input", () => this.updateExcerptCount());
    this.blog.on($id("blogWsMetaTitle"), "input", () => this.updateMetaCounts());
    this.blog.on($id("blogWsMetaDesc"), "input", () => this.updateMetaCounts());
    this.tagInputBinding?.destroy();
    this.tagInputBinding = bindCommaSeparatedChipInput(
      $id("blogWsTagInput"),
      $id("blogWsTagChips")
    );
    this.blog.on($id("blogWsTagAddBtn"), "click", () => {
      this.tagInputBinding?.commit();
    });
    this.renderTemplateGrid();
    this.syncTemplatePreview();
    const sectionVisList = $id("paBlogWsSectionVisList");
    if (sectionVisList && sectionVisList.dataset.wired !== "1") {
      sectionVisList.dataset.wired = "1";
      this.blog.on(sectionVisList, "change", (e) => {
        const t = e.target;
        const input = t instanceof HTMLInputElement && t.matches("input[data-section-id]") ? t : null;
        if (!input) return;
        const id = input.getAttribute("data-section-id");
        if (!id) return;
        const set = new Set(this.hiddenSections);
        if (input.checked) set.delete(id);
        else set.add(id);
        this.hiddenSections = Array.from(set);
      });
    }
  }
  getDetailTemplate() {
    return this.detailTemplate || "auto";
  }
  getHiddenSections() {
    return [...this.hiddenSections];
  }
  renderTemplateGrid() {
    const grid = $id("paBlogWsTemplateGrid");
    if (!grid || grid.dataset.wired === "1") return;
    grid.dataset.wired = "1";
    grid.innerHTML = BLOG_DETAIL_TEMPLATE_META.map(
      (opt) => `
      <label class="pa-blog-tpl-option">
        <input type="radio" name="blogWsDetailTemplate" value="${escapeHtml(opt.id)}" />
        <span class="pa-blog-tpl-option__inner">
          <span class="pa-blog-tpl-option__label">${escapeHtml(opt.label)}</span>
          <span class="pa-blog-tpl-option__desc">${escapeHtml(opt.description)}</span>
        </span>
      </label>`
    ).join("");
    grid.querySelectorAll('input[type="radio"]').forEach((input) => {
      this.blog.on(input, "change", () => {
        const el = input;
        if (!el.checked) return;
        const previous = this.detailTemplate;
        this.maybeApplyDetailTemplateHtml(el.value, previous);
      });
    });
  }
  maybeApplyDetailTemplateHtml(templateId, previousTemplateId) {
    const commitLayout = (applyStarter, starterHtml) => {
      this.detailTemplate = templateId;
      if (applyStarter && starterHtml) {
        setBlogRteHtml("blogWsContent", "blogWsContentHtml", "blogWsRteWrap", starterHtml);
      }
      this.syncTemplatePreview();
      this.syncRteTemplatePreview();
      if (applyStarter && starterHtml) {
        const label = getBlogDetailEditorTemplate(templateId)?.label || "Template";
        this.blog.toast(`${label} template loaded \u2014 edit in Editor or Code`, "success", 2800);
      }
      if (this.wsEditorMode === "preview") this.setEditorMode("preview");
    };
    if (!templateId || templateId === "auto") {
      commitLayout(false);
      return;
    }
    const starter = getBlogDetailEditorTemplate(templateId);
    if (!starter) {
      commitLayout(false);
      return;
    }
    const html = getBlogRteHtml("blogWsContent", "blogWsContentHtml", "blogWsRteWrap");
    const plain = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
    if (!plain) {
      commitLayout(true, starter.bodyHtml);
      return;
    }
    requestConfirm({
      title: "Replace article HTML?",
      message: `Load the <strong>${escapeHtml(starter.label)}</strong> layout starter? Your current article content will be replaced.`,
      confirmLabel: "Use template",
      iconClass: "ri-layout-masonry-line",
      danger: false,
      iconTone: "warning",
      onConfirm: () => commitLayout(true, starter.bodyHtml),
      onCancel: () => this.setDetailTemplateChoice(previousTemplateId)
    });
  }
  syncRteTemplatePreview() {
    const meta = BLOG_DETAIL_TEMPLATE_META.find((m2) => m2.id === this.detailTemplate);
    const layoutLabel = this.detailTemplate === "auto" ? "Auto" : meta?.label || "Standard";
    const articleHtml = getBlogRteHtml("blogWsContent", "blogWsContentHtml", "blogWsRteWrap");
    syncBlogDetailRtePreview({
      detailTemplate: this.detailTemplate,
      articleHtml,
      layoutLabel
    });
    const headerPreview = $id("paBlogWsPreviewContent");
    if (headerPreview) headerPreview.innerHTML = articleHtml;
    this.syncTemplatePreview();
    this.syncSectionVisibilityPanel(articleHtml);
  }
  syncSectionVisibilityPanel(articleHtml) {
    const list = $id("paBlogWsSectionVisList");
    const empty = $id("paBlogWsSectionVisEmpty");
    if (!list || !empty) return;
    const html = articleHtml ?? getBlogRteHtml("blogWsContent", "blogWsContentHtml", "blogWsRteWrap");
    const targets = collectSectionTargetsFromHtml(html);
    const validIds = new Set(targets.map((t) => t.id));
    this.hiddenSections = pruneHiddenSections(this.hiddenSections, validIds);
    if (!targets.length) {
      list.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    const hiddenSet = new Set(this.hiddenSections);
    list.innerHTML = targets.map((item) => {
      const checked = !hiddenSet.has(item.id);
      return `<label class="pa-blog-ws-section-vis-item">
          <input type="checkbox" data-section-id="${escapeHtml(item.id)}" ${checked ? "checked" : ""} />
          <span class="pa-blog-ws-section-vis-title">${escapeHtml(item.title)}</span>
          <code class="pa-blog-ws-section-vis-id">#${escapeHtml(item.id)}</code>
        </label>`;
    }).join("");
  }
  setDetailTemplateChoice(value) {
    this.detailTemplate = value || "auto";
    const grid = $id("paBlogWsTemplateGrid");
    const input = grid?.querySelector(
      `input[type="radio"][value="${CSS.escape(this.detailTemplate)}"]`
    );
    if (input) input.checked = true;
    this.syncTemplatePreview();
  }
  resolvePreviewLayoutClass() {
    if (this.detailTemplate !== "auto") {
      return `bd-tpl-${this.detailTemplate}`;
    }
    return "bd-tpl-standard";
  }
  syncTemplatePreview() {
    const preview = $id("paBlogWsTemplatePreview");
    const meta = BLOG_DETAIL_TEMPLATE_META.find((m2) => m2.id === this.detailTemplate);
    const layoutLabel = $id("paBlogWsPreviewLayoutLabel");
    if (layoutLabel) {
      layoutLabel.textContent = meta?.label || "Auto";
    }
    const tplKey = this.detailTemplate === "auto" ? "auto" : this.detailTemplate;
    if (preview) preview.setAttribute("data-tpl", tplKey);
    const shell = $id("paBlogWsDetailPreviewShell");
    if (shell) {
      shell.classList.remove(
        "bd-tpl-standard",
        "bd-tpl-minimal",
        "bd-tpl-case-study",
        "bd-tpl-longform"
      );
      const cls = this.resolvePreviewLayoutClass();
      if (cls) shell.classList.add(cls);
    }
  }
  openAdd() {
    if (!canManageContent()) return;
    this.bind();
    this.wsOpenMode = "add";
    this.blog.currentEditId = null;
    this.resetForm();
    this.blog._populateCategorySelects();
    this.syncCategorySelect();
    this.setEditorMode("edit");
    this.show();
    $id("paBlogWsHeadTitleText").textContent = "Add New Post";
    $id("paBlogWsHeadSubtitle").textContent = "Create a new article for your portfolio";
    $id("paBlogWsDeleteBtn").setAttribute("hidden", "");
    this.resetEngagementUi();
    setTimeout(() => $id("blogWsTitle")?.focus(), 420);
  }
  async open(id, mode = "edit") {
    if (!canManageContent() && mode !== "preview") return;
    this.bind();
    let record = this.blog.findById(id);
    if (!record) {
      this.blog.toast("Post not found", "danger");
      return;
    }
    const contentMissing = record.content == null || String(record.content).trim() === "";
    if (contentMissing) {
      try {
        const res = await fetch(`/api/blog-posts/${encodeURIComponent(String(id))}`, {
          credentials: "same-origin",
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          const full = await res.json();
          const records = [...this.blog.store.get("records")];
          const idx = records.findIndex((p2) => String(p2.id) === String(id));
          if (idx >= 0) records[idx] = { ...records[idx], ...full };
          this.blog.store.set("records", records);
          record = this.blog.findById(id) || full;
        }
      } catch {
      }
    }
    this.wsOpenMode = mode === "preview" ? "preview" : "edit";
    this.blog.currentEditId = id;
    this.blog._populateCategorySelects();
    this.syncCategorySelect();
    this.populateForm(record);
    this.setEditorMode(mode === "preview" ? "preview" : "edit");
    this.show();
    $id("paBlogWsHeadTitleText").textContent = "Edit Post";
    $id("paBlogWsHeadSubtitle").textContent = record.slug ? `/${record.slug}` : "Update content and publishing settings";
    $id("paBlogWsDeleteBtn")?.removeAttribute("hidden");
    this.engagementPostId = id;
    void this.loadEngagement(id);
    void this.loadRevisions(id);
    if (mode !== "preview") setTimeout(() => $id("blogWsTitle")?.focus(), 420);
  }
  close() {
    const body = $id("paBlogBody");
    const ws2 = $id("paBlogWorkspace");
    if (!body || !ws2) return;
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    if (!ws2.classList.contains("is-open")) {
      this.finishClose();
      return;
    }
    if (this.closing) return;
    this.closing = true;
    ws2.classList.add("is-closing");
    ws2.classList.remove("is-open");
    body.classList.remove("pa-blog-page-body--editing");
    const finish = () => {
      if (!this.closing) return;
      this.finishClose();
    };
    ws2.addEventListener("transitionend", (e) => {
      if (e.target === ws2) finish();
    }, { once: true });
    this.closeTimer = window.setTimeout(finish, 520);
  }
  finishClose() {
    const ws2 = $id("paBlogWorkspace");
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    this.closing = false;
    if (ws2) {
      ws2.classList.remove("is-closing");
      ws2.setAttribute("aria-hidden", "true");
    }
    this.wsImageData = null;
  }
  show() {
    const body = $id("paBlogBody");
    const ws2 = $id("paBlogWorkspace");
    if (!body || !ws2) return;
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
    this.closing = false;
    ws2.classList.remove("is-closing");
    body.classList.add("pa-blog-page-body--editing");
    ws2.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ws2.classList.add("is-open");
      });
    });
    body.scrollTo?.(0, 0);
  }
  syncCategorySelect() {
    const sorted = this.blog._blogCategories || [];
    const options = sorted.map((c) => `<option value="${escapeHtml(c.key)}">${escapeHtml(c.label)}</option>`).join("");
    const select = $id("blogWsCategory");
    if (!select) return;
    select.innerHTML = '<option value="">Select category</option>' + options;
    syncPaSelect(select);
  }
  resetForm() {
    this.wsSlugTouched = false;
    this.wsImageData = null;
    ["blogWsTitle", "blogWsSlug", "blogWsExcerpt", "blogWsImageAlt", "blogWsSortOrder", "blogWsMetaTitle", "blogWsMetaDesc"].forEach((id) => {
      const el = $id(id);
      if (el) el.value = "";
    });
    setBlogRteHtml("blogWsContent", "blogWsContentHtml", "blogWsRteWrap", "");
    $id("blogWsTagChips").innerHTML = "";
    $id("blogWsTagInput").value = "";
    $id("blogWsStatus").value = "Draft";
    $id("blogWsFeatured").value = "0";
    $id("blogWsPublishedDate").value = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    $id("blogWsCommentsEnabled").value = "1";
    $id("blogWsLikesEnabled").value = "1";
    $id("blogWsCommentsAutoApprove").value = "0";
    syncPaSelect($id("blogWsCommentsEnabled"));
    syncPaSelect($id("blogWsLikesEnabled"));
    syncPaSelect($id("blogWsCommentsAutoApprove"));
    this.engagementPostId = null;
    this.resetEngagementUi();
    this.blog.setFeaturedPreview("blogWs", null);
    this.updateTitleCount();
    this.updateExcerptCount();
    this.updateMetaCounts();
    this.setDetailTemplateChoice("auto");
    this.hiddenSections = [];
    this.syncSectionVisibilityPanel("");
    this.clearFieldErrors();
  }
  populateForm(p2) {
    this.wsSlugTouched = true;
    $id("blogWsTitle").value = String(p2.title || "");
    $id("blogWsSlug").value = String(p2.slug || "");
    $id("blogWsCategory").value = String(p2.category || "");
    syncPaSelect($id("blogWsCategory"));
    $id("blogWsExcerpt").value = String(p2.excerpt || "");
    const contentRaw = String(p2.content || "");
    const extracted = extractBlogAdminFields(contentRaw);
    const html = contentRaw.startsWith("{") || contentRaw.startsWith("[") ? extracted.html : contentRaw;
    const tpl = typeof p2.detailTemplate === "string" && p2.detailTemplate ? p2.detailTemplate : extracted.detailTemplate;
    setBlogRteHtml("blogWsContent", "blogWsContentHtml", "blogWsRteWrap", html);
    this.hiddenSections = normalizeHiddenSectionIds(extracted.hiddenSections);
    this.setDetailTemplateChoice(tpl);
    this.syncRteTemplatePreview();
    populateChips($id("blogWsTagChips"), Array.isArray(p2.tags) ? p2.tags : []);
    $id("blogWsImageAlt").value = String(p2.imageAlt || "");
    $id("blogWsStatus").value = String(p2.status || "Draft");
    syncPaSelect($id("blogWsStatus"));
    $id("blogWsFeatured").value = p2.featured ? "1" : "0";
    syncPaSelect($id("blogWsFeatured"));
    $id("blogWsPublishedDate").value = String(p2.publishedAt || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    $id("blogWsSortOrder").value = p2.sortOrder != null ? String(p2.sortOrder) : "";
    $id("blogWsMetaTitle").value = String(p2.metaTitle || "");
    $id("blogWsMetaDesc").value = String(p2.metaDesc || "");
    $id("blogWsCommentsEnabled").value = p2.commentsEnabled === false ? "0" : "1";
    $id("blogWsLikesEnabled").value = p2.likesEnabled === false ? "0" : "1";
    $id("blogWsCommentsAutoApprove").value = p2.commentsAutoApprove ? "1" : "0";
    syncPaSelect($id("blogWsCommentsEnabled"));
    syncPaSelect($id("blogWsLikesEnabled"));
    syncPaSelect($id("blogWsCommentsAutoApprove"));
    this.wsImageData = p2.imageUrl || null;
    this.blog.setFeaturedPreview("blogWs", this.wsImageData, String(p2.imageAlt || ""));
    this.updateTitleCount();
    this.updateExcerptCount();
    this.updateMetaCounts();
    this.clearFieldErrors();
  }
  setEditorMode(mode) {
    this.wsEditorMode = mode;
    $all("#paBlogWsModeToggle .pa-view-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-ws-mode") === mode);
    });
    const editorPane = $id("paBlogWsEditorPane");
    const previewPane = $id("paBlogWsPreviewPane");
    if (mode === "preview") {
      if (editorPane) editorPane.hidden = true;
      if (previewPane) previewPane.hidden = false;
      this.syncRteTemplatePreview();
      this.syncTemplatePreview();
      return;
    }
    if (previewPane) previewPane.hidden = true;
    if (editorPane) editorPane.hidden = false;
    const rteWrap = $id("blogWsRteWrap");
    if (rteWrap) rteWrap.hidden = false;
  }
  updateTitleCount() {
    const el = $id("blogWsTitle");
    const count = $id("blogWsTitleCount");
    if (el && count) count.textContent = `${el.value.length}/100`;
  }
  updateExcerptCount() {
    const el = $id("blogWsExcerpt");
    const count = $id("blogWsExcerptCount");
    if (el && count) count.textContent = String(el.value.length);
  }
  updateMetaCounts() {
    const title = $id("blogWsMetaTitle");
    const desc = $id("blogWsMetaDesc");
    if (title) $id("blogWsMetaTitleCount").textContent = String(title.value.length);
    if (desc) $id("blogWsMetaDescCount").textContent = String(desc.value.length);
  }
  clearFieldErrors() {
    ["Title", "Slug", "Category", "Excerpt", "Content"].forEach((f) => {
      $id(`blogWs${f}Error`)?.classList.remove("visible");
      $id(f === "Content" ? "blogWsRteWrap" : `blogWs${f}`)?.classList.remove("error");
    });
  }
  getWsImageData() {
    return this.wsImageData;
  }
  setWsImageData(url) {
    this.wsImageData = url;
  }
  async saveAsDraft() {
    $id("blogWsStatus").value = "Draft";
    syncPaSelect($id("blogWsStatus"));
    await this.save();
  }
  async publishNow() {
    $id("blogWsStatus").value = "Published";
    syncPaSelect($id("blogWsStatus"));
    await this.save();
  }
  async save() {
    if (!canManageContent()) return;
    const f = this.blog.validateForm("ws");
    if (!f.valid) return;
    const btn = $id("paBlogWsSaveBtn");
    btn?.classList.add("loading");
    try {
      if (this.wsOpenMode === "add") {
        const newPost = this.blog.buildNewRecord(f);
        newPost.id = this.blog.nextId++;
        const records = [...this.blog.store.get("records"), newPost];
        this.blog.store.set("records", records);
        await this.blog.persist();
        await this.blog.refreshEngagementSummaries();
        this.blog.render();
        this.blog.toast("Blog post added", "success");
        this.blog.notify(`New blog post "${newPost.title}" was added.`, "ri-article-line");
        this.close();
      } else {
        const record = this.blog.findById(this.blog.currentEditId);
        if (!record) return;
        this.blog.applyEditToRecord(record, f);
        await this.blog.persist();
        await this.blog.refreshEngagementSummaries();
        this.blog.render();
        this.blog.toast("Blog post saved", "success");
        if (this.engagementPostId) void this.loadEngagement(this.engagementPostId);
        $id("paBlogWsHeadSubtitle").textContent = record.slug ? `/${record.slug}` : "";
      }
    } catch {
      this.blog.toast("Could not save changes", "danger");
    } finally {
      btn?.classList.remove("loading");
    }
  }
  requestDelete() {
    if (!canManageContent()) return;
    const id = this.blog.currentEditId;
    if (!id) return;
    const record = this.blog.findById(id);
    if (!record) return;
    requestDelete(id, this.blog.config.deleteType, this.blog.getDeleteName(record));
  }
  resetEngagementUi() {
    $id("paBlogWsLikeCount").textContent = "0";
    $id("paBlogWsCommentCount").textContent = "0";
    $id("paBlogWsPendingCount").textContent = "0";
    $id("paBlogWsPendingWrap").hidden = true;
    const badge = $id("paBlogWsEngagementBadge");
    if (badge) {
      badge.hidden = true;
      badge.textContent = "";
    }
    const list = $id("paBlogWsCommentsList");
    const empty = $id("paBlogWsCommentsEmpty");
    if (list && empty) {
      list.querySelectorAll(".pa-blog-ws-comment-item").forEach((el) => el.remove());
      empty.hidden = false;
    }
  }
  renderEngagement(data) {
    const likes = data.likeCount ?? 0;
    const comments = data.comments || [];
    const approved = comments.filter((c) => c.status === "approved").length;
    const pending = comments.filter((c) => c.status === "pending").length;
    $id("paBlogWsLikeCount").textContent = String(likes);
    $id("paBlogWsCommentCount").textContent = String(approved);
    $id("paBlogWsPendingCount").textContent = String(pending);
    $id("paBlogWsPendingWrap").hidden = pending === 0;
    const badge = $id("paBlogWsEngagementBadge");
    if (badge) {
      if (pending > 0) {
        badge.hidden = false;
        badge.textContent = `${pending} pending`;
      } else {
        badge.hidden = true;
        badge.textContent = "";
      }
    }
    const list = $id("paBlogWsCommentsList");
    const empty = $id("paBlogWsCommentsEmpty");
    if (!list || !empty) return;
    list.querySelectorAll(".pa-blog-ws-comment-item").forEach((el) => el.remove());
    if (!comments.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    const postId = this.engagementPostId;
    comments.forEach((c) => {
      const item = document.createElement("article");
      item.className = "pa-blog-ws-comment-item";
      item.dataset.commentId = c.id;
      const statusLabel = escapeHtml(c.status);
      const date = escapeHtml(new Date(c.createdAt).toLocaleString());
      const email = c.authorEmail ? `<span class="pa-blog-ws-comment-email">${escapeHtml(c.authorEmail)}</span>` : "";
      const modActions = c.status === "pending" ? `<button type="button" class="pa-btn pa-btn-cancel pa-btn-sm" data-comment-action="approve" data-comment-id="${escapeHtml(c.id)}">Approve</button>
           <button type="button" class="pa-btn pa-btn-cancel pa-btn-sm" data-comment-action="spam" data-comment-id="${escapeHtml(c.id)}">Spam</button>` : `<button type="button" class="pa-btn pa-btn-cancel pa-btn-sm" data-comment-action="reject" data-comment-id="${escapeHtml(c.id)}">Hide</button>`;
      item.innerHTML = `
        <header class="pa-blog-ws-comment-head">
          <strong>${escapeHtml(c.authorName)}</strong>${email}
          <span class="pa-blog-ws-comment-meta">${statusLabel} \xB7 ${date}</span>
        </header>
        <p class="pa-blog-ws-comment-body">${escapeHtml(c.body)}</p>
        <div class="pa-blog-ws-comment-actions">
          ${modActions}
          <button type="button" class="pa-btn pa-btn-cancel pa-btn-sm pa-blog-ws-comment-delete" data-comment-action="delete" data-comment-id="${escapeHtml(c.id)}">Delete</button>
        </div>`;
      list.appendChild(item);
    });
    if (postId) {
      $all("[data-comment-action]", list).forEach((btn) => {
        this.blog.on(btn, "click", () => {
          const action = btn.getAttribute("data-comment-action");
          const commentId = btn.getAttribute("data-comment-id");
          if (!action || !commentId) return;
          void this.moderateComment(postId, commentId, action);
        });
      });
    }
  }
  async loadEngagement(postId) {
    try {
      const res = await fetch(`/api/blog-posts/${encodeURIComponent(String(postId))}/engagement`, {
        credentials: "same-origin",
        headers: { Accept: "application/json" }
      });
      if (!res.ok) {
        this.resetEngagementUi();
        return;
      }
      const data = await res.json();
      if (data?.commentsEnabled != null) {
        $id("blogWsCommentsEnabled").value = data.commentsEnabled ? "1" : "0";
        $id("blogWsLikesEnabled").value = data.likesEnabled ? "1" : "0";
        $id("blogWsCommentsAutoApprove").value = data.commentsAutoApprove ? "1" : "0";
        syncPaSelect($id("blogWsCommentsEnabled"));
        syncPaSelect($id("blogWsLikesEnabled"));
        syncPaSelect($id("blogWsCommentsAutoApprove"));
      }
      this.renderEngagement(data);
    } catch {
      this.resetEngagementUi();
    }
  }
  async moderateComment(postId, commentId, action) {
    const statusMap = {
      approve: "approved",
      reject: "rejected",
      spam: "spam"
    };
    try {
      if (action === "delete") {
        const res2 = await fetch(
          `/api/blog-posts/${encodeURIComponent(String(postId))}/engagement?commentId=${encodeURIComponent(commentId)}`,
          { method: "DELETE", credentials: "same-origin" }
        );
        if (!res2.ok) throw new Error("delete failed");
        const payload2 = await res2.json();
        this.renderEngagement(payload2.engagement || {});
        this.blog.toast("Comment removed", "success");
        void this.blog.refreshEngagementSummaries();
        return;
      }
      const status = statusMap[action];
      if (!status) return;
      const res = await fetch(`/api/blog-posts/${encodeURIComponent(String(postId))}/engagement`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ commentId, status })
      });
      if (!res.ok) throw new Error("update failed");
      const payload = await res.json();
      this.renderEngagement(payload.engagement || {});
      this.blog.toast(action === "approve" ? "Comment approved" : "Comment updated", "success");
      void this.blog.refreshEngagementSummaries();
    } catch {
      this.blog.toast("Could not update comment", "danger");
    }
  }
  async copyPublicPreviewLink() {
    const id = this.blog.currentEditId;
    if (id == null || !canManageContent()) return;
    try {
      const res = await fetch(`/api/blog-posts/${encodeURIComponent(String(id))}/preview-token`, {
        method: "POST",
        credentials: "same-origin",
        headers: { Accept: "application/json" }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not create preview link");
      const url = data.previewUrl;
      if (!url) throw new Error("No preview URL returned");
      await navigator.clipboard.writeText(url);
      this.blog.toast("Preview API URL copied (1h)", "success");
    } catch (err) {
      this.blog.toast(err.message || "Could not copy preview link", "danger");
    }
  }
  async loadRevisions(postId) {
    const list = $id("paBlogWsRevisionsList");
    const empty = $id("paBlogWsRevisionsEmpty");
    if (!list || !empty) return;
    list.innerHTML = "";
    if (postId == null) {
      empty.hidden = false;
      return;
    }
    try {
      const res = await fetch(
        `/api/content-revisions?entityType=blog_post&legacyId=${encodeURIComponent(String(postId))}`,
        { credentials: "same-origin" }
      );
      if (!res.ok) throw new Error("load failed");
      const data = await res.json();
      const revisions = Array.isArray(data.revisions) ? data.revisions : [];
      empty.hidden = revisions.length > 0;
      list.innerHTML = revisions.map((row) => {
        const when = new Date(row.created_at).toLocaleString();
        return `<li class="pa-blog-ws-revision-item"><span>${escapeHtml(when)}</span><button type="button" class="pa-btn pa-btn-cancel" data-revision-restore="${escapeHtml(row.id)}">Restore</button></li>`;
      }).join("");
      list.querySelectorAll("[data-revision-restore]").forEach((btn) => {
        this.blog.on(btn, "click", () => {
          const id = btn.getAttribute("data-revision-restore");
          void this.restoreRevision(id);
        });
      });
    } catch {
      empty.hidden = false;
    }
  }
  async restoreRevision(revisionId) {
    if (!revisionId || !canManageContent()) return;
    if (!window.confirm("Restore this version into the editor? Click Save to persist changes.")) return;
    try {
      const res = await fetch(`/api/content-revisions/${encodeURIComponent(revisionId)}/restore`, {
        method: "POST",
        credentials: "same-origin"
      });
      if (!res.ok) throw new Error("restore failed");
      const data = await res.json();
      const id = data.legacyId ?? this.blog.currentEditId;
      if (id != null) {
        await this.open(id, "edit");
        this.blog.toast("Revision restored \u2014 review and save", "success");
      }
    } catch {
      this.blog.toast("Could not restore revision", "danger");
    }
  }
};

// client/modules/blog/BlogModule.ts
var SEED_BLOG_POSTS = [];
var wiredImageDropzones = /* @__PURE__ */ new WeakSet();
var BlogModule = class extends CrudCardModule {
  constructor() {
    super({
      name: "BlogPosts",
      storageKey: "pa_blog_posts",
      deleteType: "blogpost",
      page: "blogposts",
      pageSize: 9,
      listTable: true,
      cardIdAttr: "data-blog-id",
      defaultFilters: { category: "all" },
      filterSelectIds: [{ id: "paBlogCategoryFilter", key: "category" }],
      layout: {
        selectId: "paBlogLayout",
        singular: "post",
        plural: "posts",
        getGroupInfo(record) {
          const meta = this.getCategoryMeta(record.category);
          const key = record.category || "uncategorized";
          return {
            key,
            title: meta.label || "Uncategorized",
            icon: "ri-bookmark-line",
            href: "/admin/blog-categories",
            linkLabel: "Open"
          };
        }
      },
      addFocusId: "blogWsTitle",
      editFocusId: "blogWsTitle",
      tabGroup: null,
      bulkLabel: "post",
      ids: {
        grid: "paBlogGrid",
        resultCount: "paBlogResultCount",
        paginationBtns: "paBlogPaginationBtns",
        paginationInfo: "paBlogPaginationInfo",
        pagePrev: "paBlogPagePrev",
        pageNext: "paBlogPageNext",
        bodyScroll: "paBlogBody",
        emptyResetBtn: "paBlogEmptyResetBtn",
        emptyAddBtn: "paBlogEmptyAddBtn",
        addPanel: "paBlogAddPanel",
        editPanel: "paBlogEditPanel",
        addSubmit: "paBlogAddSubmit",
        editSubmit: "paBlogEditSubmit",
        editDelete: "paBlogEditDelete",
        addNewBtn: "paBlogAddNewBtn",
        addPanelClose: "paBlogAddPanelClose",
        editPanelClose: "paBlogEditPanelClose",
        addCancel: "paBlogAddCancel",
        editCancel: "paBlogEditCancel"
      },
      menuActions: { "copy-slug": function copySlug(id) {
        this.copySlugUrl(id);
      } }
    });
    this._pendingOpenId = null;
    this._blogCategories = [];
    this.store.set("blogTabFilter", "all");
    this.workspace = new BlogPostWorkspace(this);
    this._engagementByPostId = {};
  }
  async refreshEngagementSummaries() {
    const records = this.store.get("records") || [];
    if (!records.length) {
      this._engagementByPostId = {};
      return;
    }
    const ids = records.map((r) => r.id).join(",");
    try {
      const res = await fetch(`/api/blog-posts/engagement?ids=${encodeURIComponent(ids)}`, {
        credentials: "same-origin",
        headers: { Accept: "application/json" }
      });
      if (!res.ok) return;
      this._engagementByPostId = await res.json();
    } catch {
    }
  }
  getEngagementForPost(id) {
    return this._engagementByPostId?.[String(id)] || null;
  }
  seedData() {
    return [];
  }
  getCategoryMeta(key) {
    const cat = (this._blogCategories || []).find((c) => c.key === key);
    return cat ? { label: cat.label, catKey: cat.key } : { label: key || "Uncategorized", catKey: key };
  }
  async _loadBlogRecordsWithContent() {
    try {
      const res = await fetch("/api/blog-posts?full=1", {
        credentials: "same-origin",
        headers: { Accept: "application/json" }
      });
      if (!res.ok) return this.loadRecords(() => SEED_BLOG_POSTS);
      const records = await res.json();
      if (!Array.isArray(records)) return this.loadRecords(() => SEED_BLOG_POSTS);
      await storage.persistLocal("pa_blog_posts", records);
      return records;
    } catch {
      return this.loadRecords(() => SEED_BLOG_POSTS);
    }
  }
  async load() {
    storage.invalidate("pa_blog_posts");
    const [records, categories] = await Promise.all([
      this._loadBlogRecordsWithContent(),
      storage.get("pa_blog_categories", [])
    ]);
    this._blogCategories = Array.isArray(categories) ? categories : [];
    this._populateCategorySelects();
    this._populateCategoryFilter();
    try {
      const pendingCat = sessionStorage.getItem("pa_blog_cat_filter");
      if (pendingCat) {
        sessionStorage.removeItem("pa_blog_cat_filter");
        this.store.set("filters", { ...this.store.get("filters"), category: pendingCat });
      }
    } catch {
    }
    const maxId = Math.max(0, ...records.map((r) => Number(r.id) || 0));
    this.nextId = maxId + 1;
    this.store.set("records", records);
    await this.refreshEngagementSummaries();
    try {
      const params = new URLSearchParams(window.location.search);
      const openId = params.get("open");
      if (openId) {
        this._pendingOpenId = openId;
        params.delete("open");
        const url = new URL(window.location.href);
        url.searchParams.delete("open");
        window.history.replaceState({}, "", url.pathname + url.search);
      }
    } catch {
    }
  }
  render() {
    this._populateCategoryFilter();
    super.render();
  }
  _populateCategoryFilter() {
    const select = $select("paBlogCategoryFilter");
    if (!select) return;
    const current = this.store.get("filters")?.category || "all";
    const sorted = sortByNewestFirst(this._blogCategories || []);
    select.innerHTML = '<option value="all">All categories</option>' + sorted.map((c) => `<option value="${escapeHtml(c.key)}">${escapeHtml(c.label)}</option>`).join("");
    select.value = current;
    syncPaSelect(select);
  }
  _populateCategorySelects() {
    const sorted = sortByNewestFirst(this._blogCategories || []);
    const options = sorted.map((c) => `<option value="${escapeHtml(c.key)}">${escapeHtml(c.label)}</option>`).join("");
    const placeholder = '<option value="">Select category</option>';
    const wsSelect = $select("blogWsCategory");
    if (wsSelect) {
      wsSelect.innerHTML = placeholder + options;
      syncPaSelect(wsSelect);
    }
  }
  getFiltered() {
    const results = super.getFiltered();
    const tab = this.store.get("blogTabFilter") || "all";
    if (tab === "featured") return results.filter((p2) => p2.featured);
    if (tab === "published") return results.filter((p2) => p2.status === "Published");
    if (tab === "drafts") return results.filter((p2) => p2.status !== "Published");
    return results;
  }
  renderStats() {
    const records = this.store.get("records");
    setStatValue("paBlogStatTotal", records.length);
    setStatValue("paBlogStatPublished", records.filter((p2) => p2.status === "Published").length);
    setStatValue("paBlogStatDrafts", records.filter((p2) => p2.status !== "Published").length);
    setStatValue("paBlogStatFeatured", records.filter((p2) => p2.featured).length);
    setStatTrend("paBlogStatTotalTrend", records);
    setStatTrend("paBlogStatPublishedTrend", records, (p2) => p2.status === "Published");
    setStatTrend("paBlogStatDraftsTrend", records, (p2) => p2.status !== "Published");
    setStatTrend("paBlogStatFeaturedTrend", records, (p2) => p2.featured);
  }
  syncStatusTabs() {
    const filter = this.store.get("blogTabFilter") || "all";
    $all("#paBlogStatusTabs .pa-status-tab").forEach((tab) => {
      const active = tab.getAttribute("data-blog-filter") === filter;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
  }
  onAfterRender() {
    this.syncStatusTabs();
    if (this._pendingOpenId) {
      const id = this._pendingOpenId;
      this._pendingOpenId = null;
      void this.workspace.open(id, "edit");
    }
  }
  sortRecords(records) {
    return sortByNewestFirst(records);
  }
  getListTableColumns() {
    return [
      { label: "#", className: "pa-lv-col-num" },
      { label: "Post", className: "pa-lv-col-project" },
      { label: "Category" },
      { label: "Template", className: "pa-lv-col-tpl" },
      { label: "Status", className: "pa-lv-col-status" },
      { label: "Published", className: "pa-lv-col-date" },
      { label: "Actions", className: "pa-lv-col-actions" }
    ];
  }
  matchesFilters(record, filters) {
    if (filters.category !== "all" && record.category !== filters.category) return false;
    return true;
  }
  resetFilters() {
    super.resetFilters();
    this.store.set("blogTabFilter", "all");
  }
  matchesSearch(record, query) {
    const q3 = query.trim().toLowerCase();
    return record.title.toLowerCase().includes(q3) || record.slug.toLowerCase().includes(q3) || (record.excerpt || "").toLowerCase().includes(q3) || record.tags.some((t) => t.toLowerCase().includes(q3)) || (this.getCategoryMeta(record.category)?.label || "").toLowerCase().includes(q3);
  }
  getDeleteName(record) {
    return record.title;
  }
  renderListRow(p2, rowIndex) {
    const meta = this.getCategoryMeta(p2.category);
    const thumb = p2.imageUrl ? `<img class="pa-lv-img" src="${escapeHtml(p2.imageUrl)}" alt="" loading="lazy" />` : `<i class="ri-article-line"></i>`;
    return renderPaBlogListRow(p2, {
      meta,
      thumbHtml: thumb,
      rowIndex,
      cardClass: this.bulkSelect?.cardClass(p2.id) || "",
      idAttr: "data-blog-id",
      engagement: this.getEngagementForPost(p2.id)
    });
  }
  renderCard(p2, index) {
    const meta = this.getCategoryMeta(p2.category);
    const thumb = p2.imageUrl ? `<img class="pa-thumb-img" src="${escapeHtml(p2.imageUrl)}" alt="${escapeHtml(p2.imageAlt || p2.title)}" loading="lazy" />` : `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;"><i class="ri-article-line" style="font-size:34px;color:var(--pa-text-ghost);"></i></div>`;
    return renderPaBlogCard(p2, {
      meta,
      thumbHtml: thumb,
      bulkCheckbox: this.bulkSelect?.checkboxHtml(p2.id, `Select ${escapeHtml(p2.title)}`) || "",
      cardClass: this.bulkSelect?.cardClass(p2.id) || "",
      animationDelay: Math.min(index, 11) * 35,
      idAttr: "data-blog-id",
      engagement: this.getEngagementForPost(p2.id)
    });
  }
  attachCardListeners() {
    super.attachCardListeners();
    const grid = $id("paBlogGrid");
    if (!grid) return;
    grid.querySelectorAll(".pa-proj-card__details-btn").forEach((btn) => {
      this.on(btn, "click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-blog-id");
        if (id) void this.workspace.open(id, "edit");
      });
    });
  }
  copySlugUrl(id) {
    const p2 = this.findById(id);
    if (!p2) return;
    navigator.clipboard?.writeText(`/blog/${p2.slug}`).then(
      () => this.toast("Slug URL copied to clipboard", "success", 2e3),
      () => this.toast("Clipboard not available.", "danger")
    );
  }
  buildDuplicate(record, newId) {
    let slug = `${record.slug}-copy`;
    let suffix = 2;
    const slugs = new Set(this.store.get("records").map((r) => r.slug));
    while (slugs.has(slug)) slug = `${record.slug}-copy-${suffix++}`;
    return {
      ...record,
      id: newId,
      title: `${record.title} (Copy)`,
      slug,
      status: "Draft",
      featured: false,
      tags: [...record.tags],
      commentsEnabled: record.commentsEnabled !== false,
      likesEnabled: record.likesEnabled !== false,
      commentsAutoApprove: !!record.commentsAutoApprove,
      detailTemplate: record.detailTemplate || "auto",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  setFeaturedPreview(prefix, dataUrl, alt) {
    const altText = alt ?? "";
    const wrap = $id(`${prefix}ImagePreviewWrap`);
    const img = $img(`${prefix}ImagePreviewImg`);
    const dz = $id(`${prefix}ImageDropzone`);
    if (dataUrl) {
      if (img) {
        img.src = dataUrl;
        img.alt = altText;
      }
      if (wrap) wrap.style.display = "block";
      if (dz) dz.style.display = "none";
    } else {
      if (wrap) wrap.style.display = "none";
      if (dz) dz.style.display = "block";
    }
  }
  async persist() {
    if (!canManageContent()) return;
    await this.saveRecords(this.store.get("records"));
    await storage.get("pa_media_library", []).catch(() => []);
  }
  insertEditorImage() {
    const body = $id("blogWsContent");
    if (!body) return;
    open({
      mode: "attachment",
      folder: "blog",
      mediaFilter: "images",
      returnFocus: body,
      onSelect: (item) => {
        insertBlogImageHtml(body, item.url, item.alt || item.name || "");
        this.toast("Image inserted into article", "success", 2e3);
      }
    });
  }
  setupMediaPicker(prefix) {
    const btn = $id(`${prefix}FeaturedPickBtn`);
    if (!btn) return;
    this.on(btn, "click", () => {
      const pickerOpts = {
        mode: "featured",
        folder: "blog",
        returnFocus: btn,
        onSelect: (item) => {
          if (prefix === "blogWs") this.workspace.setWsImageData(item.url);
          const altEl = $field(`${prefix}ImageAlt`);
          if (altEl && item.alt && !altEl.value.trim()) altEl.value = item.alt;
          this.setFeaturedPreview(prefix, item.url, item.alt || altEl?.value || "");
          this.toast("Featured image selected from media library", "success");
        }
      };
      open(pickerOpts);
    });
  }
  setupImageDropzone(prefix) {
    const dropzone = $id(`${prefix}ImageDropzone`);
    const fileInput = $input(`${prefix}ImageFileInput`);
    const removeBtn = $id(`${prefix}ImageRemoveBtn`);
    if (!dropzone || !fileInput || wiredImageDropzones.has(dropzone)) return;
    const imageFileInput = fileInput;
    wiredImageDropzones.add(dropzone);
    const setData = (dataUrl) => {
      if (prefix === "blogWs") this.workspace.setWsImageData(dataUrl);
      const alt = $field(`${prefix}ImageAlt`)?.value ?? "";
      this.setFeaturedPreview(prefix, dataUrl, alt);
    };
    this.on(dropzone, "click", () => imageFileInput.click());
    this.on(imageFileInput, "change", async () => {
      const file = imageFileInput.files?.[0];
      imageFileInput.value = "";
      if (!file || !handleFileValidation(file)) return;
      try {
        const uploaded = await uploadCmsFileWithPreview(file, {
          folder: "blog",
          page: "blog",
          purpose: "blog-featured",
          optimize: { maxWidth: 1600, maxHeight: 900, quality: 0.88 },
          onPreview: (previewUrl) => setData(previewUrl)
        });
        setData(uploaded.url);
        this.toast("Featured image uploaded", "success");
      } catch {
        this.toast("Could not upload image", "danger");
      }
    });
    ["dragenter", "dragover"].forEach((evt) => this.on(dropzone, evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    }));
    ["dragleave", "drop"].forEach((evt) => this.on(dropzone, evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    }));
    this.on(dropzone, "drop", async (e) => {
      if (!(e instanceof DragEvent)) return;
      const file = e.dataTransfer?.files?.[0];
      if (!file || !handleFileValidation(file)) return;
      try {
        const uploaded = await uploadCmsFileWithPreview(file, {
          folder: "blog",
          page: "blog",
          purpose: "blog-featured",
          optimize: { maxWidth: 1600, maxHeight: 900, quality: 0.88 },
          onPreview: (previewUrl) => setData(previewUrl)
        });
        setData(uploaded.url);
        this.toast("Featured image uploaded", "success");
      } catch {
        this.toast("Could not upload image", "danger");
      }
    });
    this.on(removeBtn, "click", (e) => {
      e.stopPropagation();
      setData(null);
    });
  }
  bindEvents() {
    super.bindEvents();
    this.workspace.bind();
    $all("#paBlogStatusTabs .pa-status-tab").forEach((tab) => {
      this.on(tab, "click", () => {
        const blogFilter = tab.getAttribute("data-blog-filter") || "all";
        this.store.update({ blogTabFilter: blogFilter, page: 1 });
        this.render();
      });
    });
  }
  openAddPanel() {
    this.workspace.openAdd();
  }
  openEditPanel(id) {
    void this.workspace.open(id, "edit");
  }
  async deleteById(id) {
    await super.deleteById(id);
    if (String(id) === String(this.currentEditId)) {
      this.workspace.close();
      this.currentEditId = null;
    }
  }
  resetAddForm() {
    this.workspace.resetForm();
  }
  populateEditForm(p2) {
    this.workspace.populateForm(p2);
  }
  validateForm(prefix = "ws") {
    let valid = true;
    const p2 = "blogWs";
    const title = $field(`${p2}Title`)?.value.trim() ?? "";
    this._toggleErr(`${p2}Title`, !title);
    if (!title) valid = false;
    const slugEl = $field(`${p2}Slug`);
    const slug = slugEl?.value.trim() ?? "";
    const slugErr = $id(`${p2}SlugError`);
    if (!slug) {
      slugEl?.classList.add("error");
      if (slugErr) {
        slugErr.classList.add("visible");
        slugErr.querySelector("span").textContent = "URL slug is required";
      }
      valid = false;
    } else if (!isValidSlug(slug)) {
      slugEl?.classList.add("error");
      if (slugErr) {
        slugErr.classList.add("visible");
        slugErr.querySelector("span").textContent = 'Slug must be lowercase letters, digits, or hyphens (e.g. "my-post-title")';
      }
      valid = false;
    } else {
      const editingId = this.currentEditId;
      const duplicate = this.store.get("records").find((post) => post.slug === slug && String(post.id) !== String(editingId));
      if (duplicate) {
        slugEl?.classList.add("error");
        if (slugErr) {
          slugErr.classList.add("visible");
          slugErr.querySelector("span").textContent = `Slug "${slug}" is already in use`;
        }
        valid = false;
      } else {
        slugEl?.classList.remove("error");
        slugErr?.classList.remove("visible");
      }
    }
    const category = $field(`${p2}Category`)?.value ?? "";
    this._toggleErr(`${p2}Category`, !category);
    if (!category) valid = false;
    const excerpt = $field(`${p2}Excerpt`)?.value.trim() ?? "";
    this._toggleErr(`${p2}Excerpt`, !excerpt);
    if (!excerpt) valid = false;
    const contentEl = $id(`${p2}Content`);
    let content = "";
    let contentOk = false;
    if (p2 === "blogWs") {
      const detailTpl = this.workspace.getDetailTemplate();
      const html = getBlogRteHtml("blogWsContent", "blogWsContentHtml", "blogWsRteWrap");
      content = prepareBlogContentForStorageClient(
        html,
        detailTpl,
        this.workspace.getHiddenSections()
      );
      contentOk = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().length > 0;
    } else {
      content = getRteHtml(contentEl);
      contentOk = content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().length > 0;
    }
    $id(`${p2}ContentError`)?.classList.toggle("visible", !contentOk);
    $id(`${p2}RteWrap`)?.classList.toggle("error", !contentOk);
    if (!contentOk) valid = false;
    const tags = getChipValues($id(`${p2}TagChips`));
    return { valid, title, slug, category, excerpt, content, tags };
  }
  _toggleErr(id, isError) {
    $id(id)?.classList.toggle("error", isError);
    $id(`${id}Error`)?.classList.toggle("visible", isError);
  }
  buildNewRecord(f) {
    const publishedDate = $field("blogWsPublishedDate")?.value ?? "";
    const sortOrderRaw = $field("blogWsSortOrder")?.value ?? "";
    return {
      title: f.title,
      slug: f.slug,
      category: f.category,
      excerpt: f.excerpt,
      content: f.content,
      tags: f.tags,
      status: $field("blogWsStatus")?.value ?? "Draft",
      featured: $field("blogWsFeatured")?.value === "1",
      imageUrl: this.workspace.getWsImageData() || "",
      imageAlt: $field("blogWsImageAlt")?.value.trim() ?? "",
      publishedAt: publishedDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      sortOrder: sortOrderRaw ? parseInt(sortOrderRaw, 10) : this.store.get("records").length + 1,
      metaTitle: $field("blogWsMetaTitle")?.value.trim() ?? "",
      metaDesc: $field("blogWsMetaDesc")?.value.trim() ?? "",
      commentsEnabled: $field("blogWsCommentsEnabled")?.value !== "0",
      likesEnabled: $field("blogWsLikesEnabled")?.value !== "0",
      commentsAutoApprove: $field("blogWsCommentsAutoApprove")?.value === "1",
      detailTemplate: this.workspace.getDetailTemplate(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  applyEditToRecord(record, f) {
    record.title = f.title;
    record.slug = f.slug;
    record.category = f.category;
    record.excerpt = f.excerpt;
    record.content = f.content;
    record.tags = f.tags;
    record.status = $field("blogWsStatus")?.value ?? record.status;
    record.featured = $field("blogWsFeatured")?.value === "1";
    record.imageUrl = this.workspace.getWsImageData() || "";
    record.imageAlt = $field("blogWsImageAlt")?.value.trim() ?? "";
    const publishedDate = $field("blogWsPublishedDate")?.value ?? "";
    record.publishedAt = publishedDate || record.publishedAt;
    const sortOrderRaw = $field("blogWsSortOrder")?.value ?? "";
    record.sortOrder = sortOrderRaw ? parseInt(sortOrderRaw, 10) : record.sortOrder;
    record.metaTitle = $field("blogWsMetaTitle")?.value.trim() ?? "";
    record.metaDesc = $field("blogWsMetaDesc")?.value.trim() ?? "";
    record.commentsEnabled = $field("blogWsCommentsEnabled")?.value !== "0";
    record.likesEnabled = $field("blogWsLikesEnabled")?.value !== "0";
    record.commentsAutoApprove = $field("blogWsCommentsAutoApprove")?.value === "1";
    record.detailTemplate = this.workspace.getDetailTemplate();
  }
};
export {
  BlogModule
};
//# sourceMappingURL=BlogModule-V2REOY3A.js.map
