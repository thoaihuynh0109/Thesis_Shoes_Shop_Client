import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddressSelector() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
                );
                setCities(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedDistrict('');
        setSelectedWard('');
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
        setSelectedWard('');
    };

    const selectedAddressSummary = () => {
        const selectedCityName = cities.find((city) => city.Id === selectedCity)?.Name || '';
        const selectedDistrictName =
            cities
                .find((city) => city.Id === selectedCity)
                ?.Districts.find((district) => district.Id === selectedDistrict)?.Name || '';
        const selectedWardName =
            cities
                .find((city) => city.Id === selectedCity)
                ?.Districts.find((district) => district.Id === selectedDistrict)
                ?.Wards.find((ward) => ward.Id === selectedWard)?.Name || '';

        return `${selectedCityName} - ${selectedDistrictName} - ${selectedWardName}`;
    };

    return (
        <div>
            <select
                className="form-select form-select-sm mb-3"
                id="city"
                aria-label=".form-select-sm"
                value={selectedCity}
                onChange={handleCityChange}
            >
                <option value="" disabled selected>
                    Chọn tỉnh thành
                </option>
                {cities.map((city) => (
                    <option key={city.Id} value={city.Id}>
                        {city.Name}
                    </option>
                ))}
            </select>

            <select
                className="form-select form-select-sm mb-3"
                id="district"
                aria-label=".form-select-sm"
                value={selectedDistrict}
                onChange={handleDistrictChange}
            >
                <option value="" disabled selected>
                    Chọn quận huyện
                </option>
                {selectedCity &&
                    cities
                        .find((city) => city.Id === selectedCity)
                        ?.Districts.map((district) => (
                            <option key={district.Id} value={district.Id}>
                                {district.Name}
                            </option>
                        ))}
            </select>

            <select
                className="form-select form-select-sm"
                id="ward"
                aria-label=".form-select-sm"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
            >
                <option value="" disabled selected>
                    Chọn phường xã
                </option>
                {selectedCity &&
                    selectedDistrict &&
                    cities
                        .find((city) => city.Id === selectedCity)
                        ?.Districts.find((district) => district.Id === selectedDistrict)
                        ?.Wards.map((ward) => (
                            <option key={ward.Id} value={ward.Id}>
                                {ward.Name}
                            </option>
                        ))}
            </select>

            <span>Địa chỉ đã chọn: {selectedAddressSummary()}</span>
        </div>
    );
}

export default AddressSelector;
