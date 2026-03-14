import { exportAllData } from './export.js';
import { importBackup } from './importData.js';

// Create backup UI
function createBackupUI() {
    const container = document.getElementById('entries-hub');

    if (!container) return;

    // Create backup section
    const backupSection = document.createElement('div');
    backupSection.className = 'backup-section';
    backupSection.innerHTML = `
        <h3 class="backup-title">
            <i class="ph ph-shield-check"></i>
            Data Backup & Restore
        </h3>
        <p class="backup-description">
            Export your training data to a JSON file or restore from a previous backup.
        </p>
        
        <div class="backup-actions">
            <button class="backup-btn export-btn" id="export-btn">
                <i class="ph ph-download-simple"></i>
                <span>Export Backup</span>
                <small>Download all your data</small>
            </button>
            
            <button class="backup-btn import-btn" id="import-btn">
                <i class="ph ph-upload-simple"></i>
                <span>Import Backup</span>
                <small>Restore from file</small>
            </button>
        </div>
        
        <input type="file" id="backup-file-input" accept=".json" style="display: none;">
    `;

    // Insert after entries cards
    container.appendChild(backupSection);

    // Bind events
    bindBackupEvents();
}

function bindBackupEvents() {
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const fileInput = document.getElementById('backup-file-input');

    if (exportBtn) {
        exportBtn.addEventListener('click', async () => {
            exportBtn.disabled = true;
            exportBtn.innerHTML = '<i class="ph ph-spinner"></i><span>Exporting...</span>';

            try {
                await exportAllData();
            } finally {
                exportBtn.disabled = false;
                exportBtn.innerHTML = '<i class="ph ph-download-simple"></i><span>Export Backup</span><small>Download all your data</small>';
            }
        });
    }

    if (importBtn && fileInput) {
        importBtn.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            importBtn.disabled = true;
            importBtn.innerHTML = '<i class="ph ph-spinner"></i><span>Importing...</span>';

            try {
                const text = await file.text();
                const json = JSON.parse(text);
                await importBackup(json);
            } catch (error) {
                alert(`❌ Failed to read file: ${error.message}`);
                console.error('File read error:', error);
            } finally {
                importBtn.disabled = false;
                importBtn.innerHTML = '<i class="ph ph-upload-simple"></i><span>Import Backup</span><small>Restore from file</small>';
                fileInput.value = ''; // Reset file input
            }
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', createBackupUI);
