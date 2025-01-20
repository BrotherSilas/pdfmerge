# PDFMERGE

"Simplify, Merge, Deliver" - A web application that allows users to easily merge multiple PDF files into a single document.

## Features

- Upload up to 2 PDF files simultaneously
- Drag-and-drop interface for file selection
- Simple and intuitive user interface
- Real-time progress feedback
- Secure file handling
- Automatic download of merged PDF
- Responsive design with a clean blue theme

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Lucide React (for icons)

### Backend
- Python
- Flask
- PyPDF2
- Flask-CORS

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- Python (v3.8 or higher)
- npm (v6.0.0 or higher)

## Installation

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/BrotherSilas/pdfmerge.git
cd pdfmerge
```

2. Create and activate virtual environment
```bash
# For Windows
python -m venv venv
venv\Scripts\activate

# For macOS/Linux
python -m venv venv
source venv/bin/activate
```

3. Install Python dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install Node dependencies
```bash
npm install
```

## Running the Application

1. Start the backend server
```bash
# From the backend directory
python app.py
```
The backend server will start at `http://localhost:5000`

2. Start the frontend development server
```bash
# From the frontend directory
npm start
```
The application will open in your default browser at `http://localhost:3000`

## Usage

1. Open the application in your web browser
2. Either drag and drop PDF files into the designated area or click "Browse Files" to select them
3. Select up to 2 PDF files you wish to merge
4. Click the "Merge PDFs" button
5. Wait for the merging process to complete
6. The merged PDF will automatically download to your device

## Project Structure
```
pdfmerge/
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js
│       └── index.js
├── backend/
│   ├── app.py
│   └── requirements.txt
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ALX License - see the LICENSE file for details

## Developer

- Silas Edet - Software Engineer

## Acknowledgments

- PDF manipulation powered by PyPDF2
- UI components styled with Tailwind CSS
- Icons provided by Lucide React

## Support

For support, email [silasedetsnr@gmail.com] or open an issue in the repository.
