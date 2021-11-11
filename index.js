const fs = require('fs');
const prompt = require('prompt-sync')({
    autocomplete: complete(['C:/XAMPP/htdocs'])
});

function complete(commands) {
    return function (str) {
        var i;
        var ret = [];
        for (i = 0; i < commands.length; i++) {
            if (commands[i].indexOf(str) == 0)
                ret.push(commands[i]);
        }
        return ret;
    };
};

let PATH = prompt('Type in a path to your apache folder (press TAB for possible folder): ');
PATH = PATH.replace(/\\/g, "/");

const style = `/*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v8.3.6,
* Autoprefixer: v10.3.1
* Browsers: last 4 version
*/

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    background: rgb(106, 0, 117);
    background: -o-linear-gradient(30deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background: linear-gradient(60deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 300%;
    color: white;
    font-family: 'Montserrat', sans-serif;
}

body {
    -webkit-animation: gradient 15s ease infinite;
            animation: gradient 15s ease infinite;
}

@-webkit-keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

#main {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    width: 100%;
    height: 100%;
}

table {
    border: 1px solid black;
    border-collapse: collapse;
    margin: auto;
}

td, th {
    border: 1px solid black;
    padding: 0.5rem;
    text-align: left;
}

button {
    background-color: green;
    -webkit-box-shadow:3px 3px 15px 3px green;
            box-shadow:3px 3px 15px 3px green;
    border: 0;
    margin: 10px 0 0;
    height: 50px;
    width: 200px;
    border-radius: 999px;
    color: lightblue;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size:larger;
    cursor: pointer;
}

#btn {
    text-align: center;
}

select {
    width: 350px;
}

.a {
    background-color: green;
    -webkit-box-shadow:3px 3px 15px 3px green;
            box-shadow:3px 3px 15px 3px green;
    padding: 10px;
    margin: 15px auto;
    border-radius: 999px;
    height: 1.75em;
    width: 200px;
    text-align:center;
}

a{
    color: lightblue;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size:larger;
}

a:hover {
    color: white;
}

.a a{
    color: lightblue;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size:larger;
}
.a a:hover {
    color: white;
}

.awyp {
    padding: 10px;
    margin: 30px auto;
    border-radius: 999px;
    height: 1.75em;
    width: 200px;
    text-align: center;
}


h3 {
    text-align: center;
    padding-top: 10px;
}

.input {
    padding: 0;
    margin: 0 auto 20px auto;
    text-align: center;
}

input {
    width: 350px;
}

.centeralign {
    text-align: center;
}

p {
    padding-top: 50px;
    text-align: center;
}`;

const sqlsetup = `<?php
include('./db_conn.php');

$sql = 'CREATE TABLE info(id int NOT NULL AUTO_INCREMENT, item text, borrower text, date date, returned tinyint(1), returndate date, receiver text, type text, PRIMARY KEY(id));';

$res = mysqli_query($conn, $sql);
if ($res) {
    mysqli_close($conn);
    header('Location: ./menu.html');
    exit;
} else {
    echo 'Cannot create a table';
}

?>`;

const setupphp = `<?php
if (isset($_POST['hostname']) && isset($_POST['username'])) {
    function validate($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    
    $hostname = validate($_POST['hostname']);
    $username = validate($_POST['username']);
    $password = $_POST['pass'];

    if (empty($hostname) || empty($username)) {
        echo "One or more required fields were empty";
    } else {          
        $file = fopen('db_conn.php', 'w') or die ('Cannot open the file');
        $txt = "<?php\n\$hname = '$hostname';\n\$uname = '$username';\n\$password = '$password';\n\$conn = mysqli_connect(\$hname, \$uname, \$password);\nif (!\$conn) {\necho 'Connection failed!';\nexit();\n}";
        fwrite($file, $txt);
        fclose($file);
        header('Location: ./dbsetup.php?hname='.$hostname.'&uname='.$username.'&pw='.$password);
    }

    
}
?>`;

const setuphtml = `<!DOCTYPE html>
<html>

<head>
    <title>Setup</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="./style.css" />
</head>

<body>
    <form method="post" action="setup.php">
        <div class="input">
            <label for="host">Hostname:</label><br>
            <input type="text" id="host" name="hostname" required>
        </div>
        <div class="input">
            <label for="uname">Database username:</label><br>
            <input type="text" id="uname" name="username" required>
        </div>
        <div class="input">
            <label for="pass">Database password:</label><br>
            <input type="text" id="pass" name="pass">
        </div>
        <div class="input">
            <button type="submit">Submit</button>
        </div>
    </form>
    <p>
        If you have already been through this setup and you still don't have a db_conn.php file in your main registry
        folder or if it's empty you should add write permissions to setup.php and dbsetup.php (chmod +rwx setup.php).
    </p>
</body>

</html>`;

