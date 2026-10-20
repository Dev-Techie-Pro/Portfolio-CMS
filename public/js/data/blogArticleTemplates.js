const BLOG_ARTICLE_TEMPLATES = [
  {
    id: "simple-html",
    label: "Simple article (HTML paragraphs)",
    description: "One section \u2014 paste rich HTML inside paragraph text fields.",
    detailTemplate: "minimal",
    payload: {
      detailTemplate: "minimal",
      content: [
        {
          type: "section",
          id: "content",
          title: "Article",
          figureFirst: false,
          blocks: [
            {
              type: "p",
              text: '<p>Write your introduction here. You can use <strong>bold</strong>, <em>italic</em>, and <a href="/contact">links</a>.</p>'
            },
            {
              type: "p",
              text: "<p>Add another paragraph with your main points.</p>"
            }
          ]
        }
      ]
    }
  },
  {
    id: "standard-sections",
    label: "Standard (multi-section)",
    description: "Table of contents + sidebar layout \u2014 several titled sections.",
    detailTemplate: "standard",
    payload: {
      detailTemplate: "standard",
      content: [
        {
          type: "section",
          id: "intro",
          title: "Introduction",
          figureFirst: true,
          blocks: [
            {
              type: "p",
              text: "Open with context: who this is for and what they will learn."
            },
            {
              type: "p",
              text: "Keep paragraphs short and scannable for the detail page template."
            }
          ]
        },
        {
          type: "section",
          id: "main-idea",
          title: "Main idea",
          blocks: [
            {
              type: "p",
              text: "Explain the core concept in plain language."
            },
            {
              type: "bullet-list",
              items: ["First takeaway", "Second takeaway", "Third takeaway"]
            }
          ]
        },
        {
          type: "section",
          id: "next-steps",
          title: "Next steps",
          blocks: [
            {
              type: "p",
              text: "Close with a clear call to action or summary."
            }
          ]
        }
      ]
    }
  },
  {
    id: "case-study",
    label: "Case study",
    description: "Stat highlight, compare grid, and structured sections.",
    detailTemplate: "case-study",
    payload: {
      detailTemplate: "case-study",
      content: [
        {
          type: "section",
          id: "overview",
          title: "Project overview",
          figureFirst: true,
          blocks: [
            {
              type: "p",
              text: "Describe the client, problem, and your role."
            }
          ]
        },
        {
          type: "stat-box",
          icon: "siTrending",
          value: "40%",
          text: "Example metric \u2014 replace with a real result from the project."
        },
        {
          type: "section",
          id: "approach",
          title: "Approach",
          blocks: [
            {
              type: "p",
              text: "How you structured the solution."
            },
            {
              type: "compare-grid",
              columns: [
                {
                  title: "Before",
                  items: ["Pain point one", "Pain point two", "Pain point three"]
                },
                {
                  title: "After",
                  items: ["Improvement one", "Improvement two", "Improvement three"]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    id: "feature-grid",
    label: "Feature grid article",
    description: "Section with icon feature cards (great for tool roundups).",
    detailTemplate: "standard",
    payload: {
      content: [
        {
          type: "section",
          id: "intro",
          title: "Why this matters",
          figureFirst: false,
          blocks: [
            {
              type: "p",
              text: "Brief intro before the feature grid."
            },
            {
              type: "feature-grid",
              items: [
                { icon: "siSpark", title: "Feature one", text: "Short description." },
                { icon: "siGrid", title: "Feature two", text: "Short description." },
                { icon: "siLock", title: "Feature three", text: "Short description." },
                { icon: "siEdit", title: "Feature four", text: "Short description." }
              ]
            }
          ]
        },
        {
          type: "section",
          id: "conclusion",
          title: "Conclusion",
          blocks: [
            {
              type: "quote-box",
              icon: "siQuote",
              text: "Optional pull quote \u2014 swap the icon id to match your icon set."
            },
            {
              type: "p",
              text: "Wrap up and link to related work or contact."
            }
          ]
        }
      ]
    }
  },
  {
    id: "longform",
    label: "Longform",
    description: "TOC on the left \u2014 multiple deep sections, no right sidebar.",
    detailTemplate: "longform",
    payload: {
      detailTemplate: "longform",
      content: [
        {
          type: "section",
          id: "chapter-1",
          title: "Chapter 1",
          figureFirst: false,
          blocks: [
            { type: "p", text: "Longform opening \u2014 set expectations for length and depth." }
          ]
        },
        {
          type: "section",
          id: "chapter-2",
          title: "Chapter 2",
          blocks: [
            { type: "p", text: "Develop the narrative with examples." },
            {
              type: "benefits-row",
              items: [
                { icon: "siCheck", title: "Benefit A", text: "One line detail." },
                { icon: "siCheck", title: "Benefit B", text: "One line detail." }
              ]
            }
          ]
        },
        {
          type: "section",
          id: "chapter-3",
          title: "Chapter 3",
          blocks: [
            { type: "p", text: "Final chapter and summary." }
          ]
        }
      ]
    }
  }
];
export {
  BLOG_ARTICLE_TEMPLATES
};
//# sourceMappingURL=blogArticleTemplates.js.map
