document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const toggleVisibility = document.getElementById('toggleVisibility');
    const passwordWrapper = toggleVisibility.parentElement;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const entropyText = document.getElementById('entropyText');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const themeToggle = document.getElementById('themeToggle');
    const checklistItems = document.querySelectorAll('#requirementsChecklist li');

    const commonPasswords = [
        'password', '123456', '12345678', '123456789', 'qwerty', 'admin', 'welcome',
        'login', 'password123', 'admin123', 'monkey', 'dragon', 'football', 'letmein'
    ];

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    toggleVisibility.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        passwordWrapper.classList.toggle('visible');

        const label = type === 'password' ? 'Show password' : 'Hide password';
        toggleVisibility.setAttribute('aria-label', label);
    });

    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        analyzePassword(password);
    });

    function analyzePassword(pwd) {
        if (!pwd) {
            resetUI();
            return;
        }

        const stats = calculateStats(pwd);
        const score = calculateScore(pwd, stats);
        const feedback = generateFeedback(pwd, stats, score);

        updateUI(score, feedback, stats);
    }

    function calculateStats(pwd) {
        return {
            length: pwd.length,
            hasUpper: /[A-Z]/.test(pwd),
            hasLower: /[a-z]/.test(pwd),
            hasNumber: /[0-9]/.test(pwd),
            hasSpecial: /[^A-Za-z0-9]/.test(pwd),
            isCommon: commonPasswords.includes(pwd.toLowerCase())
        };
    }

    function calculateScore(pwd, stats) {
        if (stats.isCommon) return 0;

        let score = 0;

        if (stats.hasUpper) score += 1;
        if (stats.hasLower) score += 1;
        if (stats.hasNumber) score += 1;
        if (stats.hasSpecial) score += 1;

        if (stats.length >= 12) score += 1;
        if (stats.length >= 16) score += 1;

        const hasRepeating = /(.)\1{2,}/.test(pwd);
        if (hasRepeating) score -= 1;

        const hasSequence = /123|abc|password|qwerty/i.test(pwd);
        if (hasSequence) score -= 1;

        return Math.max(0, Math.min(4, Math.floor(score * 0.8)));
    }

    function calculateEntropy(pwd) {
        if (!pwd) return 0;
        let charsetSize = 0;
        if (/[a-z]/.test(pwd)) charsetSize += 26;
        if (/[A-Z]/.test(pwd)) charsetSize += 26;
        if (/[0-9]/.test(pwd)) charsetSize += 10;
        if (/[^A-Za-z0-9]/.test(pwd)) charsetSize += 33;

        return Math.floor(pwd.length * Math.log2(charsetSize || 1));
    }

    function generateFeedback(pwd, stats, score) {
        if (stats.isCommon) return "This is a very common password and extremely easy to crack. Please choose something unique.";

        if (score === 0) return "Too short and predictable. Try adding more characters and mixed types.";
        if (score === 1) return "Better, but still weak. Add numbers and special characters to improve security.";
        if (score === 2) return "Medium strength. Increasing length beyond 12 characters will make it much stronger.";
        if (score === 3) return "Strong password! You've got a good mix of characters.";
        if (score === 4) return "Very Strong! This password would take centuries to crack.";

        return "Keep typing...";
    }

    function updateUI(score, feedback, stats) {
        const levels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        const colors = [
            'var(--strength-0)',
            'var(--strength-1)',
            'var(--strength-2)',
            'var(--strength-3)',
            'var(--strength-4)'
        ];

        const width = (score + 1) * 20;
        strengthBar.style.width = `${width}%`;
        strengthBar.style.backgroundColor = colors[score];

        strengthText.textContent = levels[score];
        strengthText.style.color = colors[score];

        const entropy = calculateEntropy(passwordInput.value);
        entropyText.textContent = `${entropy} bits of entropy`;

        feedbackMessage.textContent = feedback;

        checklistItems.forEach(item => {
            const req = item.dataset.requirement;
            let isValid = false;

            switch (req) {
                case 'length': isValid = stats.length >= 8; break;
                case 'uppercase': isValid = stats.hasUpper; break;
                case 'lowercase': isValid = stats.hasLower; break;
                case 'numbers': isValid = stats.hasNumber; break;
                case 'special': isValid = stats.hasSpecial; break;
            }

            if (isValid) {
                item.classList.add('valid');
                item.classList.remove('invalid');
                item.querySelector('.icon').textContent = '✓';
            } else {
                item.classList.remove('valid');
                item.classList.add('invalid');
                item.querySelector('.icon').textContent = '○';
            }
        });

        if (score === 0 && passwordInput.value.length > 3) {
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 200);
        }
    }

    function resetUI() {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Very Weak';
        strengthText.style.color = 'var(--text-muted)';
        entropyText.textContent = '0 bits';
        feedbackMessage.textContent = 'Start typing to see feedback.';
        checklistItems.forEach(item => {
            item.classList.remove('valid', 'invalid');
            item.querySelector('.icon').textContent = '○';
        });
    }
});
