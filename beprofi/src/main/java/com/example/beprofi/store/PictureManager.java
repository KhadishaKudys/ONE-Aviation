package com.example.beprofi.store;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;

public class PictureManager {

    public static String storeProfessionsFile(MultipartFile file) {
        String path = "";
        try {
            path = "C:\\Users\\1\\Spring\\intern\\beprofi\\beprofi-frontend\\src\\assets\\static\\categories\\professions\\images\\"+file.getOriginalFilename();
            File newFile = new File(path);
            newFile.createNewFile();
            FileOutputStream myfile = new FileOutputStream(newFile);
            myfile.write(file.getBytes());
            path ="/static/categories/professions/images/"+file.getOriginalFilename();
            myfile.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }
    public static String storeCoursesFile(MultipartFile file) {
        String path = "";
        try {
            path = "C:\\Users\\1\\Spring\\intern\\beprofi\\beprofi-frontend\\src\\assets\\static\\categories\\courses\\images\\"+file.getOriginalFilename();
            File newFile = new File(path);
            newFile.createNewFile();
            FileOutputStream myfile = new FileOutputStream(newFile);
            myfile.write(file.getBytes());
            path ="/static/categories/courses/images/"+file.getOriginalFilename();
            myfile.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }

    public static String storeServicesFile(MultipartFile file) {
        String path = "";
        try {
            path = "C:\\Users\\1\\Spring\\intern\\beprofi\\beprofi-frontend\\src\\assets\\static\\categories\\services\\images\\"+file.getOriginalFilename();
            File newFile = new File(path);
            newFile.createNewFile();
            FileOutputStream myfile = new FileOutputStream(newFile);
            myfile.write(file.getBytes());
            path ="/static/categories/services/images/"+file.getOriginalFilename();
            myfile.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }

}