const menu = `<!DOCTYPE html>
<html>

<head>
    <title>Main page</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="./style.css" />
</head>

<body>
    <div id="main">
        <h3>
            Menu
        </h3>
        <div class="a">
            <a href="/rent">Rent</a><br>
        </div>
        <div class="a">
            <a href="/return">Return</a><br>
        </div>
        <div class="a">
            <a href="/history">History</a><br>
        </div>
    </div>
</body>

</html>`;

const dbsetup = `<?php
include('./db_conn.php');

$sql = 'CREATE DATABASE rentalsregistry';
$res = mysqli_query($conn, $sql);

$hostname = $_GET['hname'];
$username = $_GET['uname'];
$password = $_GET['pw'];

$file = fopen('db_conn.php', 'w') or die ('Cannot open the file');
$txt = "<?php\n\$hname = '$hostname';\n\$uname = '$username';\n\$password = '$password';\n\$db_name = 'rentalsregistry';\n\$conn = mysqli_connect(\$hname, \$uname, \$password, \$db_name);\nif (!\$conn) {\necho 'Connection failed!';\nexit();\n}";
fwrite($file, $txt);
fclose($file);
header('Location: ./dbsetup.php');  

mysqli_close($conn);
header('Location: ./sqlsetup.php');
exit;

?>`;

const histexport = `<?php
if(isset($_POST['export'])) {
include('../db_conn.php');

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=info.csv');
$output = fopen('php://output', 'w');
fputcsv($output, array('ID', 'Rented item', 'Borrower', 'Date of loan', 'Returned', 'Date of return', 'Receiver', 'Type'));
$query = 'SELECT * FROM info ORDER BY id ASC';
$result = mysqli_query($conn, $query);
while($row=mysqli_fetch_assoc($result)) {
    fputcsv($output, $row);
}
fclose($output);
}
?>`;

const histindex = `<?php
include('../db_conn.php');

$result = mysqli_query($conn,"SELECT * FROM info");

echo "<h3>History</h3>";

echo "<table>
<tr>
<th>ID</th>
<th>Rented item</th>
<th>Item type</th>
<th>Borrower</th>
<th>Date of loan</th>
<th>Returned</th>
<th>Date of return</th>
<th>Receiver</th>
</tr>";

while($row = mysqli_fetch_array($result))
{
echo "<tr>";
echo "<td>" . $row['id'] . "</td>";
echo "<td>" . $row['item'] . "</td>";
if($row['type']){
	if ($row['type'] == "book") {
		echo "<td>Book</td>";
	} else if ($row['type'] == "program") {
		echo "<td>Program</td>";
	} else if ($row['type'] == "device") {
		echo "<td>Device</td>";
	} else {
		echo "<td>Other</td>";
	}
};
echo "<td>" . $row['borrower'] . "</td>";
echo "<td>" . $row['date'] . "</td>";
if ($row['returned'] == 1) {
	echo "<td>Yes</td>";
} else {
	echo "<td>No</td>";
}
echo "<td>" . $row['returndate'] . "</td>";
echo "<td>" . $row['receiver'] . "</td>";
echo "</tr>";
}
echo "</table>";

mysqli_close($conn);
?>
<style>
	<?php include '../style.css'; ?>
</style>
<div class="a">
	<a href="/menu.html">Back</a>
</div>



<form action="export.php" method="POST">
	<div id="btn">
		<button type="submit" name="export">Export to .csv</button>
	</div>
</form>`;

const rentsend = `<?php  
include('../db_conn.php');

if (isset($_POST['item']) && isset($_POST['borrower']) && isset($_POST['date']) && isset($_POST['type'])) {

	function validate($data){
       $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}

	$item = validate($_POST['item']);
	$borrower = validate($_POST['borrower']);
    $date = validate($_POST['date']);
	$type = validate($_POST['type']);

	if (empty($item) || empty($borrower) || empty($date) || empty($type)) {
		echo "One or more fields were empty";
	}else {

		$sql = "INSERT INTO info(item, borrower, date, type) VALUES('$item', '$borrower', '$date', '$type')";
		$res = mysqli_query($conn, $sql);

		if ($res) {
			mysqli_close($conn); 
        	header("Location:index.html"); 
        	exit;
		}else {
			echo "Cannot send the information";
		}
	}

}else {
	echo("There has been an error");
}
?>`;

