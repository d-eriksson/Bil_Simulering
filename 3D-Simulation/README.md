# 3D-simulation
	Denna mapp innehåller allt material för den finaliserade simulationen

### Författare
	Nils Andersson
	Karl Eknefelt
	Rasmus Elmersson
	David Eriksson
### Mjukvara, APIer och programmeringspråk
	ThreeJS
	GLEW
	JavaScript
### Mappstruktur
	~/CarSimulation
		- Detta är mappen som innehåller projekt filerna
### För att köra denna kod lokalt
	För att man ska kunna ladda in .obj filer och liknande behöver man köra koden på en server. Det går alltså ej att köra den lokalt. Så här sätter man upp en XAMMP server för windows;
	1. Gå in på denna url: https://www.apachefriends.org/index.html och ladda ner XAMMP for Windows.
	2. Kör en vanlig installation med default inställningar.
	3. Öppna kontrollpanelen och tryck start vid Apache.
	4. Får du felmeddelandet port 80 in use... öppna cmd som administratör och kör kommandot net stop was /y och starta om apache.
	5. Öppna git shell och kör cd "C:\xammp\htdocs" "git clone https://github.com/daviderixon/Bil_Simulering.git" ta sedan bort din gamla git repository. 
	6. Gå in i webbläsaren och gå in på localhost och där hittar du filerna.
	För linux:
	1. kör git clone i directoriet /var/www/html/ 

