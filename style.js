document.addEventListener('DOMContentLoaded', () => {
    const pageDiv = document.getElementById('page-div');
    const elementsList = document.getElementById('elements-list');
    const editPanelContent = document.getElementById('edit-properties-content');
    const deviceToggles = document.getElementById('device-toggles');
    const mainContainer = document.getElementById('main-container');
    const codeContainer = document.getElementById('code-container');
    const viewModeContainer = document.getElementById('view-mode-container');
    const viewModeContent = document.getElementById('view-mode-content');
    const editModeBtn = document.getElementById('editModeBtn');
    const viewModeBtn = document.getElementById('viewModeBtn');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    const copyButtons = document.querySelectorAll('.copy-btn');

    let selectedElement = null;

    // Mode Switching
    editModeBtn.addEventListener('click', () => {
        mainContainer.style.display = 'flex';
        codeContainer.style.display = 'block';
        viewModeContainer.classList.remove('active');
        editModeBtn.classList.add('active');
        viewModeBtn.classList.remove('active');
    });

    viewModeBtn.addEventListener('click', () => {
        mainContainer.style.display = 'none';
        codeContainer.style.display = 'none';
        viewModeContainer.classList.add('active');
        editModeBtn.classList.remove('active');
        viewModeBtn.classList.add('active');
        renderViewMode();
    });

    function renderViewMode() {
        // Generate and display the final HTML/CSS/JS in the view mode container
        const generatedHTML = htmlCode.value;
        const generatedCSS = `<style>${cssCode.value}</style>`;
        const generatedJS = `<script>${jsCode.value}</script>`;
        viewModeContent.innerHTML = generatedHTML + generatedCSS + generatedJS;
    }

    // Drag and Drop
    elementsList.querySelectorAll('.draggable-element').forEach(element => {
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', element.dataset.type);
        });
    });

    pageDiv.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    pageDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        const elementType = e.dataTransfer.getData('text/plain');
        if (elementType) {
            const newElement = createElement(elementType);
            pageDiv.appendChild(newElement);
            selectElement(newElement);
            updateCode();
        }
    });

    // Element Selection
    pageDiv.addEventListener('click', (e) => {
        const clickedElement = e.target.closest('#page-div > *');
        if (clickedElement) {
            selectElement(clickedElement);
        }
    });

    function selectElement(element) {
        if (selectedElement) {
            selectedElement.classList.remove('selected-element');
        }
        selectedElement = element;
        selectedElement.classList.add('selected-element');
        populateEditPanel(selectedElement);
    }

    // Element Creation
    function createElement(type) {
        let element;
        switch (type) {
            case 'button':
                element = document.createElement('button');
                element.textContent = 'Click Me';
                break;
            case 'nav':
                element = document.createElement('nav');
                element.innerHTML = '<a>Home</a><a>About</a><a>Contact</a>';
                element.style.display = 'flex';
                element.style.gap = '1rem';
                break;
            case 'toggle':
                element = document.createElement('div');
                element.classList.add('toggle');
                element.innerHTML = `<span class="toggle-switch"></span>`;
                break;
            case 'modal':
                element = document.createElement('div');
                element.classList.add('modal');
                element.innerHTML = `
                    <div class="modal-content">
                        <span class="close-btn">&times;</span>
                        <p>Modal Content</p>
                    </div>`;
                break;
            case 'card':
                element = document.createElement('div');
                element.classList.add('card');
                element.innerHTML = '<h3>Card Title</h3><p>Some text.</p>';
                break;
            case 'form':
                element = document.createElement('form');
                element.innerHTML = `
                    <input type="text" placeholder="Name"><br>
                    <textarea placeholder="Message"></textarea><br>
                    <button type="submit">Submit</button>
                `;
                element.style.display = 'flex';
                element.style.flexDirection = 'column';
                element.style.gap = '10px';
                break;
            case 'image-container':
                element = document.createElement('img');
                element.src = 'https://via.placeholder.com/150';
                element.alt = 'Placeholder image';
                element.style.width = '150px';
                element.style.height = '150px';
                break;
            case 'carousel':
                element = document.createElement('div');
                element.classList.add('carousel');
                element.innerHTML = `
                    <div class="carousel-track">
                        <div class="carousel-slide">Slide 1</div>
                        <div class="carousel-slide">Slide 2</div>
                        <div class="carousel-slide">Slide 3</div>
                    </div>
                `;
                break;
            case 'footer':
                element = document.createElement('footer');
                element.innerHTML = '<p>&copy; 2023 My Website</p>';
                element.style.textAlign = 'center';
                element.style.padding = '1rem';
                element.style.backgroundColor = '#f0f0f0';
                break;
            case 'accordion':
                element = document.createElement('div');
                element.classList.add('accordion');
                element.innerHTML = `
                    <button class="accordion-header">Section 1</button>
                    <div class="accordion-content"><p>Content for section 1.</p></div>
                `;
                break;
            case 'social-icons':
                element = document.createElement('div');
                element.classList.add('social-icons');
                element.innerHTML = `
                    <a href="#">Fb</a><a href="#">Tw</a><a href="#">Ig</a>
                `;
                element.style.display = 'flex';
                element.style.gap = '10px';
                break;
            case 'grid':
                element = document.createElement('div');
                element.classList.add('grid-container');
                element.style.display = 'grid';
                element.style.gridTemplateColumns = 'repeat(2, 1fr)';
                element.style.gap = '10px';
                element.innerHTML = `
                    <div class="grid-item">Item 1</div>
                    <div class="grid-item">Item 2</div>
                    <div class="grid-item">Item 3</div>
                `;
                break;
            case 'flex':
                element = document.createElement('div');
                element.classList.add('flex-container');
                element.style.display = 'flex';
                element.style.gap = '10px';
                element.innerHTML = `
                    <div class="flex-item">Item 1</div>
                    <div class="flex-item">Item 2</div>
                    <div class="flex-item">Item 3</div>
                `;
                break;
            default:
                element = document.createElement('div');
                element.textContent = 'New Element';
                break;
        }
        return element;
    }

    // Populate Edit Panel
    function populateEditPanel(element) {
        editPanelContent.innerHTML = '';
        if (!element) {
            editPanelContent.innerHTML = '<p class="placeholder-text">Select an element to edit its properties.</p>';
            return;
        }

        const type = element.tagName.toLowerCase();
        let properties = {};

        if (type === 'button') {
            properties = {
                'Text Content': { type: 'text', prop: 'textContent' },
                'Background Color': { type: 'color', prop: 'style.backgroundColor' },
                'Color': { type: 'color', prop: 'style.color' },
                'Border Radius': { type: 'range', prop: 'style.borderRadius', min: 0, max: 50, unit: 'px' }
            };
        } else if (type === 'img') {
            properties = {
                'Source URL': { type: 'text', prop: 'src' },
                'Alt Text': { type: 'text', prop: 'alt' },
                'Width': { type: 'text', prop: 'style.width' },
                'Height': { type: 'text', prop: 'style.height' }
            };
        } else if (['h1', 'h2', 'h3', 'p', 'span'].includes(type) || element.textContent) {
            properties = {
                'Text Content': { type: 'textarea', prop: 'textContent' },
                'Font Size': { type: 'text', prop: 'style.fontSize' },
                'Color': { type: 'color', prop: 'style.color' },
                'Line Height': { type: 'text', prop: 'style.lineHeight' }
            };
        }

        for (const label in properties) {
            const prop = properties[label];
            const div = document.createElement('div');
            div.classList.add('edit-field');
            const inputId = `edit-${label.replace(/\s/g, '-')}`;

            const labelEl = document.createElement('label');
            labelEl.textContent = label;
            labelEl.htmlFor = inputId;
            div.appendChild(labelEl);

            let input;
            if (prop.type === 'textarea') {
                input = document.createElement('textarea');
                input.value = element.textContent;
            } else {
                input = document.createElement('input');
                input.type = prop.type;
                if (prop.type === 'text') {
                    input.value = element[prop.prop] || element.style[prop.prop.split('.').pop()];
                } else if (prop.type === 'color') {
                    input.value = rgbToHex(element.style.color || '#000000');
                } else if (prop.type === 'range') {
                    input.type = 'range';
                    input.min = prop.min;
                    input.max = prop.max;
                    input.value = parseFloat(element.style[prop.prop.split('.').pop()]) || 0;
                }
            }
            input.id = inputId;
            input.addEventListener('input', (e) => {
                if (prop.prop.startsWith('style.')) {
                    const styleProp = prop.prop.split('.').pop();
                    let value = e.target.value;
                    if (prop.unit) {
                        value += prop.unit;
                    }
                    element.style[styleProp] = value;
                } else {
                    element[prop.prop] = e.target.value;
                }
                updateCode();
            });

            div.appendChild(input);
            editPanelContent.appendChild(div);
        }
    }

    function rgbToHex(rgb) {
        if (!rgb) return '#000000';
        const result = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(rgb);
        return result ? `#${(1 << 24 | result[1] << 16 | result[2] << 8 | result[3]).toString(16).slice(1)}` : rgb;
    }

    // Device Toggles
    deviceToggles.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            deviceToggles.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            pageDiv.style.width = btn.dataset.size;
        });
    });

    // Code Generation
    function updateCode() {
        let generatedHTML = '';
        let generatedCSS = '';
        let generatedJS = '';

        Array.from(pageDiv.children).forEach(el => {
            // HTML Generation
            const outerHTML = el.outerHTML;
            const style = el.getAttribute('style');
            let cleanHTML = outerHTML;
            if (style) {
                // Remove inline styles for cleaner HTML
                cleanHTML = outerHTML.replace(` style="${style}"`, '');
            }
            generatedHTML += cleanHTML + '\n';

            // CSS Generation
            if (style) {
                const className = `element-${Math.random().toString(36).substring(2, 7)}`;
                el.classList.add(className);
                const styles = el.style.cssText;
                generatedCSS += `.${className} { ${styles} }\n`;
            }
        });

        htmlCode.value = generatedHTML.trim();
        cssCode.value = generatedCSS.trim();
        // JS generation for interactive elements (simplified)
        generatedJS += `// JavaScript for interactive elements\n`;
        if (pageDiv.querySelector('.modal')) {
            generatedJS += `
document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'block'; // Make modals visible for the user
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => { modal.style.display = 'none'; }
    window.onclick = (event) => { if (event.target === modal) { modal.style.display = 'none'; } }
});
`;
        }
        if (pageDiv.querySelector('.toggle')) {
            generatedJS += `
document.querySelectorAll('.toggle').forEach(toggle => {
    toggle.onclick = () => { toggle.classList.toggle('active'); }
});
`;
        }
        jsCode.value = generatedJS.trim();
    }
    
    // Copy to Clipboard
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.dataset.target;
            const targetTextarea = document.getElementById(targetId);
            targetTextarea.select();
            document.execCommand('copy');
            btn.textContent = 'Copied!';
            setTimeout(() => {
                btn.textContent = 'Copy';
            }, 2000);
        });
    });

    // Initial state
    updateCode();
});
