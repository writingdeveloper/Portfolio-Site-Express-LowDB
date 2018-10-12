/* ---------- Global ---------- */

// Check Delete Option
function checkDelete() {
    return confirm('Are you really sure to delete this Data?');
}

/* ---------- Main PAGE ---------- */

// Show Selected Items
function selectBoxUpdate() {
    let selectedValue = document.getElementById('neighborhoods-select').value;
    if (selectedValue === 'All') {
        console.log('All Selected');
    } else if (selectedValue === 'Project') {
        console.log('Project Selected!');
        hideSelectedItem();
        // Hide Certification, Education Class and Show Project Class
    } else if (selectedValue === 'Certification') {
        console.log('Certification Selected!');
        // Hide Project, Education Class and Show Certification Class
    } else if (selectedValue === 'Education') {
        // Hide Project, Certification and Show Education Class
        console.log('Education Selected!');
    }
}

function hideSelectedItem() {
    let hideCertification = document.getElementsByClassName('Certificate');
    let hideEducation = document.getElementsByClassName('Education');

    for (var i = 0; i < hideCertification.length; i++) {
        hideCertification[i].style.display = 'none';
    }
    for (var i = 0; i < hideEducation.length; i++) {
        hideEducation[i].style.display = 'none';
    }
}

function recoverExceptSelectedItem() {

    var appBanners = document.getElementsByClassName('Project'),
        i;

    for (var i = 0; i < appBanners.length; i++) {
        appBanners[i].style.display = 'visible';
    }

}



/* ---------- CREATE PAGE ---------- */

// Check Validate Form in Create Page and Update Page
function validateForm() {
    let projectName = document.getElementById('searchForm').projectName.value;
    let sumLang = document.getElementById('searchForm').sumLang.value;
    let pjdate1 = document.getElementById('searchForm').pjdate1.value;
    let pjdate2 = document.getElementById('searchForm').pjdate2.value;
    let projectExplanation = document.getElementById('searchForm').projectExplanation.value;
    let projectUrl = document.getElementById('searchForm').projectUrl.value;
    // let githuburl = document.getElementById('searchForm').githuburl.value;
    // let imgData = document.getElementById('searchForm').projectImg.value;
    let portType = document.getElementById('searchForm').portType.value;

    if (projectName, sumLang, pjdate1, pjdate2, projectExplanation, projectUrl, portType === "") {
        alert('Some Fields are Empty!');
        return false;
    }
}