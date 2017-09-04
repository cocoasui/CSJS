@echo off
echo Ready to Merge JavaScript and CSS files.
echo .
if exist "MergeFiles.exe" (
	echo [merge JavaScript files] start
    echo .
	MergeFiles.exe js\JS.FileList.txt CS.js       
	echo [merge JavaScript files] done
    echo .

    echo [merge CSS files] start
    echo .
    MergeFiles.exe css\CSS.FileList.txt CS.css
    echo [merge CSS files] done
    echo .
) else (
	echo ERROR: Can not find [MergeFiles.exe]
	goto END
)

:END
pause