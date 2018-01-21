# Bil Simulering
	Det här är ett Modellering och simulerings projekt. Syftet med detta projekt är att simulera en bil.

## Författare
	Nils Andersson
	Karl Eknefelt
	Rasmus Elmersson
	David Eriksson
## Mjukvara, APIer och programmeringspråk
	MATLAB
	OPENGL
	GLEW
	C++
## Mappstruktur
	~/3D-Simulation
		- Detta är mappen som innehåller allt material för den finaliserade simulationen
	~/Pre-study
		- Denna mapp innehåller förstudien som är gjord i MATLAB
	~/Reading Material
		- Denna mapp innehåller information från olika källor från internet
## Programmera i Visual Studio med GLEW och GLFW
Första gången projektet öppnas måste man länka till bibliotek och header filer detta gör man så här: 
	**1.** Höger klicka på CarSimulation i "Solution Explorer" och tryck på **Properties**. 
	**2.** Gå till **C++ > General > Additional Include Directories > edit** 
	**3.** I vita rutan längst upp i rutan skriver du:
			**$(SolutionDir)/../External Resources/GLFW/include
			$(SolutionDir)/../External Resources/GLEW/include/GL**
			stäng sedan rutan genom att klicka på **OK** men stanna kvar i Properties rutan.
	**4.** Gå till **linker > General > Additional Library Directories > edit**.
	**5.** I vita rutan längst upp i rutan skriver du:
		**$(SolutionDir)/../External Resources/GLFW/lib-vc2015
		$(SolutionDir)/../External Resources/GLEW/lib/Release/x64**
		stäng sedan rutan genom att klicka på **OK** men stanna kvar i Properties rutan.
	**6.** Gå till **linker > Input > Additional Dependencies > edit**.
	**7.** I vita rutan längst upp i rutan skriver du:
		**opengl32.lib
		glew32s.lib
		glfw3.lib**
		Klicka **OK** och sedan **Verkställ** du kan sedan stänga ned **Properties** rutan.
	**8.** Du kan behöva ändra **Solution Platform** till **x64** då denna ofta är inställd på **x86** men det stödjer ej **GLEW**