// ==========================================
// MediCare Signup Page - JavaScript Code
// ==========================================

// Create floating medical icons
function createMedicalIcons() {
    const container = document.getElementById('medicalIcons');
    const icons = ['⚕️', '🏥', '💊', '🩺', '💉', '🔬', '❤️', '🧬', '⚗️', '🩹'];
    
    for (let i = 0; i < 20; i++) {
        const icon = document.createElement('div');
        icon.className = 'floating-icon';
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.left = Math.random() * 100 + '%';
        icon.style.top = Math.random() * 100 + '%';
        icon.style.animationDelay = Math.random() * 5 + 's';
        icon.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(icon);
    }
}

// Toggle password visibility
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleBtn = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Check password strength and criteria
function checkPasswordStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    // Check each criteria
    const hasLength = password.length >= 10;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Update criteria indicators
    updateCriteria('criteria-length', hasLength);
    updateCriteria('criteria-uppercase', hasUppercase);
    updateCriteria('criteria-lowercase', hasLowercase);
    updateCriteria('criteria-number', hasNumber);
    updateCriteria('criteria-special', hasSpecial);

    // Calculate strength
    let strength = 0;
    if (hasLength) strength += 20;
    if (hasUppercase) strength += 20;
    if (hasLowercase) strength += 20;
    if (hasNumber) strength += 20;
    if (hasSpecial) strength += 20;

    strengthBar.style.width = strength + '%';

    if (strength < 60) {
        strengthBar.style.background = '#ef5350';
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#ef5350';
    } else if (strength < 100) {
        strengthBar.style.background = '#ffa726';
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#ffa726';
    } else {
        strengthBar.style.background = '#4caf50';
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#4caf50';
    }

    if (password.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
    }

    return hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
}

// Update criteria item status
function updateCriteria(elementId, isValid) {
    const element = document.getElementById(elementId);
    if (isValid) {
        element.classList.add('valid');
        element.querySelector('.criteria-icon').textContent = '✓';
    } else {
        element.classList.remove('valid');
        element.querySelector('.criteria-icon').textContent = '○';
    }
}

// Password input listener
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function(e) {
            checkPasswordStrength(e.target.value);
        });
    }
    
    // Initialize medical icons
    createMedicalIcons();
});

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 6000);
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = '✅ ' + message;
    successDiv.style.display = 'block';
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length >= 10;
}

// Handle signup
function handleSignup() {
    // Get all form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const emergency = document.getElementById('emergency').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const zip = document.getElementById('zip').value.trim();
    const insuranceProvider = document.getElementById('insuranceProvider').value.trim();
    const policyNumber = document.getElementById('policyNumber').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Validation - Required fields
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !emergency || !address || !city || !zip || !password || !confirmPassword) {
        showError('Please fill in all required fields marked with *');
        return;
    }

    // Validate names
    if (firstName.length < 2 || lastName.length < 2) {
        showError('First and last name must be at least 2 characters');
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Validate phone
    if (!validatePhone(phone)) {
        showError('Please enter a valid 10-digit phone number');
        return;
    }

    // Validate emergency contact
    if (!validatePhone(emergency)) {
        showError('Please enter a valid emergency contact number');
        return;
    }

    // Validate age (must be 13+)
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 13) {
        showError('You must be at least 13 years old to register');
        return;
    }

    // Validate zip code
    if (zip.length < 5) {
        showError('Please enter a valid zip code');
        return;
    }

    // Password validation
    if (password.length < 10) {
        showError('Password must be at least 10 characters long');
        return;
    }

    // Check all password criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase) {
        showError('Password must contain at least one uppercase letter');
        return;
    }

    if (!hasLowercase) {
        showError('Password must contain at least one lowercase letter');
        return;
    }

    if (!hasNumber) {
        showError('Password must contain at least one number');
        return;
    }

    if (!hasSpecial) {
        showError('Password must contain at least one special character (!@#$%^&*)');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    // Check terms acceptance
    if (!terms) {
        showError('You must accept the Terms of Service and Privacy Policy');
        return;
    }

    // All validations passed - proceed with signup
    const signupBtn = document.querySelector('.signup-btn');
    signupBtn.textContent = 'Creating Your Account...';
    signupBtn.disabled = true;

    // Prepare data for submission
    const patientData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender,
        bloodGroup: bloodGroup,
        emergencyContact: emergency,
        address: address,
        city: city,
        zipCode: zip,
        insurance: {
            provider: insuranceProvider,
            policyNumber: policyNumber
        },
        password: password,
        termsAccepted: terms,
        registrationDate: new Date().toISOString()
    };

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Success
        console.log('Patient Data:', patientData);
        showSuccess(`Welcome to MediCare, ${firstName}! Your patient account has been created successfully. You can now book appointments and access our healthcare services.`);
        
        signupBtn.textContent = 'Complete Registration';
        signupBtn.disabled = false;

        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

        // In production, use fetch API:
        /*
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccess(`Welcome to MediCare, ${firstName}! Your account has been created.`);
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showError(data.message || 'Registration failed. Please try again.');
                signupBtn.textContent = 'Complete Registration';
                signupBtn.disabled = false;
            }
        })
        .catch(error => {
            showError('Registration failed. Please try again.');
            signupBtn.textContent = 'Complete Registration';
            signupBtn.disabled = false;
        });
        */
    }, 2000);
}

// Handle Enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSignup();
    }
});

// Auto-format phone number (optional enhancement)
function formatPhoneNumber(input) {
    const phoneInput = input;
    let value = phoneInput.value.replace(/\D/g, '');
    
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    phoneInput.value = value;
}

// Add phone formatting listeners
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const emergencyInput = document.getElementById('emergency');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    if (emergencyInput) {
        emergencyInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
});