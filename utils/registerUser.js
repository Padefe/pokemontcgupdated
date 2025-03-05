import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase.js";

export async function registerUser(email, regword, regname) {
    // Step 1: Check if the email is already in use

    const { data: existingUser, error: fetchError } = await supabase
        .from('User') // Use the 'users' table or any table you store user data
        .select('user_email')
        .eq('user_email', email)
        .maybeSingle();

    if (fetchError) {
        console.error("Error checking email: ", fetchError);
        return { success: false, message: "Error checking email availability." };
    }

    if (existingUser) {
        return { success: false, message: "Email is already in use." };
    }
    console.log("test2");
    // Step 2: Hash the password before storing it
    const hashedPassword = await bcrypt.hash(regword, 10); // '10' is the salt rounds
    console.log("test3");
    // Step 3: Insert the new user into your custom 'users' table
    const { error: insertUserError } = await supabase
        .from('User') // Replace 'User' with your table name
        .insert([
            { 
                user_email: email, 
                password: hashedPassword,
                user_name: regname,
                balance: 100
            }
        ]);

    if (insertUserError) {
        console.error("Error inserting user into users table: ", insertError);
        return { success: false, message: "Error saving user data." };
    }
    console.log("test5");
    // Step 5: Return success
    return { success: true, message: "User registered successfully." };
}
