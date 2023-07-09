$.extend($.expr[":"], {
  econtains: function (obj, index, meta, stack) {
    return (
      (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() ==
      meta[3].toLowerCase()
    );
  },
});

// @ts-expect-error
!(function (e) {
  // @ts-expect-error
  e.fn.xpath = function (n) {
    if (0 == this.length) return null;
    var r = this.get(0),
      i = e(r);
    if (!i.attr("id") || (void 0 != n && n)) {
      for (var o = []; r && r.nodeType == Node.ELEMENT_NODE; r = r.parentNode) {
        for (var t = 0, a = r.previousSibling; a; a = a.previousSibling)
          a.nodeType != Node.DOCUMENT_TYPE_NODE &&
            a.nodeName == r.nodeName &&
            ++t;
        var d = r.nodeName.toLowerCase(),
          u = t ? "[" + (t + 1) + "]" : "";
        o.splice(0, 0, d + u);
      }
      return o.length ? "/" + o.join("/") : null;
    }
    return '//*[@id="' + i.attr("id") + '"]';
  };
})(jQuery);
