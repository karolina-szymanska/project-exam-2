import { useEffect, useState } from "react";
import { createApiKey } from "../../API/ApiKey";
import { getProfile } from "../../API/Profile";

const useFetchProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username not found in local storage");
        }

        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;
        const profile = await getProfile(username, apiKey);
        setProfileData(profile.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message || "Unknown error occurred");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profileData, isLoading, error };
};

export default useFetchProfile;
