const iframe =
  typeof document !== "undefined"
    ? document.getElementsByTagName("iframe")[0]
    : {};

const PostPreview = createClass({
  componentDidMount() {
    const { document } = this.props;
    const link = document.createElement("link");
    link.href = "https://use.typekit.net/bwf5jyu.css";
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
  },
  render: function () {
    const entry = this.props.entry;
    const title = entry.getIn(["data", "title"]) ?? "";
    const author = entry.getIn(["data", "authors"]) ?? "";
    const date = entry.getIn(["data", "date"]) ?? "";
    const formattedDate= (date) ? new Date(date) : new Date();

    const separator = String.fromCharCode(0x00A0)+String.fromCharCode(0x00A0)+String.fromCharCode(0x00A0)+String.fromCharCode(0x007C)+String.fromCharCode(0x00A0)+String.fromCharCode(0x00A0)+String.fromCharCode(0x00A0);

    return h(
      "article",
      { className: "content margin-2" },
      h(
        "section",
        { className: "post-full-content" },
        h("h1", { className: "content-title" }, title),
        h("div", { className: "top-detail"}, h("span", { className: "author" }, 
        h("a", {href: "#"}, author)
    ),
    h("span", { className: "date" }, separator + formattedDate.toLocaleDateString('en-us', { month:"short", day:"numeric", year:"numeric" }) + ""),
    h("div", { className: "tags" }, 
        h("span", {}, "Tags: "),
        h("ul", { className: "tags-list"}, 
            this.props.widgetsFor('tags').map((tag, index) => {
                if(tag) {
                  return h('li', {key: index}, 
                    h('a', {className: "tag"}, tag.getIn(['data']))
                  )
                }
                return '';
            })
        )
    ),),
        h("section", { className: "content-body" }, this.props.widgetFor("body"))
      )
    );
  },
});

CMS.registerPreviewTemplate("posts", PostPreview);
CMS.registerPreviewTemplate("drafts", PostPreview);
CMS.registerPreviewStyle("/blog/css/main.min.css");
CMS.registerPreviewStyle("/blog/css/page/article.min.css");