const rentindex = `<!DOCTYPE html>
<html>

<head>
    <title>Rentals</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../style.css" />
</head>

<body>
    <div id="main">
        <h3>
            Fill up the form accordingly to the labels
        </h3>
        <form method="post" action="send.php">
            <div class="input">
                <label for="item">Rented item:</label><br>
                <input type="text" id="item" name="item" required>
            </div>
            <div class="input">
                <label for="borr">Borrower:</label><br>
                <input type="text" id="borr" name="borrower" required>
            </div>
            <div class="input">
                <label for="date">Date of loan:</label><br>
                <input type="date" id="date" name="date" required>
            </div>
            <div class="input">
                <label for="type">Item type:</label><br>
                <select id="type" name="type">
                    <option value="book">Book</option>
                    <option value="program">Program</option>
                    <option value="device">Device</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="input">
                <button type="submit">Add</button>
                <div class="awyp">
                    <a href="/menu.html">Back</a>
                </div>
            </div>
        </form>
    </div>
</body>

</html>`;

const returnindex = `<?php
include('../db_conn.php');

$result = mysqli_query($conn,"SELECT * FROM info");

echo "<h3 id='returnheading'>Choose an item to return</h3>";
echo "<table border='1'>
<tr>
<th>No.</th>
<th>Rented item</th>
<th>Item type</th>
<th>Borrower</th>
<th>Date of loan</th>
<th>Return</th>
</tr>";


while($row = mysqli_fetch_array($result))
{
    if($row['returned'] == 1) {
        continue;
    } else {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['item'] . "</td>";
        if ($row['type'] == 'book') {
            echo "<td>Book</td>";
        } else if ($row['type'] == 'program') {
            echo "<td>Program</td>";
        } else if ($row['type'] == 'device') {
            echo "<td>Device</td>";
        } else {
            echo "<td>Other</td>";
        }
        echo "<td>" . $row['borrower'] . "</td>";
        echo "<td>" . $row['date'] . "</td>";
        echo "<td> <a href='return.php?id=". $row['id'] . "'>Return</a> </td>";
        echo "</tr>";
}}
echo "</table>";

if (!$result) {
    printf(mysqli_error($conn));
    exit();
}

mysqli_close($conn);
?>
<style>
	<?php include '../style.css'; ?>
</style>
<div class="a">
	<a href="/menu.html">Back</a>
</div>`;

const returnphp = `<?php
include('../db_conn.php');

$id = $_GET['id']; 
$res = mysqli_query($conn,"SELECT * FROM info WHERE id='$id'"); 

$data = mysqli_fetch_array($res); 

if(isset($_POST['update'])) {
    $returndate = $_POST['returndate'];
    $receiver = $_POST['receiver'];
	
    $edit = mysqli_query($conn,"UPDATE info SET returndate='$returndate', receiver='$receiver', returned=1 WHERE id='$id'");
	
    if($edit) {
        mysqli_close($conn); 
        header("location: ./index.php"); 
        exit;
    } else {
        echo mysqli_error();
    }    	
}
?>
<style>
	<?php include '../style.css'; ?>
</style>

<div id="main">
    <h3>Return</h3>

    <form method="POST">
    <div class="input">
        <label for="return">Date of return</label><br>
        <input type="date" id="returndate" name="returndate" required><br><br>
        <label for="receiver">Receiver</label><br>
        <input type="text" id="receiver" name="receiver" required><br><br>
        <button type="submit" name="update">Return</button>
    </div>
    <div id="anchors">
		<div class="awyp">
			<a href="/return/index.php">Back</a>
		</div>
	</div>
    </form>
</div>`;

const hist = `${PATH}/history`;
const rent = `${PATH}/rent`;
const ret = `${PATH}/return`;

fs.mkdir(hist, err => {
    if (err) throw err
    console.log('Dir created');
});

fs.mkdir(rent, err => {
    if (err) throw err
    console.log('Dir created');
});

fs.mkdir(ret, err => {
    if (err) throw err
    console.log('Dir created');
})

fs.writeFile(`${PATH}/style.css`, style, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/sqlsetup.php`, sqlsetup, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/dbsetup.php`, dbsetup, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/setup.php`, setupphp, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/setup.html`, setuphtml, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/menu.html`, menu, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/rent/send.php`, rentsend, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/rent/index.html`, rentindex, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/return/index.php`, returnindex, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/return/return.php`, returnphp, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/history/index.php`, histindex, err => {
    if (err) throw err;
    console.log('Saved')
});

fs.writeFile(`${PATH}/history/export.php`, histexport, err => {
    if (err) throw err;
    console.log('Saved')
});
