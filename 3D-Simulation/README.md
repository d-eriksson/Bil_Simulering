# 3D-simulation
	Denna mapp innehåller allt material för den finaliserade simulationen

### Författare
	Nils Andersson
	Karl Eknefelt
	Rasmus Elmersson
	David Eriksson
### Mjukvara, APIer och programmeringspråk
	OPENGL
	GLEW
	C++
### Mappstruktur
	~/CarSimulation
		- Detta är mappen som innehåller projekt filerna
	~/External Resources
		- Innehåller GLEW och GLFW

### Programmera i Visual Studio med GLEW och GLFW
Första gången projektet öppnas måste man länka till bibliotek och header filer detta gör man så här: 
	1. Höger klicka på CarSimulation i "Solution Explorer" och tryck på **Properties**. 
	2. Gå till **C++ > General > Additional Include Directories > edit** 
	3. I vita rutan längst upp i rutan skriver du:
			**$(SolutionDir)/../External Resources/GLFW/include**
			->**$(SolutionDir)/../External Resources/GLEW/include/GL**
			stäng sedan rutan genom att klicka på **OK** men stanna kvar i Properties rutan.
	4. Gå till **linker > General > Additional Library Directories > edit**.
	5. I vita rutan längst upp i rutan skriver du:
		->**$(SolutionDir)/../External Resources/GLFW/lib-vc2015**
	    ->**$(SolutionDir)/../External Resources/GLEW/lib/Release/x64**
		stäng sedan rutan genom att klicka på **OK** men stanna kvar i Properties rutan.
	6. Gå till **linker > Input > Additional Dependencies > edit**.
	7. I vita rutan längst upp i rutan skriver du:
		-> opengl32.lib
		-> glew32s.lib
		-> glfw3.lib
		Klicka **OK** och sedan **Verkställ** du kan sedan stänga ned **Properties** rutan.
	8. Du kan behöva ändra **Solution Platform** till **x64** då denna ofta är inställd på **x86** men det stödjer ej **GLEW**