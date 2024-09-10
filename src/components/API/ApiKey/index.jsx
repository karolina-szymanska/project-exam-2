import { CreateApiKeyUrl } from "../index.jsx";

export async function createApiKey(name = "") {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(CreateApiKeyUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to create API key");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
