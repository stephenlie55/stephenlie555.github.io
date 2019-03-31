function doCrypt(isDecrypt) {
	if (document.getElementById("key").value.length == 0) {
		alert("Key tidak boleh kosong!");
		return;
	}
	var key = filterKey(document.getElementById("key").value);
	if (key.length == 0) {
		alert("Masukkan key!");
		return;
	}
	if (isDecrypt) {
		for (var i = 0; i < key.length; i++)
			key[i] = (26 - key[i]) % 26;
	}
	var textElement = document.getElementById("text");
	textElement.value = crypt(textElement.value, key);
}

function filterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if (huruf(c))
			result.push((c - 65) % 32);
	}
	return result;
}

function huruf(c) {
	return kapital(c) || kecil(c);
}

function kapital(c) {
	return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

function kecil(c) {
	return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}

function crypt(input, key) {
	var output = "";
	for (var i = 0, j = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (kapital(c)) {
			output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
			j++;
		} else if (kecil(c)) {
			output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
			j++;
		} else {
			output += input.charAt(i);
		}
	}
	return output;
}