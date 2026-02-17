# Blood Donor Finder 🩸

A beginner-friendly web application to find blood donors and blood banks near you.  Perfect for hackathons and learning!

## Features

✅ Search blood donors by location and blood type  
✅ Find nearby blood banks and their details  
✅ Register as a blood donor  
✅ View donor availability  
✅ Contact donors and banks directly  
✅ Real-time statistics  
✅ Responsive design (mobile-friendly)  

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express. js
- **Styling**: Modern CSS with Flexbox & Grid
- **Icons**: Font Awesome

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps

1. **Clone the repository**
```bash
git clone https://github. com/PrathamDixit321/blood-donor-finder.git
cd blood-donor-finder
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the server**
```bash
npm start
```

4. **Open in browser**
```
http://localhost:4000
```

## Project Structure

```
blood-donor-finder/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # Frontend logic
├── server.js           # Backend server
├── package.json        # Dependencies
└── README.md           # Documentation
```

## How to Use

### 1. Search for Donors
- Enter your city/location
- Optionally select blood type
- Click "Search" button
- View available donors

### 2. Search for Blood Banks
- Click on "Blood Banks" tab
- View nearby blood bank details
- Call or contact them

### 3. Register as a Donor
- Scroll to "Become a Donor" section
- Fill in your details
- Select your blood type
- Click "Register as Donor"

## API Endpoints

### GET `/api/donors`
Fetch all registered donors

### GET `/api/banks`
Fetch all blood banks

### POST `/api/register-donor`
Register a new donor
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "bloodType": "O+",
  "city": "Mumbai"
}
```

## Features to Add (Next Steps)

- [ ] Database integration (MongoDB/Firebase)
- [ ] Google Maps API integration
- [ ] SMS notifications
- [ ] User authentication
- [ ] Real-time donor availability tracking
- [ ] Emergency request system
- [ ] Blood bank inventory tracking
- [ ] Mobile app (React Native/Flutter)

## Contributing

1. Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- Add email/SMS notifications
- Integrate with real blood bank databases
- Add appointment booking system
- Create admin dashboard
- Add medical history tracking
- Push notifications for urgent requests

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues or suggestions, please open an issue on GitHub. 

## Author

Created by **PrathamDixit321** for Hackathon

---

**Save Lives, Donate Blood!  🩸**