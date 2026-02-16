"use server"

export const registrationAction = async (formData: FormData) => {
    // console.log(formData);
    const { name, userName, email, password, confirmPassword, role } = Object.fromEntries(formData.entries())

    console.log(name, userName, email, password, confirmPassword, role);
}