from flask import Flask, request, send_file
from flask_cors import CORS
import PyPDF2
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/merge', methods=['POST'])
def merge_pdfs():
    try:
        # Check if files were uploaded
        if 'pdfs' not in request.files:
            return 'No files uploaded', 400

        files = request.files.getlist('pdfs')
        
        # Validate files
        for file in files:
            if not file.filename.endswith('.pdf'):
                return 'Invalid file type. Please upload only PDF files.', 400

        # Create PDF merger object
        pdf_combiner = PyPDF2.PdfMerger()

        # Save uploaded files temporarily and merge them
        temp_files = []
        for file in files:
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            temp_files.append(filepath)
            pdf_combiner.append(filepath)

        # Save merged PDF
        output_path = os.path.join(UPLOAD_FOLDER, 'merged_output.pdf')
        pdf_combiner.write(output_path)
        pdf_combiner.close()

        # Clean up temporary files
        for file in temp_files:
            try:
                os.remove(file)
            except:
                pass

        # Send the merged file
        return send_file(
            output_path,
            as_attachment=True,
            download_name='merged.pdf',
            mimetype='application/pdf'
        )

    except Exception as e:
        return str(e), 500

    finally:
        # Clean up merged output
        try:
            os.remove(output_path)
        except:
            pass

if __name__ == '__main__':
    app.run(debug=True)
