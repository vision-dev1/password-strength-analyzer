# PassStrength - Modern Password Analyzer

PassStrength is a sleek, client-side password strength analyzer built with zero dependencies. It provide real-time security analysis using entropy-based scoring, pattern detection, and common password blacklisting.

![PassStrength Demo](/home/vision/.gemini/antigravity/brain/a7849447-0569-44ca-b68b-618f9f55fc73/final_screenshot_1769156224171.png)

## ✨ Features

- **🛡️ Real-time Analysis**: Instant feedback as you type.
- **📊 Entropy Scoring**: Calculates password strength based on information theory (bits of entropy).
- **🚫 Common Password Detection**: Rejects over 50+ widely used weak passwords.
- **🌓 Dark Mode**: Built-in light/dark theme toggle with system preference detection and localStorage persistence.
- **👁️ Visibility Toggle**: Show or hide your password with a single click.
- **✅ Requirements Checklist**: Visual feedback for length, casing, numbers, and symbols.
- **📱 Fully Responsive**: Optimized for both mobile and desktop screens.
- **♿ Accessible**: ARIA labels, semantic HTML, and full keyboard navigation support.

## 🚀 Getting Started

Since this is a vanilla project, you don't need any build steps.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/PassStrength.git
   cd PassStrength
   ```

2. **Open index.html**:
   Simply open `index.html` in your favorite web browser, or serve it locally:
   ```bash
   # Using Python
   python3 -m http.server 8000
   ```

## 🧠 How It Works

PassStrength uses a multi-layered approach to evaluate password security:

### 1. Entropy Calculation
The app calculates theoretical entropy using the formula:
`E = L * log2(R)`
*Where **L** is length and **R** is character set size.*

### 2. Character Variety
We check for four main categories:
- Lowercase letters (a-z)
- Uppercase letters (A-Z)
- Numbers (0-9)
- Special characters (!@#$%^&...)

### 3. Pattern Recognition
Points are deducted for predictable patterns:
- **Repeated Characters**: e.g., `aaaaa`
- **Sequences**: e.g., `123`, `abc`, `qwerty`

### 4. Blacklist Override
Even if a password has high entropy, it will be marked as **Very Weak** if it appears in our common passwords list.

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for structure and accessibility.
- **CSS3**: Modern styling with CSS variables, Glassmorphism, and smooth transitions.
- **Vanilla JavaScript**: Pure logic for analysis and DOM manipulation (No frameworks/libraries).

## 🔒 Privacy & Security

**Privacy is a priority.** 
- No data is ever sent to any server.
- All analysis happens strictly in your browser.
- No analytics or external tracking scripts are used.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
