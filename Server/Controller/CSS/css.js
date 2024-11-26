const express = require("express");
const app = express.Router();
const fs = require('fs').promises;
const path =require('path');


app.get("/",async (req, res) => {
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
  try{
  /*give id to user to access perticular object use sendphoto and send code function to send photo and code*/
  const files = [
    {
      _id: 1,
      file_name: "Link CSS",
      code: [
        {
          function_code: "Public/CSS/code/Link css/Link css.css",
          function_name: "Link CSS",
        },
        {
          function_code: "Public/CSS/code/Link css/linkcss.html",
          function_name: "linkcss",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Link css.png"
        },
      ],
      explanation:
        "In CSS, links are styles applied to the `<a>` (anchor) tag, which is used to create hyperlinks in HTML documents. Styling links can enhance their appearance and improve user experience by indicating interactivity. CSS allows you to change the color, font, background, and many other properties of links, as well as apply different styles for their various states, such as normal, hover, visited, and active.",
      topics: [
        "Basic Link Styles: You can set the default color and text decoration of links using CSS properties like `color` and `text-decoration`. For example, you can make links blue and remove the underline by setting `text-decoration: none;`.",
        "Link States: CSS allows you to style links based on their states: `:link` for unvisited links, `:visited` for visited links, `:hover` when the mouse hovers over a link, and `:active` when a link is clicked. This enhances user feedback.",
        "Customizing Hover Effects: You can create visually engaging effects on links using the `:hover` pseudo-class to change colors, add underlines, or apply transitions for smooth effects.",
        "Visited Links: Styling visited links can help users differentiate between links they've already clicked. However, due to privacy concerns, browsers may limit the styles that can be applied to visited links.",
        "Best Practices: Use color contrast for links to ensure they are easily visible and distinguishable from regular text. Consistency in link styles across your website enhances usability and accessibility.",
      ],
    },
    {
      _id: 2,
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/inligement.png",
      file_name: "Alignment",
      code: "Public/CSS/code/alignment/inligement.html",
      explanation:
        "Alignment in CSS refers to the positioning of elements within a container or relative to each other. It is crucial for creating visually appealing layouts and ensuring that content is organized and easy to read. CSS provides several properties to control the alignment of text, inline elements, block elements, and flex or grid containers, allowing for precise control over the layout of a webpage.",
      topics: [
        "Text Alignment: The `text-align` property is used to control the horizontal alignment of text within a block container. Common values include `left`, `right`, `center`, and `justify`, affecting how text flows within its containing element.",
        "Vertical Alignment: The `vertical-align` property is primarily used for aligning inline elements or table cell content. It can take values like `top`, `middle`, `bottom`, and `baseline` to control vertical positioning.",
        "Flexbox Alignment: CSS Flexbox provides properties like `justify-content`, `align-items`, and `align-self` to control the alignment of items in a flex container. This allows for complex layouts with flexible positioning of elements.",
        "Grid Alignment: CSS Grid layout uses properties like `justify-items`, `align-items`, `justify-content`, and `align-content` to manage the alignment of grid items within a grid container, allowing for precise control over placement.",
        "Best Practices: Consistent alignment contributes to a clean and organized layout. Ensure that text and elements are aligned in a way that enhances readability and improves user experience.",
      ],
    },
    {
      _id: 3,
      
      file_name: "Border",
      code: [
        {
          function_code: "Public/CSS/code/Border/border,height,width and background.html",
          function_name: "border,height,width and background",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/border,height,width and background.png"
        },
        {
          function_code: "Public/CSS/code/Border/border.html",
          function_name: "border",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Border.png",
        },
      ],
      explanation:
        "Borders in CSS are used to define the edges of an element, providing a visual separation from surrounding content. The `border` property allows you to customize the style, width, and color of borders, enhancing the design and structure of web elements. Borders can be applied to various HTML elements, helping to create a defined layout and improve user interface aesthetics.",
      topics: [
        "Border Properties: The main properties for borders are `border-style`, `border-width`, and `border-color`. These can be combined into a shorthand `border` property to set all three at once.",
        "Border Style: The `border-style` property allows you to define the type of border, with options like `solid`, `dotted`, `dashed`, `double`, `groove`, `ridge`, `inset`, and `outset`. Each style creates a different visual effect.",
        "Border Width: The `border-width` property determines the thickness of the border, which can be set using length units (e.g., `px`, `em`) or keywords (`thin`, `medium`, `thick`).",
        "Border Radius: The `border-radius` property is used to create rounded corners for borders, enhancing the visual appeal of elements. It accepts values in pixels or percentages to control the curvature.",
        "Best Practices: Use borders strategically to create emphasis, separate content, or improve layout clarity. Ensure that border colors and styles align with the overall design aesthetic of the website.",
      ],
    },
    {
      _id: 4,
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Button.png",
      file_name: "pseudo-classes",
      code: "Public/CSS/code/Button/button.html",
      explanation:
        "In CSS, pseudo-classes such as `:hover`, `:visited`, and `:active` are used to define styles for elements in different states, particularly for links (`<a>` tags`). These pseudo-classes enhance user interaction by providing visual feedback when a user interacts with links, improving the overall user experience on a webpage.",
      topics: [
        "Hover State: The `:hover` pseudo-class applies styles when the user hovers their mouse over an element. This is commonly used to change the color, background, or other properties of a link to indicate that it is interactive.",
        "Visited State: The `:visited` pseudo-class applies styles to links that have been clicked and visited by the user. This can help users distinguish between links they have already explored and those they have not, although certain styles (like color) are limited for privacy reasons.",
        "Active State: The `:active` pseudo-class applies styles when an element is being activated by the user, such as during a mouse click or touch action. This provides immediate feedback that an action is being performed, enhancing interactivity.",
        "Combining States: You can combine these pseudo-classes to create more complex interactions. For example, a link can have different colors for `:link`, `:visited`, `:hover`, and `:active` states, providing a clear visual hierarchy.",
        "Best Practices: Use these pseudo-classes to enhance user interaction and feedback. Ensure that color contrasts are sufficient for accessibility and that the styles are consistent with your overall design.",
      ],
    },
    {
      _id: 5,
      file_name: "Color",
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/color.png",
      code: "Public/CSS/code/Colors/color properties.html",
      explanation:
        "In CSS, the `color` property is used to set the color of text within an element. Color can be specified using various methods, including color names, hexadecimal values, RGB, RGBA, HSL, and HSLA. Proper use of color enhances the visual appeal of a webpage, improves readability, and can convey meaning or emphasis in content.",
      topics: [
        "Color Formats: You can specify colors using different formats: named colors (like `red`, `blue`), hexadecimal values (e.g., `#ff0000` for red), RGB (e.g., `rgb(255, 0, 0)`), RGBA (which includes an alpha channel for transparency), HSL (Hue, Saturation, Lightness), and HSLA.",
        "Text Color: The `color` property primarily affects the text color of an element. It can be applied to any HTML element containing text, such as headings, paragraphs, and links.",
        "Background Color: The `background-color` property sets the background color of an element, which can help create contrast between text and its background, enhancing readability.",
        "Color Contrast: High contrast between text color and background color is essential for accessibility, ensuring that text is readable by users with visual impairments. Tools are available to check color contrast ratios.",
        "Best Practices: Use a consistent color palette throughout your website to maintain visual coherence. Consider the psychological effects of colors when designing for user experience and branding.",
      ],
    },
    {
      _id: 6,
      file_name: "flex box",
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/flex box.png",
      code: "Public/CSS/code/Flex box/flexbox.html",
      explanation:
        "Flexbox, or the Flexible Box Layout, is a CSS layout model that allows for responsive design and efficient arrangement of elements within a container. By enabling items to align, distribute space, and adapt to different screen sizes, Flexbox simplifies the process of creating complex layouts without relying on floats or positioning. It is particularly useful for designing one-dimensional layouts, either in rows or columns.",
      topics: [
        "Flex Container: To use Flexbox, you define a flex container using `display: flex;` or `display: inline-flex;`. This establishes a new flex context for its direct children, known as flex items.",
        "Flex Direction: The `flex-direction` property determines the direction of the flex items within the container. It can be set to `row` (default), `row-reverse`, `column`, or `column-reverse` to control the flow of items.",
        "Justify Content: The `justify-content` property aligns flex items along the main axis. Common values include `flex-start`, `flex-end`, `center`, `space-between`, and `space-around`, allowing for efficient spacing and distribution.",
        "Align Items: The `align-items` property controls alignment along the cross axis (perpendicular to the main axis). Options include `flex-start`, `flex-end`, `center`, `baseline`, and `stretch`, affecting how items are positioned within the container.",
        "Flex Grow, Shrink, and Basis: Each flex item can be customized using the `flex` shorthand property, which combines `flex-grow` (how much a flex item will grow relative to others), `flex-shrink` (how much it will shrink), and `flex-basis` (the initial size before space distribution).",
      ],
    },
    {
      _id: 7,
      file_name: "Floats",
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/float.png",
      code: "Public/CSS/code/Float/float.html",
      explanation:
        "In CSS, the `float` and `position` properties are used to control the layout of elements on a webpage, enabling designers to create various positioning effects. The `float` property allows elements to be taken out of the normal document flow, enabling text and inline elements to wrap around them. The `position` property defines how an element is positioned in relation to its normal position or the viewport, offering options for static, relative, absolute, fixed, and sticky positioning.",
      topics: [
        "Float Property: The `float` property allows elements to be aligned to the left or right of their containing element, with text or other inline elements flowing around them. Common values are `left`, `right`, and `none`, which removes the float.",
        "Clearing Floats: When using float, you may encounter layout issues where elements overlap. The `clear` property can be used to prevent elements from wrapping around floated elements, with values like `left`, `right`, `both`, or `none` to control the behavior.",
        "Position Property: The `position` property determines how an element is positioned in relation to its containing element or the viewport. Key values include `static` (default positioning), `relative`, `absolute`, `fixed`, and `sticky`.",
        "Relative Positioning: When an element is set to `position: relative;`, it is positioned relative to its normal position, allowing you to adjust its position using `top`, `right`, `bottom`, and `left` properties without affecting surrounding elements.",
        "Absolute and Fixed Positioning: `position: absolute;` positions an element relative to its nearest positioned ancestor (not static), while `position: fixed;` positions it relative to the viewport, keeping it in a fixed position even when scrolling.",
      ],
    },
    {
      _id: 8,
      file_name: "Font property",
      code: [
        {
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/font-1.png",
          function_code: "Public/CSS/code/Font property/font size.html",
          function_name: "font size",
        },
        {
          function_code:  "Public/CSS/code/Font property/font.html",
          function_name: "font",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/font-2.png"
        }
      ],
      explanation:
        "The `font` property in CSS is a shorthand property that allows you to set various font-related properties for text in a single declaration. This includes specifying the font style, variant, weight, size, line height, and family. Proper use of the `font` property enhances typography on a webpage, improving readability and overall design aesthetics.",
      topics: [
        "Font Style: The `font-style` property specifies the style of the font, with common values including `normal`, `italic`, and `oblique`. This property can give text a different appearance and convey emphasis.",
        "Font Variant: The `font-variant` property controls the use of small-caps for text. It can be set to `normal` or `small-caps`, providing a stylistic choice for headings or emphasized text.",
        "Font Weight: The `font-weight` property defines the thickness of the text. Values can be specified as `normal`, `bold`, or numeric values ranging from 100 to 900, allowing for precise control over text appearance.",
        "Font Size: The `font-size` property sets the size of the text, which can be defined using various units like `px`, `em`, `rem`, `%`, or `pt`. This property is crucial for ensuring text is legible across different devices.",
        "Font Family: The `font-family` property specifies the typeface used for the text. You can define multiple font families as fallbacks to ensure that text displays correctly if the preferred font is unavailable.",
      ],
    },
    {
      _id: 9,
      file_name: "Gradient",
      code: "Public/CSS/code/gradient/gradient.html",
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Gradient.png",
      explanation:
        "Gradients in CSS are used to create smooth transitions between two or more colors, enhancing the visual appeal of backgrounds, borders, and other elements. Gradients can be linear or radial and are defined using the `background` property, allowing for creative and dynamic designs without the need for images.",
      topics: [
        "Linear Gradients: A linear gradient transitions colors along a straight line. You can specify the direction of the gradient (e.g., `to right`, `to bottom left`) and the color stops to define the colors involved in the gradient.",
        "Radial Gradients: A radial gradient transitions colors outward in a circular pattern from a central point. You can control the shape (circle or ellipse), position, and color stops to achieve various effects.",
        "Color Stops: Color stops are defined in the gradient syntax and specify the colors and their positions within the gradient. You can use percentages or lengths to define where each color should start or end.",
        "Browser Compatibility: Gradients are widely supported in modern browsers, but it's important to include fallback options for older browsers that may not support CSS gradients.",
        "Best Practices: Use gradients thoughtfully to enhance design without overwhelming users. Consider the overall color scheme and ensure that gradients complement the content rather than distract from it.",
      ],
    },
    {
      _id: 10,
      file_name: "Grid",
      code: [
        {
          function_code: "Public/CSS/code/Grid/grid.html",
          function_name: "grid",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Grid.png"
        },
        {
          function_code: "Public/CSS/code/Grid/grid marge.html",
          function_name: "grid Merge",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Grind merge.png"
        },
        {
          function_code: "Public/CSS/code/Grid/grid responsive.html",
          function_name: "grid responsive",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Grind responsive.png"
        }
        ,{
          function_code: "Public/CSS/code/Grid/grid template.html",
          function_name: "grid template",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Grind template.png"
        }
        ,{
          function_code: "Public/CSS/code/Grid/grid templet.html",
          function_name: "grid templet",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Grid templat.png"
        },
      ],
      explanation:
        "CSS Grid Layout is a powerful layout system that allows for the creation of complex two-dimensional layouts with ease. It enables designers to define rows and columns, allowing for precise control over the placement and alignment of elements within a container. By using grid templates, areas, and gaps, CSS Grid makes it possible to create responsive designs that adapt seamlessly to different screen sizes.",
      topics: [
        "Grid Container: To create a grid layout, you define a grid container using `display: grid;` or `display: inline-grid;`. This establishes a grid context for its direct children, known as grid items.",
        "Grid Template Columns and Rows: The `grid-template-columns` and `grid-template-rows` properties define the structure of the grid, specifying the size of each column and row. You can use fixed units (like `px` or `fr` for fractional units) or flexible values (like `auto`).",
        "Grid Areas: The `grid-template-areas` property allows you to define named grid areas, making it easier to place items within the grid. This enhances readability and simplifies the layout structure.",
        "Placement of Grid Items: You can control the placement of grid items using properties like `grid-column` and `grid-row`, specifying where an item should start and end within the grid.",
        "Responsive Design with Grid: CSS Grid is particularly effective for responsive design. You can use media queries to adjust grid properties, allowing for different layouts on various screen sizes.",
      ],
    },
    {
      _id: 11,
      file_name: "Media Query",
      output:["https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Media-1.png","https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Media-2.png","https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Media-3.png"],
      code: "Public/CSS/code/media query/media query.html",
      explanation:
        "Media queries in CSS are a powerful feature used to apply different styles to a webpage based on specific conditions, such as viewport size, device orientation, resolution, and more. This allows for responsive design, enabling websites to adapt their layout and appearance across various devices and screen sizes, enhancing user experience.",
      topics: [
        "Basic Syntax: A media query consists of the `@media` rule followed by conditions and a block of CSS styles. For example, `@media (max-width: 600px) { /* styles */ }` applies styles when the viewport width is 600 pixels or less.",
        "Breakpoints: Breakpoints are specific points at which the layout of the website changes to accommodate different screen sizes. Common breakpoints include mobile (up to 600px), tablet (600px to 900px), and desktop (900px and above).",
        "Logical Operators: Media queries can use logical operators like `and`, `not`, and `only` to combine multiple conditions. For example, `@media screen and (min-width: 600px) and (max-width: 900px) { /* styles */ }` applies styles for screens between 600px and 900px.",
        "Device Orientation: Media queries can target device orientation using conditions like `orientation: portrait` or `orientation: landscape`, allowing for styles to adjust based on how a device is held.",
        "Best Practices: Use media queries strategically to ensure a seamless user experience across devices. Organize media queries to follow a mobile-first approach, starting with styles for smaller screens and scaling up for larger devices.",
      ],
    },
    {
      _id: 12,
      file_name: "Selector",
      code: [
        {
          function_code: "Public/CSS/code/Selector/after pseudo selector.html",
          function_name: "after pseudo selector",
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/after sepudo selector.png"
        },
        {
          function_code: 
            "Public/CSS/code/Selector/attributs and nth child pseudo selectors.html"
          ,
          output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/nth child.png",
          function_name: "pseudo selectors",
        }
      ],
      explanation:
        "In CSS, selectors are patterns used to select and apply styles to specific elements in an HTML document. They provide a way to target elements based on various criteria, such as element type, class, ID, attributes, and more. Understanding how to use selectors effectively is essential for applying styles correctly and efficiently in web design.",
      topics: [
        "Type Selector: A type selector targets all elements of a specific type (e.g., `p` for paragraphs, `h1` for headings). This applies styles to every instance of that element within the document.",
        "Class Selector: A class selector is defined with a period (`.`) followed by the class name (e.g., `.classname`). It applies styles to any element that has the specified class attribute, allowing for more flexible styling across different elements.",
        "ID Selector: An ID selector is defined with a hash (`#`) followed by the ID name (e.g., `#idname`). It targets a unique element with that specific ID attribute, making it ideal for applying styles to a single element on a page.",
        "Attribute Selector: Attribute selectors target elements based on the presence or value of specific attributes (e.g., `[type=text]` selects input elements with a type attribute of 'text'). This allows for more granular styling based on attributes.",
        "Combinators: Combinators define the relationship between selectors, including descendant selectors (e.g., `div p` targets all `<p>` elements inside `<div>` elements), child selectors (e.g., `div > p` targets only direct child `<p>` elements), and sibling selectors (e.g., `h1 + p` targets the first `<p>` element immediately following an `<h1>`).",
      ],
    },
    {
      file_name: "Shadow",
      _id: 13,
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Shadow.png",
      code: "Public/CSS/code/Shadow/shadow.html",
      explanation:
        "Shadows in CSS are used to create depth and dimension by adding a shadow effect to elements, enhancing their visual appeal and making them stand out from the background. CSS provides two main properties for shadows: `box-shadow` for elements and `text-shadow` for text, allowing for customization of the shadow's color, offset, blur, and spread.",
      topics: [
        "Box Shadow: The `box-shadow` property adds a shadow effect around an element's box. It accepts values for horizontal offset, vertical offset, blur radius, spread radius, and color (e.g., `box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);`).",
        "Text Shadow: The `text-shadow` property adds a shadow effect to text. It has similar parameters as `box-shadow`, including horizontal and vertical offsets, blur radius, and color (e.g., `text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);`).",
        "Shadow Color: Shadows can be made more visually appealing by using colors with transparency (using RGBA or HSLA) to create a softer effect that blends with the background.",
        "Multiple Shadows: CSS allows you to apply multiple shadows to an element by separating each shadow with a comma (e.g., `box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5), -2px -2px 5px rgba(255, 255, 255, 0.5);`). This creates a more complex and visually interesting effect.",
        "Best Practices: Use shadows sparingly to enhance design without overwhelming users. Ensure that shadows complement the overall color scheme and maintain good readability for text.",
      ],
    },
    {
      _id: 14,
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/transeform-2.png",
      file_name: "Transeform",
      code: "Public/CSS/code/Transeform/transform.html",
      explanation:
        "The `transform` property in CSS is used to apply various transformations to an element, such as translation, rotation, scaling, and skewing. This property enables developers to create dynamic and visually engaging effects without needing complex animations or additional markup. Transforms can be applied individually or combined for more complex visual effects.",
      topics: [
        "Translation: The `translate()` function moves an element from its original position along the X and Y axes. For example, `transform: translate(50px, 100px);` moves the element 50 pixels to the right and 100 pixels down.",
        "Rotation: The `rotate()` function rotates an element around a specified point (the origin) by a given angle. For instance, `transform: rotate(45deg);` rotates the element 45 degrees clockwise.",
        "Scaling: The `scale()` function resizes an element based on a scale factor. For example, `transform: scale(1.5);` increases the element's size by 50%, while `transform: scale(0.5);` reduces it by 50%. You can also scale in different dimensions using `scaleX()` and `scaleY()`.",
        "Skewing: The `skewX()` and `skewY()` functions tilt an element along the X or Y axis, creating a slanted appearance. For example, `transform: skew(20deg, 10deg);` skews the element 20 degrees horizontally and 10 degrees vertically.",
        "Combining Transforms: Multiple transformations can be applied in a single `transform` property by separating each function with a space. For example, `transform: translate(50px, 100px) rotate(45deg) scale(1.5);` combines translation, rotation, and scaling for a more dynamic effect.",
      ],
    },
    {
      _id: 15,
      file_name: "Variable",
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/Variable.png",
      code: "Public/CSS/code/Variable/variable.html",
      explanation:
        "CSS variables, also known as custom properties, allow you to store values that can be reused throughout your stylesheet. This feature enhances maintainability and consistency in your designs by enabling you to define a value once and reference it multiple times. Variables can be updated dynamically using JavaScript, making them a powerful tool for responsive and interactive web design.",
      topics: [
        "Defining Variables: CSS variables are defined using a custom property notation, which starts with two dashes (`--`). For example, `--main-color: #3498db;` defines a variable called `--main-color` with a specific color value.",
        "Using Variables: To use a CSS variable, you employ the `var()` function. For example, `color: var(--main-color);` applies the value of `--main-color` to the text color of an element.",
        "Scope of Variables: CSS variables are scoped to the element where they are defined. If defined in a selector, they can be accessed by that element and its children, while global variables can be defined in the `:root` pseudo-class for universal access.",
        "Fallback Values: The `var()` function allows you to provide a fallback value if the variable is not defined. For example, `color: var(--main-color, #000);` will use `#000` as the fallback if `--main-color` is not set.",
        "Dynamic Updates: CSS variables can be changed dynamically with JavaScript, allowing for real-time updates to styles. For example, `document.documentElement.style.setProperty('--main-color', '#e74c3c');` changes the value of `--main-color` to a new color.",
      ],
    },
    {
      _id: 16,
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/z-index.png",
      file_name: "Z-index",
      code: "Public/CSS/code/Z-index/z-index.html",
      explanation:
        "The `z-index` property in CSS controls the stacking order of overlapping elements along the z-axis (the axis perpendicular to the screen). Elements with a higher `z-index` value are positioned in front of those with a lower value, allowing developers to manage how elements appear in relation to one another. It only applies to positioned elements (elements with a `position` value other than `static`).",
      topics: [
        "Stacking Context: A stacking context is formed by an element that has a `position` value of `relative`, `absolute`, `fixed`, or `sticky`, along with a `z-index` value other than `auto`. This context determines the stacking order of its children, regardless of their `z-index` values in relation to other elements outside this context.",
        "Setting Z-Index: The `z-index` property can take integer values (positive, negative, or zero). For example, `z-index: 10;` positions an element above other elements with lower `z-index` values, while `z-index: -1;` places it behind other elements.",
        "Default Value: The default value of `z-index` is `auto`, which means the stacking order is determined by the order of the elements in the HTML. Elements later in the document flow will be positioned on top of those that come before.",
        "Use Cases: The `z-index` property is commonly used in modals, dropdowns, tooltips, and other overlapping elements where precise control of visibility is required.",
        "Best Practices: Use `z-index` thoughtfully to avoid confusion and maintain clear layering of elements. Overusing `z-index` can lead to complicated stacking contexts and difficult-to-maintain code.",
      ],
    },
    {
      _id: 17,
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Css+output/center element.png",
      file_name: "Center element",
      code: "Public/CSS/code/Center element/Center.html",
      explanation:
        "Centering elements in CSS can be achieved using various techniques depending on the type of element (block or inline), its display property, and the desired alignment (horizontally or vertically). Effective centering enhances layout and design consistency, making it essential for creating visually appealing web pages.",
      topics: [
        "Centering Block Elements Horizontally: For block-level elements, you can center them by setting `margin: auto;` and defining a specific width. For example, `width: 50%; margin: auto;` will center a block element within its parent container.",
        "Centering Inline Elements: To center inline elements, you can use `text-align: center;` on the parent container. This will center all inline elements (like `<span>` or `<a>`) within that container.",
        "Vertical Centering with Flexbox: Using Flexbox, you can easily center elements both horizontally and vertically. By setting `display: flex;` and `align-items: center;` and `justify-content: center;` on the parent container, child elements will be perfectly centered.",
        "Vertical Centering with Grid: CSS Grid also provides an easy way to center elements. By defining a grid container with `display: grid;` and using `align-items: center;` and `justify-items: center;`, all grid items will be centered within their respective cells.",
        "Absolute Positioning: You can center an element absolutely within its parent by setting `position: absolute;`, then using `top: 50%; left: 50%;` along with `transform: translate(-50%, -50%);` to perfectly center it regardless of its size.",
      ],
    },
  ];
  const data = await Promise.all(
    files.map(async (file) => ({
      _id: file._id,
      file_name: file.file_name,
      code: await sendCode(file.code), 
      explanation: file.explanation,
      topics: file.topics,
      output: file.output || [] // Default to empty array if output is undefined
    }))
  );

  res.status(200).json(data);
} catch (error) {
  console.error("Error processing request:", error);
  res.status(500).json({ message: "Server error", error: error.message }); // Improved error response
}
});

module.exports = app;
