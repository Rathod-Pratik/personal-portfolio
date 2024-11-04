const express = require("express");
const app = express.Router();
const fs = require('fs').promises;
const path = require("path");


app.get("/", async(req,res) => {
  async function sendCode(codeItems) {
    try {
      if (Array.isArray(codeItems)) {
        return Promise.all(
          codeItems.map(async (item) => {
            try {
              const functionCodeData = item.function_code 
                ? await fs.readFile(item.function_code, "utf8") 
                : null;
              return {
                function_name: item.function_name,
                function_code: functionCodeData,
                output: item.output || null // Include output path if provided
              };
            } catch (error) {
              console.error(`Error reading file ${item.function_code}:`, error);
              return {
                function_name: item.function_name,
                function_code: null,
                output: item.output || null
              };
            }
          })
        );
      } else {
        const data = await fs.readFile(codeItems, "utf8");
        return data;
      }
    } catch (error) {
      console.error("Error reading files:", error);
      throw new Error("Failed to read files");
    }
  }
  /*give id to user to access perticular object use sendphoto and send code function to send photo and code*/
  try{
  const files = [
    {
      _id: 1,
      file_name: "Basic",
      code: "HTML/code/basic.html",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Basic.png",
      explanation:
        "HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. It provides the basic structure of websites, which is then enhanced and modified by other technologies like CSS (for styling) and JavaScript (for interactivity). HTML elements are the building blocks of all websites and are represented by tags that define various types of content.",
      topics: [
        "HTML documents are structured with tags that wrap content, specifying different elements like headings, paragraphs, links, images, etc. The essential structure includes: <!DOCTYPE html> (declares the document type as HTML), <html> (the root element), <head> (contains meta-information), and <body> (holds the main content).",
        ,
        "HTML tags are enclosed within angle brackets (< >) and usually come in pairs: an opening tag and a closing tag. Elements represent different types of content or structure, such as <h1> - <h6> (headings), <p> (paragraph), <a> (anchor for links), and <img> (image).",
        ,
        "Attributes provide additional information about elements and are included within the opening tag. Common attributes include src (for image URLs), href (for hyperlink URLs), and alt (for alternative text on images).",
        ,
        "HTML forms are used to collect user input, with various input types such as <input type='text'> (single-line text), <textarea> (multi-line text), <button> (for submitting forms), and <select> (dropdown menu).",
        ,
        "Semantic HTML elements clearly describe their purpose, improving accessibility and SEO. Examples include <header>, <footer>, <article>, <section>, and <nav>, which convey the role of the content within.",
        ,
        "HTML5 introduced new elements and attributes such as new form controls (<date>, <email>), multimedia elements (<audio>, <video>), graphics (<canvas>, <svg>), and APIs like Geolocation and Web Storage for enhanced functionality.",
        ,
      ],
    },
    {
      _id: 2,
      code: "HTML/code/Attribute.html",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Attribute.png",
      explanation:
        "An attribute in HTML is used to provide additional information about an element. Attributes are added to the opening tag of an element and typically come in name/value pairs, like `name='value'`. They modify the default behavior of an element or give additional instructions to the browser or developer.",
      topics: [
        "Common Attributes: Some common HTML attributes include `id`, `class`, `style`, `href`, `src`, `alt`, `title`, etc. Each attribute has a specific purpose and usage.",
        "Syntax of Attributes: Attributes are placed inside the opening tag and are written as key-value pairs, with the key being the attribute name and the value enclosed in quotes.",
        "Global Attributes: Global attributes, such as `id`, `class`, and `style`, can be applied to almost any HTML element to provide information or styles across multiple elements.",
        "Event Attributes: These attributes, such as `onclick`, `onmouseover`, and `onchange`, are used to trigger JavaScript actions in response to user interactions with the element.",
        "Required Attributes: Some elements require certain attributes to function correctly. For example, the `<img>` tag needs a `src` attribute to specify the image source, and an `alt` attribute to describe the image.",
      ],
      file_name: "Attribute",
    },
    {
      _id: 3,
      file_name: "Heading",
      code: "HTML/code/Heading.html",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Heading.png",
      explanation:
        "Headings in HTML are used to define titles or subtitles that organize content on a webpage. HTML provides six levels of headings, from `<h1>` to `<h6>`, with `<h1>` being the most important (usually the main heading) and `<h6>` being the least important. These tags help search engines and screen readers understand the structure of the page, and they also help users quickly grasp the hierarchy of information.",
      topics: [
        "Heading Levels: HTML offers six different levels of headings, from `<h1>` to `<h6>`. The `<h1>` tag represents the main heading, while the other levels represent subheadings.",
        "Semantic Importance: Headings help with accessibility and SEO. `<h1>` is usually reserved for the main title of the page, while `<h2>`, `<h3>`, and other headings define subsections of content.",
        "Visual Styling: Headings are often styled larger and bolder by default. You can customize the appearance of each heading using CSS.",
        "Usage Guidelines: For proper document structure, it's important not to skip heading levels. For example, an `<h1>` should be followed by an `<h2>`, not directly by an `<h4>`.",
        "SEO Benefits: Search engines prioritize the content inside headings, especially `<h1>`, when indexing and ranking pages. Therefore, it's best to include keywords in your main headings.",
      ],
    },
    {
      _id: 4,
      file_name: "paragraph",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/paragraph.png",
      code: "HTML/code/ParaGraph.html",
      explanation:
        "A paragraph in HTML is used to group text into logical sections. The `<p>` element is used to define a block of text, with line breaks automatically added before and after the paragraph. Paragraphs help in organizing content and making it more readable for both users and search engines. By default, paragraphs are displayed as blocks and span the entire width of their containing element.",
      topics: [
        "Basic Syntax: Paragraphs are created using the `<p>` tag. This tag automatically adds spacing between the text and other elements on the page.",
        "Inline Elements in Paragraphs: Inline elements such as `<a>`, `<strong>`, `<em>`, and others can be placed within a paragraph to provide additional formatting or functionality.",
        "Whitespace Handling: Multiple spaces, line breaks, or tabs in the text inside a paragraph are collapsed into a single space, as HTML doesn't treat extra whitespace as significant.",
        "Styling Paragraphs: You can style paragraphs using CSS to adjust their alignment, color, font, and spacing. The paragraph can be given custom styles using the `class` or `id` attributes.",
        "SEO and Accessibility: Text within paragraphs is easily indexed by search engines, and it enhances accessibility for screen readers, ensuring that the content is structured and readable.",
      ],
    },
    {
      _id: 5,
      file_name: "formatting",
      code: "HTML/code/Formating.html",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Formationg.png",
      explanation:
        "Formatting in HTML refers to the use of elements that change the appearance of the text. These elements provide ways to emphasize, highlight, or change the structure of text for better readability or for specific purposes like bolding, italicizing, or underlining. These tags mainly apply inline styles that affect how the text is displayed on a webpage. They are not meant for layout or positioning, but rather to visually emphasize or structure content.",
      topics: [
        "Bold Text: The `<b>` or `<strong>` tag is used to make text bold. While `<b>` purely makes the text bold, `<strong>` gives semantic meaning, indicating that the text is important.",
        "Italic Text: The `<i>` or `<em>` tag is used to italicize text. Similar to the bold tags, `<i>` is purely for styling, while `<em>` indicates emphasis on the text.",
        "Underlined Text: The `<u>` tag underlines the text. It's less commonly used in modern web design since underlining can confuse users as they may mistake it for a hyperlink.",
        "Strikethrough Text: The `<s>` or `<del>` tag strikes through the text, indicating that it is no longer accurate or relevant.",
        "Monospaced Text: The `<code>` or `<pre>` tags display text in a monospaced (fixed-width) font, often used for code snippets. `<pre>` also preserves the formatting of the text, including spaces and line breaks.",
      ],
    },
    {
      _id: 6,
      file_name: "Quotation",
      code: "HTML/code/Quotation.html",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Quotation.png",
      explanation:
        "In HTML, quotations are used to represent spoken words, thoughts, or other forms of speech. The `<blockquote>` element is typically used for longer quotations, indicating that the text is an extended quote from another source. The `<q>` element is used for shorter, inline quotations, automatically adding quotation marks around the text. Proper use of quotation elements helps improve accessibility and semantic meaning, allowing search engines and screen readers to interpret the text correctly.",
      topics: [
        "Block Quotations: The `<blockquote>` tag is used for longer quotes and typically includes the author's name or source, often styled with indentation.",
        "Inline Quotations: The `<q>` tag is used for short quotes that appear within a paragraph. Browsers automatically add quotation marks around the text within this tag.",
        "Citations: The `<cite>` tag can be used in conjunction with quotations to reference the source of a quote, providing additional context and credit to the original author.",
        "Attribution: To properly attribute quotes, you can use the `cite` attribute within the `<blockquote>` tag to specify the source of the quote.",
        "Accessibility: Using the correct quotation tags improves accessibility for screen readers, which can provide context to visually impaired users about the structure and meaning of the text.",
      ],
    },
    {
      _id: 7,
      file_name: "comments",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Comment.png",
      code: "HTML/code/Comment.html",
      explanation:
        "Comments in HTML are used to insert notes or reminders in the code that will not be displayed in the browser. Comments are helpful for developers to document their code, explain sections, or leave reminders for themselves or others. In HTML, comments start with `<!--` and end with `-->`. They can span multiple lines and are ignored by the browser, making them useful for internal documentation without affecting the rendered output.",
      topics: [
        "Basic Syntax: HTML comments are written using the syntax `<!-- comment goes here -->`. Anything placed within this syntax will not be rendered in the browser.",
        "Multi-line Comments: Comments can span multiple lines, which is useful for adding detailed explanations or documentation within the code.",
        "Best Practices: Use comments to explain complex sections of code, document changes, or clarify the purpose of specific elements. However, avoid over-commenting as it can clutter the code.",
        "Debugging: Comments can be used to temporarily disable code without deleting it, making it easier to debug issues by commenting out sections of HTML.",
        "Visibility: Comments are not visible to users in the browser but can be viewed in the page source code, making them useful for collaboration among developers.",
      ],
    },
    {
      _id: 8,
      file_name: "Table Tag",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Table tag.png",
      code: "HTML/code/table.html",
      explanation:
        "Tables in HTML are used to present data in a structured format, consisting of rows and columns. The `<table>` element serves as the container for the table, while `<tr>` elements define the rows, `<td>` elements define the individual data cells, and `<th>` elements are used for header cells, which typically appear at the top of the columns. Tables help organize and display information clearly, making it easier for users to read and understand the data.",
      topics: [
        "Creating a Table: A basic table is created using the `<table>` tag, with rows defined by `<tr>` tags and cells by `<td>` tags for data or `<th>` tags for headers.",
        "Table Headers: The `<th>` tag defines header cells, which are typically bold and centered by default, providing context for the data in each column.",
        "Table Attributes: Tables can have attributes like `border`, `cellpadding`, and `cellspacing` to control the appearance and spacing of table elements. CSS is often used for better styling.",
        "Rowspan and Colspan: The `rowspan` and `colspan` attributes allow cells to span multiple rows or columns, respectively, enabling more complex table layouts.",
        "Accessibility: Proper use of tables and headers enhances accessibility for screen readers, which can help visually impaired users navigate and understand the content.",
      ],
    },
    {
      _id: 9,
      file_name: "List Tag",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/List tag.png",
      code: "HTML/code/List.html",
      explanation:
        "Lists in HTML are used to group related items in a structured format, making content more organized and easier to read. There are three main types of lists: ordered lists (`<ol>`), unordered lists (`<ul>`), and definition lists (`<dl>`). Each type serves a specific purpose and can be styled using CSS for better presentation.",
      topics: [
        "Ordered Lists: An ordered list is created using the `<ol>` tag and is used when the order of items is significant. Each item is defined with the `<li>` tag, and items are numbered automatically.",
        "Unordered Lists: An unordered list is created using the `<ul>` tag and is used when the order of items does not matter. Each item is also defined with the `<li>` tag, and items are typically marked with bullet points.",
        "Definition Lists: A definition list is created using the `<dl>` tag, with each term defined using `<dt>` (definition term) and the associated description using `<dd>` (definition description).",
        "Nested Lists: Lists can be nested within other lists, allowing for complex hierarchies of information.",
        "Styling Lists: Lists can be styled using CSS to change the appearance of bullet points, numbering, margins, and padding for better visual appeal.",
      ],
    },
    {
      _id: 10,
      file_name: "Semantic Tag",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/semantic tag.png",
      code: "HTML/code/semantic.html",
      explanation:
        "Semantics in HTML refers to the use of elements that convey meaning about the content contained within them. Semantic elements clearly describe their meaning in a way that both browsers and developers can understand, which enhances accessibility and search engine optimization (SEO). Using semantic HTML helps in organizing content logically, improving the structure of the document, and providing context to both users and search engines.",
      topics: [
        "Semantic Elements: Semantic HTML elements include `<header>`, `<footer>`, `<article>`, `<section>`, `<nav>`, `<aside>`, and more. Each of these elements has a specific meaning and purpose within the document structure.",
        "Improved Accessibility: Semantic tags help screen readers and assistive technologies interpret the content better, allowing visually impaired users to navigate and understand the page structure more effectively.",
        "SEO Benefits: Search engines use semantic markup to better understand the content of a webpage, potentially improving its ranking in search results. Semantic elements provide clear context about the type of content being displayed.",
        "Structural Clarity: Using semantic HTML helps maintain clear and organized code. This improves maintainability and makes it easier for other developers to understand the structure and purpose of different sections of the webpage.",
        "Best Practices: Developers are encouraged to use semantic elements whenever appropriate, avoiding non-semantic tags like `<div>` and `<span>` for purposes that can be fulfilled by semantic alternatives.",
      ],
    },
    {
      _id: 11,
      file_name: "frameset",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Frameset.png",
      code: "HTML/code/frameset.html",
      explanation:
        "Framesets were used in older versions of HTML (HTML 4.01) to divide the browser window into multiple sections or frames, each of which could display a different HTML document. The `<frameset>` element replaced the `<body>` element and defined the layout of the frames, while the `<frame>` element specified the individual frames. However, framesets are now deprecated in HTML5, and their use is discouraged due to accessibility issues and the advent of CSS for layout purposes.",
      topics: [
        "Defining a Frameset: The `<frameset>` tag is used to define a set of frames in place of the `<body>` tag, specifying how to divide the browser window into different sections.",
        "Frame Specifications: The `<frame>` tag is used to specify each individual frame, allowing for attributes like `src` (the URL of the document to display) and `name` (for targeting links between frames).",
        "Row and Column Layouts: The `rows` and `cols` attributes on the `<frameset>` tag define how the frames are arranged, either horizontally (rows) or vertically (columns).",
        "Accessibility Issues: Frames can create difficulties for users with disabilities, as screen readers may struggle to navigate them. Additionally, frames can complicate bookmarking and linking.",
        "Modern Alternatives: HTML5 has deprecated framesets in favor of using CSS and responsive design techniques, such as flexbox and grid layout, which provide greater control and accessibility.",
      ],
    },
    {
      _id: 12,
      file_name: "Audio and video",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/media.png",
      code: "HTML/code/Media.html",
      explanation:
        "The `<audio>` and `<video>` elements in HTML5 are used to embed multimedia content directly in web pages without the need for external plugins. These elements provide built-in controls for playback, volume, and other features, making it easier for users to interact with audio and video files. They support various formats, enabling developers to deliver rich media experiences across different devices and browsers.",
      topics: [
        "Audio Element: The `<audio>` tag is used to embed audio content in a web page. It supports attributes like `controls`, `autoplay`, `loop`, and `muted` to enhance user experience.",
        "Video Element: The `<video>` tag is used for embedding video content, with similar attributes to the audio tag. It also supports features like captions and multiple source formats.",
        "Source Element: Within both `<audio>` and `<video>`, the `<source>` element allows you to specify multiple file formats for the media. This ensures compatibility across different browsers.",
        "Accessibility: Both audio and video elements can include text tracks for subtitles or captions, improving accessibility for users with hearing impairments.",
        "Fallback Content: You can provide fallback content within the `<audio>` or `<video>` tags to display messages or alternative links for browsers that do not support these elements.",
      ],
    },
    {
      _id: 13,
      file_name: "Image",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/image tag.png",
      code: "HTML/code/img.html",
      explanation:
        "Images in HTML are embedded using the `<img>` tag, which allows you to display graphics and photographs on a webpage. The `src` attribute specifies the source URL of the image, while the `alt` attribute provides alternative text for screen readers and displays if the image cannot be loaded. Proper use of images enhances the visual appeal of a website, improves user engagement, and conveys information effectively.",
      topics: [
        "Image Source: The `src` attribute is required and defines the path to the image file, which can be a local file or an external URL.",
        "Alternative Text: The `alt` attribute is important for accessibility, as it provides descriptive text for users who cannot see the image. It also improves SEO by providing context to search engines.",
        "Image Formats: Common image formats include JPEG, PNG, GIF, and SVG. Each format has its strengths and weaknesses, so choosing the appropriate one for your needs is essential.",
        "Responsive Images: To make images responsive, you can use CSS to control their width and height or the `srcset` attribute to provide different image sizes for different screen resolutions.",
        "Loading Performance: Optimizing images by compressing them and using appropriate dimensions can significantly enhance page loading performance and overall user experience.",
      ],
    },
    {
      _id: 14,
      file_name: "Id and Class",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Id and class.png",
      code: "HTML/code/Id and class.html",
      explanation:
        "In HTML, the `id` and `class` attributes are used to uniquely identify and categorize elements, respectively. The `id` attribute assigns a unique identifier to an element, ensuring that no two elements can have the same `id` within a single document. The `class` attribute, on the other hand, allows multiple elements to share the same class name, making it easier to apply styles or manipulate groups of elements. Both attributes are commonly used in CSS for styling and in JavaScript for selecting and manipulating elements.",
      topics: [
        "ID Attribute: The `id` attribute is used to assign a unique identifier to an HTML element, which can be referenced in CSS and JavaScript. The value of `id` must be unique within the document.",
        "Class Attribute: The `class` attribute allows multiple elements to share the same class name, facilitating grouping and applying styles or scripts to a collection of elements.",
        "CSS Selectors: You can target elements using their `id` or `class` in CSS. An `id` selector is prefixed with a `#`, while a class selector is prefixed with a `.`.",
        "JavaScript Manipulation: Both `id` and `class` attributes can be used in JavaScript to select and manipulate elements using methods like `getElementById()` for `id` and `getElementsByClassName()` or `querySelector()` for `class`.",
        "Best Practices: Use `id` for elements that need a unique reference and `class` for styling groups of elements. Avoid using duplicate `id`s as it can lead to unexpected behavior.",
      ],
    },
    {
      _id: 15,
      file_name: "Favicon",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/favicon.png",
      code: "HTML/code/favicon.html",
      explanation:
        "A favicon, short for 'favorite icon,' is a small image or icon associated with a website that appears in the browser's address bar, browser tabs, bookmarks, and other places. Favicons help users easily identify and recognize a website among multiple tabs or bookmarks. In HTML, favicons are typically linked in the `<head>` section of a document using the `<link>` tag, specifying the image source and type.",
      topics: [
        "Creating a Favicon: Favicons are usually created in .ico, .png, or .svg formats. The recommended size is 16x16 or 32x32 pixels, but larger sizes may also be used for high-resolution displays.",
        "Linking the Favicon: To add a favicon to your website, you use the `<link>` element in the `<head>` section, with attributes like `rel` set to 'icon' and `href` set to the path of the favicon file.",
        "Multiple Formats: It’s common to provide multiple favicon formats (e.g., .ico, .png) to ensure compatibility across different browsers and devices.",
        "Browser Support: Most modern browsers support favicons, but some older versions may have limitations. Testing across different browsers is recommended to ensure proper display.",
        "Best Practices: Use a simple and recognizable design for the favicon that reflects your brand. Additionally, ensure that the favicon is optimized for performance to reduce loading times.",
      ],
    },
    {
      _id: 16,
      file_name: "Link",
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/List tag.png",
      code: "HTML/code/Link.html",
      explanation:
        "In HTML, the <ol> (ordered list) and <ul> (unordered list) tags are used to create lists. An ordered list displays items with numbers or letters, while an unordered list displays items with bullet points. Both lists consist of list items, which are defined by the <li> (list item) tag.",

      topics: [
        "Ordered List (<ol>): The <ol> tag is used when the sequence of items is important, such as steps in a process. The default display for items is numbers, but this can be customized using the type attribute (e.g., type='A' for uppercase letters, type='i' for Roman numerals).",
        "Unordered List (<ul>): The <ul> tag is used for lists where the order of items doesn't matter, like a list of features or groceries. The default display is a bullet point before each item, but this can be changed using CSS to other symbols.",
        "List Item (<li>): The <li> tag is used inside both <ol> and <ul> to define each individual item. Every list item is automatically formatted based on the parent list type (ordered or unordered).",
        "Nesting Lists: Lists can be nested inside one another, meaning you can place a <ul> or <ol> inside an <li>, allowing for multi-level lists (e.g., subcategories within categories).",
        "Customization: Both ordered and unordered lists can be styled using CSS. You can change the list-style type (numbers, bullets, etc.), the position of the markers, and other visual properties.",
      ],
    },
    {
      _id: 17,
      file_name: "Block and inline",
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Html+Output/Block and inline.png",
      code: "HTML/code/Block and inline.html",
      explanation:
        "In HTML, elements can be categorized as either block-level or inline elements, which affects their layout and behavior within a document. Block-level elements occupy the full width available, starting on a new line, while inline elements only take up as much width as necessary and allow other elements to sit beside them. Understanding the difference between block and inline elements is crucial for proper page layout and design.",
      topics: [
        "Block-Level Elements: Block-level elements, such as `<div>`, `<h1>` to `<h6>`, `<p>`, `<section>`, and `<article>`, start on a new line and extend the full width of their parent container. They create a new block in the document flow.",
        "Inline Elements: Inline elements, such as `<span>`, `<a>`, `<strong>`, `<em>`, and `<img>`, do not start on a new line and only take up as much width as necessary. They can sit next to other inline elements within the same line.",
        "Block vs. Inline Characteristics: Block elements can contain other block and inline elements, while inline elements can only contain other inline elements. This distinction is important for structuring content correctly.",
        "CSS Display Property: The `display` property in CSS can change how an element behaves. For example, `display: block;` makes an inline element behave like a block element, while `display: inline;` allows a block element to behave like an inline element.",
        "Common Use Cases: Block elements are often used for larger structural elements, while inline elements are used for styling or marking up smaller parts of text or content.",
      ],
    },
  ];
  const data = await Promise.all(
    files.map(async (file) => ({
      _id: file._id,
      output:file.output,
      file_name: file.file_name,
      code: await sendCode(file.code), // Ensure this points to the correct path
      explanation: file.explanation,
      topics: file.topics
    }))
  );

  res.status(200).json(data); // Correct response
} catch (error) {
  console.error("Error processing request:", error);
  res.json({ message: "Server error" }); // Correct error response
}

});
module.exports = app;
