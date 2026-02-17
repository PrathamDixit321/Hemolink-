let allDonors = [];
let allBanks = [];
// API base URL — uses current origin when served by exact server port, else fallback to our backend
const API_BASE = (window.location.port === '4000') ? window.location.origin : 'http://localhost:4000';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromBackend();
    setupEventListeners();
    createParticles();
    animateCounters();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('searchBtn').addEventListener('click', searchDonorsAndBanks);
    document.getElementById('donorForm').addEventListener('submit', addNewDonor);
    const newBtn = document.getElementById('newDonationBtn');
    if (newBtn) newBtn.addEventListener('click', () => {
        document.getElementById('donorForm').scrollIntoView({ behavior: 'smooth' });
        document.getElementById('donorName').focus();
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
}

// Load data from backend
// Default sample data (used as a fallback when backend is unavailable)
const sampleDonors = [
    { id: 1, name: 'Rajesh Kumar', bloodType: 'O+', email: 'rajesh@email.com', phone: '9876543210', city: 'Mumbai', available: true },
    { id: 2, name: 'Priya Singh', bloodType: 'B+', email: 'priya@email.com', phone: '9876543211', city: 'Delhi', available: true },
    { id: 3, name: 'Amit Patel', bloodType: 'AB+', email: 'amit@email.com', phone: '9876543212', city: 'Bangalore', available: false }
];

const sampleBanks = [
    { id: 1, name: 'Red Cross Blood Bank', location: 'Mumbai', address: '123 Medical Plaza, Mumbai', phone: '1800-1234-5678', hours: '9 AM - 6 PM', types: ['O+', 'O-'] }
];

function loadDataFromBackend() {
    updateServerStatus('connecting');
    toggleSpinner(true);

    Promise.all([
        fetch(`${API_BASE}/api/donors`).then(res => res.json()),
        fetch(`${API_BASE}/api/banks`).then(res => res.json())
    ]).then(([donorData, bankData]) => {
        allDonors = donorData.donors || [];
        allBanks = bankData.banks || [];
        updateStats();
        updateServerStatus('online');
        document.getElementById('fallbackBanner').hidden = true;
        toggleSpinner(false);
    }).catch(err => {
        console.error('Error loading backend data:', err);
        // Fallback to sample data so users can still try the app
        allDonors = sampleDonors;
        allBanks = sampleBanks;
        // Inform user with a subtle banner instead of an alert
        document.getElementById('fallbackBanner').hidden = false;
        updateServerStatus('offline');
        toggleSpinner(false);
        updateStats();
    });
}

function updateServerStatus(state) {
    const serverStatus = document.getElementById('serverStatus');
    if (!serverStatus) return;
    serverStatus.classList.remove('online', 'offline', 'connecting');
    serverStatus.classList.add(state);
    const text = serverStatus.querySelector('.status-text');
    if (state === 'online') text.textContent = 'Server: Online';
    if (state === 'offline') text.textContent = 'Server: Offline (using sample data)';
    if (state === 'connecting') text.textContent = 'Connecting...';
}

function toggleSpinner(show) {
    const spinner = document.getElementById('spinner');
    if (!spinner) return;
    spinner.style.display = show ? 'inline-block' : 'none';
}

// Search Donors and Banks
function searchDonorsAndBanks() {
    const location = document.getElementById('locationInput').value.toLowerCase();
    const bloodType = document.getElementById('bloodTypeFilter').value;
    document.getElementById('selectedLocation').textContent = location === '' ? 'Any' : location;

    // Show loading
    document.getElementById('donorsList').innerHTML = '<p class="no-data">🔍 Searching...</p>';
    document.getElementById('banksList').innerHTML = '<p class="no-data">🔍 Searching...</p>';

    // Simulate slight delay for better UX
    toggleSpinner(true);
    setTimeout(() => {
        // Filter Donors
        let filteredDonors = allDonors.filter(donor => {
            const matchLocation = donor.city.toLowerCase().includes(location) || location === '';
            const matchBloodType = donor.bloodType === bloodType || bloodType === '';
            return matchLocation && matchBloodType && donor.available;
        });

        // Filter Banks
        let filteredBanks = allBanks.filter(bank => {
            return bank.location.toLowerCase().includes(location) || location === '';
        });

        displayDonors(filteredDonors);
        displayBanks(filteredBanks);
        toggleSpinner(false);
    }, 300);
}

// Display Donors
function displayDonors(donors) {
    const donorsList = document.getElementById('donorsList');

    if (donors.length === 0) {
        donorsList.innerHTML = '<p class="no-data">No donors found. Try searching in a different location.</p>';
        return;
    }

    donorsList.innerHTML = donors.map(donor => `
        <div class="card">
            <div class="avatar">${getInitials(donor.name)}</div>
            <div class="card-header">
                <div class="card-title">${donor.name}</div>
                <div class="blood-type">${donor.bloodType}</div>
            </div>
            <div class="card-info">
                <p><i class="fas fa-phone"></i> ${donor.phone}</p>
                <p><i class="fas fa-envelope"></i> ${donor.email}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${donor.city}</p>
                <p><i class="fas fa-check-circle"></i> Available: <strong>${donor.available ? 'Yes' : 'No'}</strong></p>
            </div>
            <button class="btn-contact" onclick="contactDonor('${donor.email}', '${donor.name}')">
                <i class="fas fa-envelope"></i> Contact Donor
            </button>
        </div>
    `).join('');
}

function getInitials(name) {
    if (!name) return 'BR';
    const parts = name.trim().split(' ');
    const initials = parts.length === 1 ? parts[0][0] : parts[0][0] + parts[1][0];
    return initials.toUpperCase();
}

// Display Banks
function displayBanks(banks) {
    const banksList = document.getElementById('banksList');

    if (banks.length === 0) {
        banksList.innerHTML = '<p class="no-data">No blood banks found in this location.</p>';
        return;
    }

    banksList.innerHTML = banks.map(bank => `
        <div class="card">
            <div class="avatar bank"><i class="fas fa-hospital"></i></div>
            <div class="card-header">
                <div class="card-title">${bank.name}</div>
            </div>
            <div class="card-info">
                <p><i class="fas fa-map-marker-alt"></i> ${bank.address}</p>
                <p><i class="fas fa-phone"></i> ${bank.phone}</p>
                <p><i class="fas fa-clock"></i> ${bank.hours}</p>
                <p><i class="fas fa-tint"></i> Available Types: ${bank.types.join(', ')}</p>
            </div>
            <button class="btn-contact" onclick="contactBank('${bank.phone}', '${bank.name}')">
                <i class="fas fa-phone"></i> Call Bank
            </button>
        </div>
    `).join('');
}

// Add New Donor - NOW SENDS TO BACKEND
function addNewDonor(e) {
    e.preventDefault();

    const name = document.getElementById('donorName').value;
    const email = document.getElementById('donorEmail').value;
    const phone = document.getElementById('donorPhone').value;
    const bloodType = document.getElementById('donorBloodType').value;
    const city = document.getElementById('donorCity').value;

    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,15}$/;

    if (!emailPattern.test(email)) {
        alert('❌ Please enter a valid email address.');
        return;
    }
    if (!phonePattern.test(phone)) {
        alert('❌ Please enter a valid phone number (10-15 digits).');
        return;
    }

    // Send to backend
    fetch(`${API_BASE}/api/register-donor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, bloodType, city })
    })
        .then(res => res.json())
        .then(data => {
            // Add to frontend array
            allDonors.push(data.donor);

            // Reset form and show success
            document.getElementById('donorForm').reset();
            alert('✅ Thank you for registering as a blood donor!');
            updateStats();
        })
        .catch(err => {
            console.error('Error registering donor:', err);
            alert('⚠️ Failed to register. Please try again.');
        });
}

// Update Stats
function updateStats() {
    const totalDonors = allDonors.length;
    const totalBanks = allBanks.length;
    const availableDonors = allDonors.filter(d => d.available).length;

    document.getElementById('totalDonors').textContent = totalDonors;
    document.getElementById('totalBanks').textContent = totalBanks;
    document.getElementById('availableDonors').textContent = availableDonors;

    // Update hero stats
    const heroTotalDonors = document.getElementById('heroTotalDonors');
    const heroTotalBanks = document.getElementById('heroTotalBanks');
    if (heroTotalDonors) heroTotalDonors.textContent = totalDonors;
    if (heroTotalBanks) heroTotalBanks.textContent = totalBanks;
}

// Switch Tabs
function switchTab(e) {
    const btn = e.currentTarget;
    const tabName = btn.getAttribute('data-tab');

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Contact Functions
function contactDonor(email, name) {
    window.location.href = `mailto:${email}?subject=Blood%20Donation%20Request&body=Hello%20${encodeURIComponent(name)},%20I%20would%20like%20to%20contact%20you%20regarding%20blood%20donation.`;
}

function contactBank(phone, bankName) {
    window.location.href = `tel:${phone}`;
}